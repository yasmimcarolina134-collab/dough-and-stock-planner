import type { ReactNode, InputHTMLAttributes, ButtonHTMLAttributes } from "react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border bg-card p-5 shadow-soft ${className}`}>{children}</div>;
}
export function Btn({ variant = "primary", className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const v = { primary: "bg-primary text-primary-foreground hover:bg-primary/90", ghost: "border bg-card text-foreground hover:bg-accent", danger: "text-destructive hover:bg-destructive/10" }[variant];
  return <button {...p} className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${v} ${className}`} />;
}
export function Input(p: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={`w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring ${p.className ?? ""}`} />;
}
export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-secondary-foreground">
          <tr>{head.map((h, i) => <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  );
}
export const Td = ({ children, className = "" }: { children?: ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>;
export function Status({ ok }: { ok: boolean }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap ${ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>{ok ? "Suficiente" : "Insuficiente"}</span>;
}
export const fmt = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 3 });
