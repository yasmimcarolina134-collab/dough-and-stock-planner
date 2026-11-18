import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { hrFields } from '@/lib/module-fields';
export const Route=createFileRoute('/ponto')({head:()=>pageHead('Ponto','Gestão integrada de ponto da padaria.'),component:Page});
function Page(){return <RecordsPage title="Registro de ponto" table="hr_records" fields={hrFields} defaults={{type:"Ponto"}} filter={r=>r["type"]==="Ponto"}/>;}
