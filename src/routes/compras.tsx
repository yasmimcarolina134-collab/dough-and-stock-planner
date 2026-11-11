import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { calcularMRP } from "@/lib/mrp";
import { Btn, Card, PageHeader, Status, Table, Td, fmt } from "@/components/ui-kit";

export const Route = createFileRoute("/compras")({
  head: () => ({ meta: [{ title: "Relatório de compras | Padaria MRP" }, { name: "description", content: "Ingredientes a comprar, quantidades necessárias e itens disponíveis em estoque." }, { property: "og:title", content: "Relatório de compras | Padaria MRP" }, { property: "og:description", content: "Ingredientes a comprar, quantidades necessárias e itens disponíveis em estoque." }] }),
  component: Page,
});

function Page() {
  const { dados } = useStore();
  const mrp = calcularMRP(dados);
  const comprar = mrp.filter((l) => !l.suficiente);
  const ok = mrp.filter((l) => l.suficiente);
  return (
    <>
      <PageHeader title="Relatório de compras" subtitle={`Gerado em ${new Date().toLocaleDateString("pt-BR")}`}
        action={<Btn variant="ghost" onClick={() => window.print()}>🖨 Imprimir</Btn>} />
      <h2 className="mb-3 font-display text-xl font-semibold text-destructive">Precisa comprar ({comprar.length})</h2>
      {comprar.length ? (
        <Table head={["Ingrediente", "Quantidade a comprar", "Necessário", "Disponível", "Situação"]}>
          {comprar.map((l) => (
            <tr key={l.id} className="bg-destructive/5">
              <Td className="font-semibold">{l.nome}</Td><Td className="font-bold text-destructive">{fmt(l.liquida)} {l.unidade}</Td>
              <Td>{fmt(l.bruta)}</Td><Td>{fmt(l.estoque + l.recebimentos)}</Td><Td><Status ok={false} /></Td>
            </tr>
          ))}
        </Table>
      ) : <Card className="text-success font-semibold">Nenhuma compra necessária 🎉</Card>}
      <h2 className="mb-3 mt-8 font-display text-xl font-semibold text-success">Disponível em estoque ({ok.length})</h2>
      <Table head={["Ingrediente", "Necessário", "Disponível", "Sobra", "Situação"]}>
        {ok.map((l) => (
          <tr key={l.id} className="bg-success/5">
            <Td className="font-semibold">{l.nome}</Td><Td>{fmt(l.bruta)} {l.unidade}</Td><Td>{fmt(l.estoque + l.recebimentos)}</Td>
            <Td className="text-success font-bold">{fmt(l.estoque + l.recebimentos - l.bruta)}</Td><Td><Status ok /></Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
