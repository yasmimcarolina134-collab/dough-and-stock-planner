import { createFileRoute } from '@tanstack/react-router';
import { Purchasing } from '@/components/Purchasing';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/solicitacoes')({head:()=>pageHead('Solicitacoes','Gestão integrada de solicitacoes da padaria.'),component:Page});
function Page(){return <Purchasing/>;}
