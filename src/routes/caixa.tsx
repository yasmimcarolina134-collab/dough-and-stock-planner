import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/caixa')({head:()=>pageHead('Caixa','Gestão integrada de caixa da padaria.'),component:Page});
function Page(){return <RecordsPage title="Abertura e fechamento de caixa" table="cash_sessions" fields={[{key:"responsible",label:"Responsável",required:true},{key:"opening_amount",label:"Saldo de abertura",type:"number",money:true},{key:"closing_amount",label:"Saldo de fechamento",type:"number",money:true},{key:"opened_at",label:"Abertura",type:"datetime-local",required:true,default:new Date().toISOString().slice(0,16)},{key:"closed_at",label:"Fechamento",type:"datetime-local"}]}/>;}
