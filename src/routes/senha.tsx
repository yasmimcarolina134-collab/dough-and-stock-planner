import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/erp-store';
import { Btn,Input,PageHeader } from '@/components/ui-kit';
import { Field } from '@/components/erp-ui';
export const Route=createFileRoute('/senha')({head:()=>pageHead('Redefinir senha','Defina uma nova senha para sua conta na Padaria MRP.'),component:Page});
function Page(){const [password,setPassword]=useState(''),[message,setMessage]=useState('');return <><PageHeader title="Redefinir senha"/><form className="max-w-sm space-y-4" onSubmit={async e=>{e.preventDefault();const r=await supabase.auth.updateUser({password});setMessage(r.error?r.error.message:'Senha atualizada com sucesso');}}><Field label="Nova senha"><Input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></Field><Btn>Salvar senha</Btn><p role="status">{message}</p></form></>;}
