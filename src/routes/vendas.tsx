import { createFileRoute } from '@tanstack/react-router';
import { Commercial } from '@/components/Commercial';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/vendas')({head:()=>pageHead('Vendas','Gestão integrada de vendas da padaria.'),component:Page});
function Page(){return <Commercial/>;}
