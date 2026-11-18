import { createFileRoute } from '@tanstack/react-router';
import { BomEditor } from '@/components/BomEditor';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/receitas')({head:()=>pageHead('Ficha técnica','Composição de produtos, lotes, custos e capacidade de fabricação.'),component:Page});
function Page(){return <BomEditor/>;}
