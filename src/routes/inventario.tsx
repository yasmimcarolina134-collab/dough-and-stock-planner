import { createFileRoute } from '@tanstack/react-router';
import { Inventory } from '@/components/Inventory';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/inventario')({head:()=>pageHead('Inventário físico','Consulta e ajustes de saldos do inventário.'),component:Page});
function Page(){return <Inventory/>;}
