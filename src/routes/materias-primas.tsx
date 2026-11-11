import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { uid, type Ingrediente } from "@/lib/mrp";
import { Btn, Card, Input, PageHeader, Table, Td, fmt } from "@/components/ui-kit";

export const Route = createFileRoute("/materias-primas")({
  head: () => ({ meta: [{ title: "Matérias-primas | Padaria MRP" }, { name: "description", content: "Cadastro de ingredientes com estoque, unidade de medida e recebimentos programados." }, { property: "og:title", content: "Matérias-primas | Padaria MRP" }, { property: "og:description", content: "Cadastro de ingredientes com estoque, unidade de medida e recebimentos programados." }] }),
  component: Page,
});

const vazio = { nome: "", unidade: "kg", estoque: "", recebimentos: "" };
function Page() {
  const { dados, setDados } = useStore();
  const [f, setF] = useState(vazio);
  const [edit, setEdit] = useState<string | null>(null);
  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.nome) return;
    const v = { nome: f.nome, unidade: f.unidade, estoque: Number(f.estoque) || 0, recebimentos: Number(f.recebimentos) || 0 };
    setDados((d) => ({ ...d, ingredientes: edit ? d.ingredientes.map((i) => (i.id === edit ? { ...i, ...v } : i)) : [...d.ingredientes, { id: uid(), ...v }] }));
    setF(vazio); setEdit(null);
  };
  const remover = (i: Ingrediente) => confirm(`Excluir ${i.nome}?`) && setDados((d) => ({ ...d, ingredientes: d.ingredientes.filter((x) => x.id !== i.id), receitas: d.receitas.filter((r) => r.ingredienteId !== i.id) }));
  return (
    <>
      <PageHeader title="Matérias-primas" subtitle="Ingredientes, estoque disponível e recebimentos programados." />
      <Card className="mb-6">
        <form onSubmit={salvar} className="grid grid-cols-2 gap-3 md:grid-cols-[2fr_110px_1fr_1fr_auto]">
          <Input className="col-span-2 md:col-span-1" placeholder="Nome do ingrediente" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} required />
          <select value={f.unidade} onChange={(e) => setF({ ...f, unidade: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            {["kg", "g", "L", "ml", "un"].map((u) => <option key={u}>{u}</option>)}
          </select>
          <Input type="number" step="any" min="0" placeholder="Estoque" value={f.estoque} onChange={(e) => setF({ ...f, estoque: e.target.value })} />
          <Input type="number" step="any" min="0" placeholder="Receb. programado" value={f.recebimentos} onChange={(e) => setF({ ...f, recebimentos: e.target.value })} />
          <div className="flex gap-2"><Btn type="submit">{edit ? "Salvar" : "+ Adicionar"}</Btn>{edit && <Btn variant="ghost" type="button" onClick={() => { setEdit(null); setF(vazio); }}>Cancelar</Btn>}</div>
        </form>
      </Card>
      <Table head={["Ingrediente", "Unidade", "Estoque", "Receb. programados", ""]}>
        {dados.ingredientes.map((i) => (
          <tr key={i.id}>
            <Td className="font-semibold">{i.nome}</Td><Td>{i.unidade}</Td><Td>{fmt(i.estoque)}</Td><Td>{fmt(i.recebimentos)}</Td>
            <Td className="text-right whitespace-nowrap"><Btn variant="ghost" onClick={() => { setEdit(i.id); setF({ nome: i.nome, unidade: i.unidade, estoque: String(i.estoque), recebimentos: String(i.recebimentos) }); }}>Editar</Btn> <Btn variant="danger" onClick={() => remover(i)}>Excluir</Btn></Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
