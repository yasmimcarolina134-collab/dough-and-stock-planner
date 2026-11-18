import { createFileRoute } from '@tanstack/react-router';
import { Planning } from '@/components/Planning';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/planejamento')({head:()=>pageHead('Planejamento MRP','Demanda e datas necessárias de produtos acabados.'),component:Page});
function Page(){return <Planning/>;}
