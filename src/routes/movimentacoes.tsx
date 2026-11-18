import { createFileRoute } from '@tanstack/react-router';
import { Inventory } from '@/components/Inventory';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/movimentacoes')({head:()=>pageHead('Movimentações','Entradas, saídas, perdas e ajustes de estoque.'),component:Page});
function Page(){return <Inventory movements/>;}
