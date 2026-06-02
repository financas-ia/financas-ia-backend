# Sistema de Gestão de Finanças Pessoais com Inteligência de Dados

Repositório centralizador da API Principal do ecossistema de gerenciamento financeiro automatizado. O projeto foi arquitetado sob o modelo de microserviços para garantir escalabilidade, isolamento de escopo e facilidade de deploy.

---

## Visão Geral do Projeto

A plataforma permite que usuários comuns gerenciem suas finanças e recebam insights preditivos automatizados sobre sua saúde financeira. Os administradores gerenciam categorias globais de gastos, visualizam relatórios analíticos agregados e alimentam um portal de educação financeira integrado via CMS.

### Principais Funcionalidades Planejadas:
*   **Autocategorização:** Modelo de ML que classifica transações com base na descrição.
*   **Previsão de Gastos (Forecasting):** Projeção da curva de despesas até o fim do mês corrente.
*   **Assistente Virtual:** Chatbot integrado via LLM focado em finanças e educação financeira.

---

## Arquitetura do Ecossistema

Para evitar monólitos complexos e acoplamento de código de tecnologias distintas, o sistema é dividido em repositórios independentes que se comunicam via rede:

1.  **Frontend (`gestao-financas-frontend`):** Interface web responsiva desenvolvida em **Next.js**, responsável pela renderização dos painéis, gráficos interativos e consumo das APIs.
2.  **Backend Principal (`gestao-financas-backend`):** API Rest estruturada em **NestJS (TypeScript)** que centraliza as regras de negócio, autenticação, controle de usuários e persistência de dados com **PostgreSQL & Prisma ORM**.
3.  **Microserviço de IA (`gestao-financas-ia`):** *(Em breve)* API construída em **Python (FastAPI)** dedicada ao processamento de dados com Pandas/Scikit-Learn e interface com LLMs (Gemini API/LangChain).

### Fluxo de Comunicação:
`Usuário (Browser)` ➡️ `Next.js (Frontend)` ➡️ `NestJS (API Principal)` ➡️ `FastAPI (Microserviço IA)`

---

## Fluxo de Trabalho do Git (Git Flow)

Este projeto adota uma estratégia rígida de ramificação para garantir a estabilidade do código em produção:

*   **`main`:** Reflete o ambiente de **Produção**. Código 100% estável. Deploys automáticos acontecem a partir daqui.
*   **`staging`:** Ambiente de **Homologação/Pré-produção**. Utilizado para testes finais integrados antes do merge para a `main`.
*   **`develop`:** O coração do desenvolvimento. Todas as features concluídas são integradas aqui.

A partir da branch develop, para o desenvolvimento é preciso criar uma nova branch:

* **Novas Features:** \'feature/nome-da-funcionalidade\'
* **Correção de Bugs:** \'bugfix/nome-do-bug\'

### Como desenvolver uma nova funcionalidade:
Nenhum código deve ser commitado diretamente nas branchs fixas (`main`, `staging`, `develop`). Para trabalhar:

1. Garanta que está na branch de desenvolvimento e atualizado:
```bash
   git checkout develop
   git pull origin develop
```
2. Crie uma branch para o desenvolvimento da sua feature seguindo o padrão descrito acima:
```bash
  git checkout -b feature/nome-da-funcionalidade
```
3. Faça commits seguindo a convenção de **Conventional Commits** (ex: `feat: add jwt configuration`).
4. Ao concluir a feature ou correção de bug, abra um Pull Request apontado para a branch develop
```bash
   git push -u origin feature/nome-da-funcionalidade
```
5. Aguarde a execução da pipeline e revisão de outro desenvolvedor para mergear seu codigo a branch develop
