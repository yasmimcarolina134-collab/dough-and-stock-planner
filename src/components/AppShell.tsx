import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Btn } from "./ui-kit";
import { LayoutDashboard, Package, Wheat, Layers, ClipboardList, Calculator, ShoppingCart, Warehouse, Truck, ArrowLeftRight, Factory, Menu, X, LogOut } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/produtos", label: "Cadastro de Produtos", icon: Package },
  { to: "/materias-primas", label: "Matérias-primas", icon: Wheat },
  { to: "/receitas", label: "Ficha técnica (BOM)", icon: Layers },
  { to: "/estoque", label: "Controle de estoque", icon: Warehouse },
  { to: "/movimentacoes", label: "Movimentações", icon: ArrowLeftRight },
  { to: "/fornecedores", label: "Fornecedores", icon: Truck },
  { to: "/planejamento", label: "Planejamento", icon: ClipboardList },
  { to: "/mrp", label: "Cálculo MRP", icon: Calculator },
  { to: "/ordens", label: "Ordens", icon: Factory },
  { to: "/compras", label: "Relatório de compras", icon: ShoppingCart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen md:flex">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-sidebar px-4 py-3 md:hidden">
        <Brand />
        <Btn variant="ghost" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X size={18}/> : <Menu size={18}/>}</Btn>
      </header>
      <aside className={`${open ? "block" : "hidden"} md:block md:w-64 shrink-0 bg-sidebar text-sidebar-foreground md:min-h-screen`}>
        <div className="hidden md:block p-6">
          <Brand />
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-4">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "!bg-sidebar-primary !text-sidebar-primary-foreground" }}>
              <n.icon size={17} className="shrink-0"/>{n.label}
            </Link>
          ))}
          <Btn variant="ghost" onClick={() => void supabase.auth.signOut()} className="mt-6"><LogOut size={16}/>Sair</Btn>
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8 xl:p-10">{children}</main>
    </div>
  );
}
function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><Wheat size={23}/></div>
      <div>
        <div className="font-display text-lg font-semibold leading-none text-sidebar-foreground">Padaria MRP</div>
        <div className="text-[11px] text-sidebar-foreground/60">Gestão Inteligente</div>
      </div>
    </div>
  );
}
