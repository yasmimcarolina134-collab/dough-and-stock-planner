import { createFileRoute } from '@tanstack/react-router';
import { ProductCatalog } from '@/components/ProductCatalog';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/materias-primas')({head:()=>pageHead('Matérias-primas','Cadastro completo de matérias-primas da padaria.'),component:Page});
function Page(){return <ProductCatalog rawOnly/>;}
