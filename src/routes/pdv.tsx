import { createFileRoute } from '@tanstack/react-router';
import { Commercial } from '@/components/Commercial';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/pdv')({head:()=>pageHead('Pdv','Gestão integrada de pdv da padaria.'),component:Page});
function Page(){return <Commercial/>;}
