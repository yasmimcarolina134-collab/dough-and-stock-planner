import { createFileRoute } from '@tanstack/react-router';
import { MRPReport } from '@/components/Planning';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/compras')({head:()=>pageHead('Relatório de compras','Materiais necessários, fornecedores e prazos de compra.'),component:Page});
function Page(){return <MRPReport purchases/>;}
