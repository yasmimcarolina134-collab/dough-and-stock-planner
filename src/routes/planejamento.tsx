import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Btn, Input, PageHeader, Table, Td } from "@/components/ui-kit";

export const Route = createFileRoute("/planejamento")({
  head: () => ({ meta: [{ title: "Planejamento de produção | Padaria MRP" }, { name: "description", content: "Informe quantas unidades de cada produto a padaria deseja produzir." }, { property: "og:title", content: "Planejamento de produção | Padaria MRP" }, { property: "og:description", content: "Informe quantas unidades de cada produto a padaria deseja produzir." }] }),
  component: Page,
});

function Page() {
  const { dados, setDados } = useStore();
  return (
    <>
      <PageHeader title="Planejamento de produção" subtitle="Defina as unidades a produzir — o MRP é recalculado na hora."
        action={<Link to="/mrp"><Btn>Ver cálculo MRP →</Btn></Link>} />
      <Table head={["Código", "Produto", "Unidades a produzir"]}>
        {dados.produtos.map((p) => (
          <tr key={p.id}>
            <Td className="font-mono text-xs">{p.codigo}</Td><Td className="font-semibold">{p.nome}</Td>
            <Td><Input type="number" min="0" className="max-w-36" value={dados.plano[p.id] ?? 0}
              onChange={(e) => setDados((d) => ({ ...d, plano: { ...d.plano, [p.id]: Math.max(0, Number(e.target.value) || 0) } }))} /></Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
