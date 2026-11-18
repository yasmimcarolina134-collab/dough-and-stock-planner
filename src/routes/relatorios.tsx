import { createFileRoute } from '@tanstack/react-router';
import { Reports } from '@/components/Reports';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/relatorios')({head:()=>pageHead('Relatorios','Gestão integrada de relatorios da padaria.'),component:Page});
function Page(){return <Reports/>;}
