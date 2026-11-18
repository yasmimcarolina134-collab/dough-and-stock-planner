import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { warehouseFields } from '@/lib/module-fields';
export const Route=createFileRoute('/depositos')({head:()=>pageHead('Depositos','Gestão integrada de depositos da padaria.'),component:Page});
function Page(){return <RecordsPage title="Depósitos" table="warehouses" fields={warehouseFields}/>;}
