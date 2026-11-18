import { createFileRoute } from '@tanstack/react-router';
import { Finance } from '@/components/Finance';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/contas-pagar')({head:()=>pageHead('Contas Pagar','Gestão integrada de contas pagar da padaria.'),component:Page});
function Page(){return <Finance/>;}
