import type { ReactNode, SelectHTMLAttributes } from 'react';
import { Btn } from './ui-kit';
import { X, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
export function Field({label,children}:{label:string;children:ReactNode}){return <label className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold text-muted-foreground">{label}{children}</label>;}
export function Select(p:SelectHTMLAttributes<HTMLSelectElement>){return <select {...p} className={`w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ${p.className??''}`}/>;}
export function Modal({title,children,onClose}:{title:string;children:ReactNode;onClose:()=>void}){return <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/35 p-3" role="presentation" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} onClick={e=>e.stopPropagation()} className="max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-lg border bg-card p-5 shadow-soft"><div className="mb-5 flex items-center justify-between gap-3"><h2 className="text-xl font-semibold">{title}</h2><Btn type="button" variant="ghost" onClick={onClose} aria-label="Fechar" title="Fechar"><X size={18}/></Btn></div>{children}</section></div>;}
export function exportSheet(rows:object[],name:string){const book=XLSX.utils.book_new();XLSX.utils.book_append_sheet(book,XLSX.utils.json_to_sheet(rows),'Relatório');XLSX.writeFile(book,`${name}.xlsx`);}
export function Export({rows,name}:{rows:object[];name:string}){return <Btn variant="ghost" onClick={()=>exportSheet(rows,name)}><Download size={16}/>Exportar</Btn>;}
export function Badge({label,tone='neutral'}:{label:string;tone?:'neutral'|'good'|'bad'|'warn'}){return <span className={`inline-flex whitespace-nowrap rounded px-2 py-1 text-xs font-semibold ${tone==='good'?'bg-success/10 text-success':tone==='bad'?'bg-destructive/10 text-destructive':tone==='warn'?'bg-warning/15 text-warning':'bg-secondary text-secondary-foreground'}`}>{label}</span>;}
export function Empty({children}:{children:ReactNode}){return <div className="py-10 text-center text-sm text-muted-foreground">{children}</div>;}
