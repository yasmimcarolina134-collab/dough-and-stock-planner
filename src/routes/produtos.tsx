import { createFileRoute } from '@tanstack/react-router';
import { ProductCatalog } from '@/components/ProductCatalog';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/produtos')({head:()=>pageHead('Cadastro de Produtos','Gerenciamento de produtos, categorias, custos e estoque.'),component:Page});
function Page(){return <ProductCatalog/>;}
