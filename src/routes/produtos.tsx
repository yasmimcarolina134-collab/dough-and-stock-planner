import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { uid, type Produto } from "@/lib/mrp";
import { Btn, Card, Input, PageHeader, Table, Td } from "@/components/ui-kit";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [{ title: "Produtos | Padaria MRP" }, { name: "description", content: "Cadastro de produtos da padaria com nome, código e descrição." }, { property: "og:title", content: "Produtos | Padaria MRP" }, { property: "og:description", content: "Cadastro de produtos da padaria com nome, código e descrição." }] }),
  component: Page,
});

const vazio = { codigo: "", nome: "", descricao: "" };
function Page() {
  const { dados, setDados } = useStore();
  const [f, setF] = useState(vazio);
  const [edit, setEdit] = useState<string | null>(null);
  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.nome || !f.codigo) return;
    setDados((d) => ({ ...d, produtos: edit ? d.produtos.map((p) => (p.id === edit ? { ...p, ...f } : p)) : [...d.produtos, { id: uid(), ...f }] }));
    setF(vazio); setEdit(null);
  };
  const remover = (p: Produto) => confirm(`Excluir ${p.nome}?`) && setDados((d) => ({ ...d, produtos: d.produtos.filter((x) => x.id !== p.id), receitas: d.receitas.filter((r) => r.produtoId !== p.id) }));
  return (
    <>
      <PageHeader title="Produtos" subtitle="Itens fabricados pela padaria." />
      <Card className="mb-6">
        <form onSubmit={salvar} className="grid gap-3 md:grid-cols-[120px_1fr_2fr_auto]">
          <Input placeholder="Código" value={f.codigo} onChange={(e) => setF({ ...f, codigo: e.target.value })} required />
          <Input placeholder="Nome do produto" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} required />
          <Input placeholder="Descrição" value={f.descricao} onChange={(e) => setF({ ...f, descricao: e.target.value })} />
          <div className="flex gap-2"><Btn type="submit">{edit ? "Salvar" : "+ Adicionar"}</Btn>{edit && <Btn variant="ghost" type="button" onClick={() => { setEdit(null); setF(vazio); }}>Cancelar</Btn>}</div>
        </form>
      </Card>
      <Table head={["Código", "Nome", "Descrição", ""]}>
        {dados.produtos.map((p) => (
          <tr key={p.id}>
            <Td className="font-mono text-xs">{p.codigo}</Td><Td className="font-semibold">{p.nome}</Td><Td className="text-muted-foreground">{p.descricao}</Td>
            <Td className="text-right whitespace-nowrap"><Btn variant="ghost" onClick={() => { setEdit(p.id); setF({ codigo: p.codigo, nome: p.nome, descricao: p.descricao }); }}>Editar</Btn> <Btn variant="danger" onClick={() => remover(p)}>Excluir</Btn></Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
