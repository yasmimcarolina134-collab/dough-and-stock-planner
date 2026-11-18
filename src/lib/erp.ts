import type { Database } from '@/integrations/supabase/types';
export type Product = Database['public']['Tables']['products']['Row'];
export type Bom = Database['public']['Tables']['bom']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Demand = Database['public']['Tables']['demands']['Row'];
export type Snapshot = { products: Product[]; bom: Bom[]; orders: Order[]; demands: Demand[] };
export const types = ['Matéria-prima','Produto acabado','Embalagem','Intermediário'];
export const units = ['UN','KG','G','L','ML','CX','PCT','SC'];
export const money = (v: number) => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export const number = (v: number) => v.toLocaleString('pt-BR',{maximumFractionDigits:3});
export const code = (v: number) => `PRD-${String(v).padStart(5,'0')}`;
export function stockStatus(p: Product) { const a = p.stock-p.reserved; return a===0?'Estoque zerado':a<p.minimum?'Estoque baixo':a>p.maximum?'Acima do máximo':'Dentro do limite'; }
export function bomStats(s: Snapshot, id: string, path: string[] = []): { cost:number; capacity:number; totals:Record<string,number> } {
 if(path.includes(id)) throw new Error('Ciclo na ficha técnica');
 const p=s.products.find(p=>p.id===id); if(!p) return {cost:0,capacity:0,totals:{}};
 const rows=s.bom.filter(b=>b.product_id===id); if(!rows.length) return {cost:p.cost,capacity:Math.max(0,p.stock-p.reserved),totals:{[p.unit]:1}};
 let cost=0,capacity=Infinity; const totals:Record<string,number>={};
 for(const b of rows){const c=s.products.find(p=>p.id===b.component_id); if(!c) continue; const sub=bomStats(s,c.id,[...path,id]); const has=s.bom.some(b=>b.product_id===c.id); cost+=b.quantity*(has?sub.cost/c.batch:c.cost); capacity=Math.min(capacity,Math.floor(Math.max(0,c.stock-c.reserved)/b.quantity*p.batch)); totals[c.unit]=(totals[c.unit]??0)+b.quantity;}
 return {cost,capacity:Number.isFinite(capacity)?capacity:0,totals};
}
export function mrp(s:Snapshot) {
 const gross=new Map<string,number>(); const needed=new Map<string,number>(); const due=new Map<string,string>();
 const active=s.products.filter(p=>p.active); const ids=new Set(active.map(p=>p.id));
 for(const d of s.demands){if(ids.has(d.product_id)){gross.set(d.product_id,(gross.get(d.product_id)??0)+d.quantity);due.set(d.product_id,d.due_date);}}
 // Topological order ensures all parent requirements reach a shared component before netting its stock.
 const visited=new Set<string>(); const visiting=new Set<string>(); const ordered:string[]=[];
 function visit(id:string){if(visiting.has(id))throw new Error('Ciclo na ficha técnica');if(visited.has(id))return;visiting.add(id);for(const b of s.bom.filter(b=>b.product_id===id))visit(b.component_id);visiting.delete(id);visited.add(id);ordered.push(id);}
 active.forEach(p=>visit(p.id));
 for(const id of ordered.reverse()){const p=active.find(p=>p.id===id);if(!p)continue;const g=gross.get(id)??0;const date=due.get(id);const incoming=s.orders.filter(o=>o.product_id===id&&o.status==='Aberta'&&(!date||o.due_date<=date)).reduce((n,o)=>n+o.quantity,0);const net=Math.max(0,g+p.minimum-(p.stock-p.reserved)-incoming);needed.set(id,net);if(net>0)for(const b of s.bom.filter(b=>b.product_id===id)){gross.set(b.component_id,(gross.get(b.component_id)??0)+b.quantity*net/p.batch);if(date&&(!due.get(b.component_id)||date<(due.get(b.component_id)??'')))due.set(b.component_id,date);}}
 return active.map(p=>{const date=due.get(p.id)??new Date().toISOString().slice(0,10);const start=new Date(`${date}T12:00:00Z`);start.setUTCDate(start.getUTCDate()-p.lead_time);return {...p,gross:gross.get(p.id)??0,net:needed.get(p.id)??0,available:p.stock-p.reserved,incoming:s.orders.filter(o=>o.product_id===p.id&&o.status==='Aberta'&&o.due_date<=date).reduce((n,o)=>n+o.quantity,0),due:date,start:start.toISOString().slice(0,10),action:p.type==='Produto acabado'||p.type==='Intermediário'?'Produção':'Compra'};});
}
export function signedMovement(type:string,qty:number){if(!Number.isFinite(qty)||qty===0)throw new Error('Informe uma quantidade diferente de zero');return ['Saída para produção','Perdas e desperdícios'].includes(type)?-Math.abs(qty):['Entrada de compras','Entrada de produtos fabricados'].includes(type)?Math.abs(qty):qty;}
