import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';
import { employeeFields } from '@/lib/module-fields';
export const Route=createFileRoute('/funcionarios')({head:()=>pageHead('Funcionarios','Gestão integrada de funcionarios da padaria.'),component:Page});
function Page(){return <RecordsPage title="Funcionários" table="employees" fields={employeeFields}/>;}
