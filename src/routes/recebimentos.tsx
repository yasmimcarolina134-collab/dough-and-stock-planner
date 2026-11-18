import { createFileRoute } from '@tanstack/react-router';
import { Purchasing } from '@/components/Purchasing';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/recebimentos')({head:()=>pageHead('Recebimentos','Gestão integrada de recebimentos da padaria.'),component:Page});
function Page(){return <Purchasing kind="Recebimento"/>;}
