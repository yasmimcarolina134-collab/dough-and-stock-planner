# Dough And Stock Planner

Crie um sistema web chamado Padaria MRP – Gestão Inteligente, voltado para o planejamento das necessidades de materiais de uma padaria.



O sistema deve ter aparência moderna, organizada e profissional, com cores que remetam a uma padaria, como bege, marrom e branco.



1. Dashboard



- Mostrar quantidade de produtos cadastrados.

- Mostrar quantidade de ingredientes em estoque.

- Mostrar produtos planejados para fabricação.

- Mostrar alertas de materiais em falta.



2. Cadastro de produtos

Permitir cadastrar produtos como pão francês, bolo simples e pão de queijo, com nome, código e descrição.



3. Cadastro de matérias-primas

Permitir cadastrar ingredientes como farinha, açúcar, fermento, sal, leite, ovos e água, informando quantidade em estoque e unidade de medida.



4. Lista de materiais

Cada produto deverá possuir uma receita com os ingredientes e suas respectivas quantidades necessárias para fabricação.



5. Planejamento de produção

Permitir informar quantas unidades de cada produto a padaria deseja produzir.



6. Cálculo MRP automático

O sistema deverá multiplicar a quantidade de ingredientes da receita pela quantidade de produtos planejados, comparar com o estoque disponível e calcular a necessidade líquida de cada ingrediente.



Fórmula: Necessidade líquida = Necessidade bruta - Estoque disponível - Recebimentos programados.



7. Relatório de compras

Mostrar os ingredientes que precisam ser comprados, suas quantidades e quais estão disponíveis em estoque.



8. Alertas

Destacar em vermelho os ingredientes insuficientes e em verde os ingredientes suficientes.



O sistema deve ter menus de navegação, botões funcionais, tabelas organizadas e dados de demonstração para testar o funcionamento.



O objetivo é demonstrar na prática como o MRP ajuda uma padaria a planejar sua produção, controlar seu estoque e evitar a falta ou o excesso de matérias-primas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/205c6d3e-2adc-4ba1-b4ce-b2e84ac92568).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
