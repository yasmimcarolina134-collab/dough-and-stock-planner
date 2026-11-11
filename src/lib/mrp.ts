export type Produto = { id: string; codigo: string; nome: string; descricao: string };
export type Ingrediente = { id: string; nome: string; unidade: string; estoque: number; recebimentos: number };
export type ItemReceita = { produtoId: string; ingredienteId: string; quantidade: number };
export type Plano = Record<string, number>;
export type Dados = { produtos: Produto[]; ingredientes: Ingrediente[]; receitas: ItemReceita[]; plano: Plano };

export type LinhaMRP = Ingrediente & { bruta: number; liquida: number; suficiente: boolean };

export function calcularMRP(d: Dados): LinhaMRP[] {
  return d.ingredientes.map((ing) => {
    const bruta = d.receitas
      .filter((r) => r.ingredienteId === ing.id)
      .reduce((s, r) => s + r.quantidade * (d.plano[r.produtoId] ?? 0), 0);
    const liquida = Math.max(0, bruta - ing.estoque - ing.recebimentos);
    return { ...ing, bruta: round(bruta), liquida: round(liquida), suficiente: liquida === 0 };
  });
}

export const round = (n: number) => Math.round(n * 1000) / 1000;
export const uid = () => Math.random().toString(36).slice(2, 10);

export const demo: Dados = {
  produtos: [
    { id: "p1", codigo: "PF-001", nome: "Pão francês", descricao: "Pão crocante tradicional, 50 g" },
    { id: "p2", codigo: "BS-002", nome: "Bolo simples", descricao: "Bolo de massa amanteigada, 1 unidade" },
    { id: "p3", codigo: "PQ-003", nome: "Pão de queijo", descricao: "Pão de queijo mineiro, 30 g" },
  ],
  ingredientes: [
    { id: "i1", nome: "Farinha de trigo", unidade: "kg", estoque: 20, recebimentos: 5 },
    { id: "i2", nome: "Açúcar", unidade: "kg", estoque: 3, recebimentos: 0 },
    { id: "i3", nome: "Fermento", unidade: "kg", estoque: 0.5, recebimentos: 0 },
    { id: "i4", nome: "Sal", unidade: "kg", estoque: 2, recebimentos: 0 },
    { id: "i5", nome: "Leite", unidade: "L", estoque: 4, recebimentos: 2 },
    { id: "i6", nome: "Ovos", unidade: "un", estoque: 30, recebimentos: 0 },
    { id: "i7", nome: "Água", unidade: "L", estoque: 50, recebimentos: 0 },
    { id: "i8", nome: "Polvilho", unidade: "kg", estoque: 2, recebimentos: 0 },
    { id: "i9", nome: "Queijo minas", unidade: "kg", estoque: 1, recebimentos: 0 },
  ],
  receitas: [
    { produtoId: "p1", ingredienteId: "i1", quantidade: 0.03 },
    { produtoId: "p1", ingredienteId: "i3", quantidade: 0.001 },
    { produtoId: "p1", ingredienteId: "i4", quantidade: 0.0006 },
    { produtoId: "p1", ingredienteId: "i7", quantidade: 0.018 },
    { produtoId: "p1", ingredienteId: "i2", quantidade: 0.0005 },
    { produtoId: "p2", ingredienteId: "i1", quantidade: 0.3 },
    { produtoId: "p2", ingredienteId: "i2", quantidade: 0.25 },
    { produtoId: "p2", ingredienteId: "i5", quantidade: 0.24 },
    { produtoId: "p2", ingredienteId: "i6", quantidade: 3 },
    { produtoId: "p2", ingredienteId: "i3", quantidade: 0.015 },
    { produtoId: "p3", ingredienteId: "i8", quantidade: 0.015 },
    { produtoId: "p3", ingredienteId: "i9", quantidade: 0.008 },
    { produtoId: "p3", ingredienteId: "i5", quantidade: 0.008 },
    { produtoId: "p3", ingredienteId: "i6", quantidade: 0.1 },
    { produtoId: "p3", ingredienteId: "i4", quantidade: 0.0003 },
  ],
  plano: { p1: 500, p2: 15, p3: 200 },
};
