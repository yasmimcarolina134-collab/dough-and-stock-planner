import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { demo, type Dados } from "./mrp";

const KEY = "padaria-mrp-v1";
type Ctx = { dados: Dados; setDados: (f: (d: Dados) => Dados) => void; resetar: () => void };
const C = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [dados, set] = useState<Dados>(demo);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) set(JSON.parse(s)); } catch {}
    setOk(true);
  }, []);
  useEffect(() => { if (ok) localStorage.setItem(KEY, JSON.stringify(dados)); }, [dados, ok]);
  return <C.Provider value={{ dados, setDados: (f) => set(f), resetar: () => set(demo) }}>{children}</C.Provider>;
}
export function useStore() { const c = useContext(C); if (!c) throw new Error("no store"); return c; }
