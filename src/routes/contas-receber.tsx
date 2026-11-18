import { createFileRoute } from '@tanstack/react-router';
import { Finance } from '@/components/Finance';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/contas-receber')({head:()=>pageHead('Contas Receber','Gestão integrada de contas receber da padaria.'),component:Page});
function Page(){return <Finance type="Receber"/>;}
