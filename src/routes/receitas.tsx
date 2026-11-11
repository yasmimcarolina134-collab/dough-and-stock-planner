import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Btn, Card, Input, PageHeader, fmt } from "@/components/ui-kit";

export const Route = createFileRoute("/receitas")({
  head: () => ({ meta: [{ title: "Lista de materiais | Padaria MRP" }, { name: "description", content: "Receita de cada produto com ingredientes e quantidades por unidade fabricada." }, { property: "og:title", content: "Lista de materiais | Padaria MRP" }, { property: "og:description", content: "Receita de cada produto com ingredientes e quantidades por unidade fabricada." }] }),
  component: Page,
});

function Page() {
  const { dados, setDados } = useStore();
  const [sel, setSel] = useState(dados.produtos[0]?.id ?? "");
  const [ing, setIng] = useState("");
  const [qtd, setQtd] = useState("");
  const prod = dados.produtos.find((p) => p.id === sel) ?? dados.produtos[0];
  const itens = dados.receitas.filter((r) => r.produtoId === prod?.id);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const q = Number(qtd);
    if (!prod || !ing || !(q > 0)) return;
    setDados((d) => ({ ...d, receitas: [...d.receitas.filter((r) => !(r.produtoId === prod.id && r.ingredienteId === ing)), { produtoId: prod.id, ingredienteId: ing, quantidade: q }] }));
    setIng(""); setQtd("");
  };
  return (
    <>
      <PageHeader title="Lista de materiais" subtitle="Quantidade de cada ingrediente para fabricar 1 unidade do produto." />
      <div className="mb-4 flex flex-wrap gap-2">
        {dados.produtos.map((p) => (
          <Btn key={p.id} variant={p.id === prod?.id ? "primary" : "ghost"} onClick={() => setSel(p.id)}>{p.nome}</Btn>
        ))}
      </div>
      {prod && (
        <Card>
          <h2 className="font-display text-xl font-semibold">{prod.nome} <span className="font-mono text-xs text-muted-foreground">{prod.codigo}</span></h2>
          <ul className="mt-3 divide-y">
            {itens.length === 0 && <li className="py-3 text-sm text-muted-foreground">Receita ainda vazia.</li>}
            {itens.map((r) => {
              const i = dados.ingredientes.find((x) => x.id === r.ingredienteId);
              return (
                <li key={r.ingredienteId} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{i?.nome}</span>
                  <span className="flex items-center gap-3"><b>{fmt(r.quantidade)} {i?.unidade}</b>
                    <Btn variant="danger" onClick={() => setDados((d) => ({ ...d, receitas: d.receitas.filter((x) => x !== r) }))}>Remover</Btn></span>
                </li>
              );
            })}
          </ul>
          <form onSubmit={add} className="mt-4 grid grid-cols-2 gap-2 border-t pt-4 md:grid-cols-[2fr_1fr_auto]">
            <select value={ing} onChange={(e) => setIng(e.target.value)} className="col-span-2 md:col-span-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" required>
              <option value="">Selecione o ingrediente…</option>
              {dados.ingredientes.map((i) => <option key={i.id} value={i.id}>{i.nome} ({i.unidade})</option>)}
            </select>
            <Input type="number" step="any" min="0" placeholder="Qtd. por unidade" value={qtd} onChange={(e) => setQtd(e.target.value)} required />
            <Btn type="submit">+ Adicionar</Btn>
          </form>
        </Card>
      )}
    </>
  );
}
