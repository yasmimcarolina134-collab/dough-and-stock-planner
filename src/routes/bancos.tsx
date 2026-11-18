import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { bankFields } from '@/lib/module-fields';
export const Route=createFileRoute('/bancos')({head:()=>pageHead('Bancos','Gestão integrada de bancos da padaria.'),component:Page});
function Page(){return <RecordsPage title="Contas bancárias" table="banks" fields={bankFields}/>;}
