import { createFileRoute } from '@tanstack/react-router';
import { Lots } from '@/components/Lots';
import { pageHead } from '@/lib/erp-store';
export const Route=createFileRoute('/lotes')({head:()=>pageHead('Lotes e validade','Lotes, prazos de validade e transferências entre depósitos.'),component:Lots});
