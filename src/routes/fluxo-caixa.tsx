import { createFileRoute } from '@tanstack/react-router';
import { FinancialSummary } from '@/components/Finance';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/fluxo-caixa')({head:()=>pageHead('Fluxo Caixa','Gestão integrada de fluxo caixa da padaria.'),component:Page});
function Page(){return <FinancialSummary/>;}
