import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/produtos", label: "Produtos" },
  { to: "/materias-primas", label: "Matérias-primas" },
  { to: "/receitas", label: "Lista de materiais" },
  { to: "/planejamento", label: "Planejamento" },
  { to: "/mrp", label: "Cálculo MRP" },
  { to: "/compras", label: "Relatório de compras" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { resetar } = useStore();
  return (
    <div className="min-h-screen md:flex">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-sidebar px-4 py-3 md:hidden">
        <Brand />
        <button onClick={() => setOpen(!open)} className="rounded-md px-3 py-1.5 text-sm font-semibold text-sidebar-foreground bg-sidebar-accent">{open ? "Fechar" : "Menu"}</button>
      </header>
      <aside className={`${open ? "block" : "hidden"} md:block md:w-64 shrink-0 bg-sidebar text-sidebar-foreground md:min-h-screen`}>
        <div className="hidden md:block p-6">
          <Brand />
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-4">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "!bg-sidebar-primary !text-sidebar-primary-foreground" }}>
              {n.label}
            </Link>
          ))}
          <button onClick={() => confirm("Restaurar dados de demonstração?") && resetar()} className="mt-4 rounded-lg px-3 py-2 text-left text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground">
            ↺ Restaurar dados de demonstração
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-10 max-w-6xl">{children}</main>
    </div>
  );
}
function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-sidebar-primary text-lg">🥖</div>
      <div>
        <div className="font-display text-lg font-semibold leading-none text-sidebar-foreground">Padaria MRP</div>
        <div className="text-[11px] text-sidebar-foreground/60">Gestão Inteligente</div>
      </div>
    </div>
  );
}
