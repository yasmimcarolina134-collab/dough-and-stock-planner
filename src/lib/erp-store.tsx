import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';
type Tables=Database['public']['Tables'];
type Data={ [K in keyof Tables]: Tables[K]['Row'][] };
const empty:Data={products:[],categories:[],suppliers:[],bom:[],demands:[],orders:[],movements:[],history:[],companies:[],user_roles:[],customers:[],employees:[],cost_centers:[],banks:[],finance:[],sales:[],sale_items:[],purchase_requests:[],warehouses:[],lots:[],fiscal_documents:[],hr_records:[],cash_sessions:[],production_reservations:[]};
type Ctx={data:Data;session:Session|null;ready:boolean;loading:boolean;error:string;busy:boolean;reload:()=>Promise<void>;save:<K extends keyof Tables>(table:K,value:Tables[K]['Insert'])=>Promise<boolean>;remove:(table:keyof Tables,id:string)=>Promise<boolean>;finish:(id:string,responsible:string)=>Promise<boolean>;act:(fn:()=>PromiseLike<{error:{message:string}|null}>)=>Promise<boolean>};
const Context=createContext<Ctx|null>(null);
export function ERPProvider({children}:{children:ReactNode}){
 const [data,setData]=useState<Data>(empty),[session,setSession]=useState<Session|null>(null),[ready,setReady]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function reload(){setLoading(true);setError('');try{const setup=await supabase.rpc('ensure_company',{company_name:'Minha padaria'});if(setup.error)throw setup.error;const result={...empty};await Promise.all((Object.keys(empty) as (keyof Tables)[]).map(async key=>{let rows:Tables[typeof key]['Row'][]=[];for(let offset=0;;offset+=1000){const r=await supabase.from(key).select('*').order('id').range(offset,offset+999);if(r.error)throw r.error;rows=rows.concat(r.data as Tables[typeof key]['Row'][]);if(r.data.length<1000)break;}Object.assign(result,{[key]:rows});}));setData(result);}catch(e){setError(e instanceof Error?e.message:'Não foi possível carregar os dados');}finally{setLoading(false);}}
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{setSession(data.session);setReady(true);});const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>{setSession(s);setReady(true);});return()=>subscription.unsubscribe();},[]);
 useEffect(()=>{if(!session){setData(empty);return;}void reload();const channel=supabase.channel(`erp-${crypto.randomUUID()}`).on('postgres_changes',{event:'*',schema:'public'},()=>void reload()).subscribe();return()=>{void supabase.removeChannel(channel);};},[session?.user.id]);
 async function perform(fn:()=>PromiseLike<{error:{message:string}|null}>){setBusy(true);try{const r=await fn();if(r.error)throw new Error(r.error.message);await reload();toast.success('Registro salvo');return true;}catch(e){toast.error(e instanceof Error?e.message:'Não foi possível salvar');return false;}finally{setBusy(false);}}
 const save:Ctx['save']=(table,value)=>perform(()=>supabase.from(table).upsert(value as never));
 const remove:Ctx['remove']=(table,id)=>perform(()=>supabase.from(table).delete().eq('id',id));
 return <Context.Provider value={{act:perform,data,session,ready,loading,error,busy,reload,save,remove,finish:(id,responsible)=>perform(()=>supabase.rpc('finish_order',{order_id:id,responsible}))}}>{children}</Context.Provider>;
}
export function useERP(){const c=useContext(Context);if(!c)throw new Error('ERPProvider ausente');return c;}
export function pageHead(title:string,description:string){return {meta:[{title:`${title} | Padaria MRP`},{name:'description',content:description},{property:'og:title',content:`${title} | Padaria MRP`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}
