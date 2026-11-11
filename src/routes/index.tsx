import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { calcularMRP } from "@/lib/mrp";
import { Card, PageHeader, fmt } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard | Padaria MRP" }, { name: "description", content: "Visão geral da produção, estoque e alertas de falta de materiais da padaria." }, { property: "og:title", content: "Dashboard | Padaria MRP" }, { property: "og:description", content: "Visão geral da produção, estoque e alertas de falta de materiais da padaria." }] }),
  component: Dashboard,
});

function Dashboard() {
  const { dados } = useStore();
  const mrp = calcularMRP(dados);
  const falta = mrp.filter((l) => !l.suficiente);
  const planejados = dados.produtos.filter((p) => (dados.plano[p.id] ?? 0) > 0);
  const total = planejados.reduce((s, p) => s + (dados.plano[p.id] ?? 0), 0);
  const stats = [
    { label: "Produtos cadastrados", value: dados.produtos.length, to: "/produtos" },
    { label: "Ingredientes em estoque", value: dados.ingredientes.filter((i) => i.estoque > 0).length, to: "/materias-primas" },
    { label: "Unidades planejadas", value: fmt(total), to: "/planejamento" },
    { label: "Alertas de falta", value: falta.length, to: "/compras", alert: falta.length > 0 },
  ] as const;
  return (
    <>
      <PageHeader title="Bom dia, padeiro! ☕" subtitle="Resumo do planejamento de materiais de hoje." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className={`h-full transition hover:-translate-y-0.5 ${"alert" in s && s.alert ? "border-destructive/40 bg-destructive/5" : ""}`}>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className={`mt-2 font-display text-4xl font-semibold ${"alert" in s && s.alert ? "text-destructive" : "text-primary"}`}>{s.value}</div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl font-semibold">Produção planejada</h2>
          <ul className="mt-3 divide-y">
            {planejados.length === 0 && <li className="py-3 text-sm text-muted-foreground">Nenhum produto planejado.</li>}
            {planejados.map((p) => (
              <li key={p.id} className="flex justify-between py-2.5 text-sm"><span>{p.nome}</span><b>{fmt(dados.plano[p.id] ?? 0)} un</b></li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl font-semibold">Alertas de materiais</h2>
          <ul className="mt-3 space-y-2">
            {mrp.map((l) => (
              <li key={l.id} className={`flex justify-between rounded-lg px-3 py-2 text-sm ${l.suficiente ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                <span className="font-semibold">{l.suficiente ? "✓" : "⚠"} {l.nome}</span>
                <span>{l.suficiente ? "Suficiente" : `Faltam ${fmt(l.liquida)} ${l.unidade}`}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
