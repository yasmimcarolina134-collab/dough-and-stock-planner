import { createFileRoute } from '@tanstack/react-router';
import { Orders } from '@/components/Planning';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/ordens')({head:()=>pageHead('Ordens','Gestão de ordens de compra e produção.'),component:Page});
function Page(){return <Orders/>;}
