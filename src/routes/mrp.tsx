import { createFileRoute } from '@tanstack/react-router';
import { MRPReport } from '@/components/Planning';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/mrp')({head:()=>pageHead('Cálculo MRP','Necessidades líquidas de produção e compras.'),component:Page});
function Page(){return <MRPReport/>;}
