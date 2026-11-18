import { createFileRoute } from '@tanstack/react-router';
import { ERPDashboard } from '@/components/ERPDashboard';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/')({head:()=>pageHead('Dashboard gerencial','Indicadores de estoque, compras e produção da padaria.'),component:Page});
function Page(){return <ERPDashboard/>;}
