import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { customerFields } from '@/lib/module-fields';
export const Route=createFileRoute('/clientes')({head:()=>pageHead('Clientes','Gestão integrada de clientes da padaria.'),component:Page});
function Page(){return <RecordsPage title="Clientes" table="customers" fields={customerFields}/>;}
