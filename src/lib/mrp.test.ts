import { describe, expect, it } from "vitest";
import { calcularMRP, type Dados } from "./mrp";

const base: Dados = {
  produtos: [{ id: "p", codigo: "X", nome: "Pão", descricao: "" }],
  ingredientes: [{ id: "f", nome: "Farinha", unidade: "kg", estoque: 10, recebimentos: 5 }],
  receitas: [{ produtoId: "p", ingredienteId: "f", quantidade: 0.5 }],
  plano: { p: 40 },
};

describe("MRP", () => {
  it("líquida = bruta - estoque - recebimentos", () => {
    const l = calcularMRP(base)[0]!;
    expect(l.bruta).toBe(20);
    expect(l.liquida).toBe(5);
    expect(l.suficiente).toBe(false);
  });
  it("não fica negativa quando há estoque suficiente", () => {
    const l = calcularMRP({ ...base, plano: { p: 10 } })[0]!;
    expect(l.liquida).toBe(0);
    expect(l.suficiente).toBe(true);
  });
});
