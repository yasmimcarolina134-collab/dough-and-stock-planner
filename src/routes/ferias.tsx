import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { hrFields } from '@/lib/module-fields';
export const Route=createFileRoute('/ferias')({head:()=>pageHead('Ferias','Gestão integrada de ferias da padaria.'),component:Page});
function Page(){return <RecordsPage title="Férias" table="hr_records" fields={hrFields} defaults={{type:"Férias"}} filter={r=>r["type"]==="Férias"}/>;}
