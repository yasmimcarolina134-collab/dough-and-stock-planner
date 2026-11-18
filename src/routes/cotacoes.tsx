import { createFileRoute } from '@tanstack/react-router';
import { Purchasing } from '@/components/Purchasing';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/cotacoes')({head:()=>pageHead('Cotacoes','Gestão integrada de cotacoes da padaria.'),component:Page});
function Page(){return <Purchasing kind="Cotação"/>;}
