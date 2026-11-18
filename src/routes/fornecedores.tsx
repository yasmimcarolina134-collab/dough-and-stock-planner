import { createFileRoute } from '@tanstack/react-router';
import { Suppliers } from '@/components/Suppliers';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/fornecedores')({head:()=>pageHead('Fornecedores','Cadastro de empresas fornecedoras, contatos e prazos.'),component:Page});
function Page(){return <Suppliers/>;}
