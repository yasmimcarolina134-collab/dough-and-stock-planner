import { createFileRoute } from '@tanstack/react-router';
import { Settings } from '@/components/Settings';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/configuracoes')({head:()=>pageHead('Configuracoes','Gestão integrada de configuracoes da padaria.'),component:Page});
function Page(){return <Settings/>;}
