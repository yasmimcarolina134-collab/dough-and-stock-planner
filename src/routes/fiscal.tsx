import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { fiscalFields } from '@/lib/module-fields';
export const Route=createFileRoute('/fiscal')({head:()=>pageHead('Fiscal','Gestão integrada de fiscal da padaria.'),component:Page});
function Page(){return <RecordsPage title="Documentos fiscais registrados" table="fiscal_documents" fields={fiscalFields}/>;}
