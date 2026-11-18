import { createFileRoute } from '@tanstack/react-router';
import { Commercial } from '@/components/Commercial';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/pedidos')({head:()=>pageHead('Pedidos','Gestão integrada de pedidos da padaria.'),component:Page});
function Page(){return <Commercial kind="Pedido"/>;}
