import { createFileRoute } from '@tanstack/react-router';
import { Inventory } from '@/components/Inventory';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/estoque')({head:()=>pageHead('Controle de estoque','Saldos, reservas e alertas de estoque.'),component:Page});
function Page(){return <Inventory/>;}
