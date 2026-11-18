import { createFileRoute } from '@tanstack/react-router';
import { Commercial } from '@/components/Commercial';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/orcamentos')({head:()=>pageHead('Orcamentos','Gestão integrada de orcamentos da padaria.'),component:Page});
function Page(){return <Commercial kind="Orçamento"/>;}
