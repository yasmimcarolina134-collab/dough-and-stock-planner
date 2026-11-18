import { createFileRoute } from '@tanstack/react-router';
import { RecordsPage } from '@/components/RecordsPage';
import { pageHead } from '@/lib/erp-store';

export const Route=createFileRoute('/produtos-fiscais')({head:()=>pageHead('Produtos Fiscais','Gestão integrada de produtos fiscais da padaria.'),component:Page});
function Page(){return <RecordsPage title="Classificação fiscal dos produtos" table="products" fields={[{key:"name",label:"Produto",required:true},{key:"category_id",label:"Categoria",relation:"categories",required:true},{key:"type",label:"Tipo",default:"Produto acabado"},{key:"unit",label:"Unidade",default:"UN"},{key:"ncm",label:"NCM"},{key:"cfop",label:"CFOP"},{key:"tax_code",label:"CST / CSOSN"}]}/>;}
