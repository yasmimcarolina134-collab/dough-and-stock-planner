import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/custos')({head:()=>pageHead('Custos','Gestão integrada de custos da padaria.'),component:Page});
function Page(){return <RecordsPage title="Centros de custo" table="cost_centers" fields={[{key:"name",label:"Departamento",required:true}]}/>;}
