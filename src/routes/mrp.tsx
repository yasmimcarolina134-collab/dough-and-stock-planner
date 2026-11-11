import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { calcularMRP } from "@/lib/mrp";
import { Card, PageHeader, Status, Table, Td, fmt } from "@/components/ui-kit";

export const Route = createFileRoute("/mrp")({
  head: () => ({ meta: [{ title: "Cálculo MRP | Padaria MRP" }, { name: "description", content: "Necessidade bruta, estoque, recebimentos e necessidade líquida de cada ingrediente." }, { property: "og:title", content: "Cálculo MRP | Padaria MRP" }, { property: "og:description", content: "Necessidade bruta, estoque, recebimentos e necessidade líquida de cada ingrediente." }] }),
  component: Page,
});

function Page() {
  const { dados } = useStore();
  const mrp = calcularMRP(dados);
  return (
    <>
      <PageHeader title="Cálculo MRP" subtitle="Receita × quantidade planejada, comparada ao estoque." />
      <Card className="mb-6 bg-secondary">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fórmula</div>
        <div className="mt-1 font-display text-lg">Necessidade líquida = Necessidade bruta − Estoque disponível − Recebimentos programados</div>
      </Card>
      <Table head={["Ingrediente", "Nec. bruta", "Estoque", "Receb. prog.", "Nec. líquida", "Situação"]}>
        {mrp.map((l) => (
          <tr key={l.id} className={l.suficiente ? "bg-success/5" : "bg-destructive/5"}>
            <Td className="font-semibold">{l.nome}</Td>
            <Td>{fmt(l.bruta)} {l.unidade}</Td><Td>{fmt(l.estoque)}</Td><Td>{fmt(l.recebimentos)}</Td>
            <Td className={`font-bold ${l.suficiente ? "text-success" : "text-destructive"}`}>{fmt(l.liquida)} {l.unidade}</Td>
            <Td><Status ok={l.suficiente} /></Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
