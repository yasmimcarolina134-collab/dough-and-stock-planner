import { createFileRoute } from '@tanstack/react-router';
import { FinancialSummary } from '@/components/Finance';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/dre')({head:()=>pageHead('Dre','Gestão integrada de dre da padaria.'),component:Page});
function Page(){return <FinancialSummary dre/>;}
