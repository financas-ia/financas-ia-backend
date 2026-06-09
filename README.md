# Sistema de Gestão de Finanças Pessoais - Backend Principal (`gestao-financas-backend`)

Este repositório contém a **API REST principal** do ecossistema de Gestão de Finanças Pessoais com Inteligência de Dados. Desenvolvida em **NestJS** e **TypeScript**, esta aplicação é responsável por centralizar as regras de negócio, autenticação, controle de acessos, persistência de dados e a orquestração da comunicação com o microserviço de Inteligência Artificial.

## Tecnologias e Ferramentas Utilizadas

* **Framework:** NestJS (TypeScript) 


* **ORM:** Prisma ORM 


* **Banco de Dados:** PostgreSQL 


* **Documentação da API:** Swagger ou Scalar 


* **Disparo de E-mails:** Mailtrap 


* **Integração CMS:** Prismic CMS (gerenciamento de artigos e categorias) 


* **Ambiente de Desenvolvimento:** Docker (para containerização do banco de dados)

---

## Arquitetura e Papel no Ecossistema

Como parte de uma arquitetura de microserviços, o Backend Principal atua como uma camada intermediária (orquestradora) entre a interface do usuário e o motor de IA.

```
[Usuário (Browser)] ➡️ [Next.js (Frontend)] ➡️ [NestJS (API Principal) ⭐️] ➡️ [FastAPI (Microserviço IA)]

```

### Principais Responsabilidades:

* **Autenticação e Autorização:** Controle de acesso seguro diferenciando perfis de *Administrador* e *Usuário Comum*.


* **Gestão Transacional:** Lógica de cálculo de saldos, fluxo de receitas/despesas e acúmulo de metas financeiras.


* **Integração de Serviços:** Consumo de dados analíticos e predições do microserviço Python e consumo de artigos do Prismic CMS.


* **Notificações:** Disparo de alertas automáticos de orçamentos estourados através do Mailtrap.



---

## Funcionalidades Implementadas (Escopo da API)

### 1. Autenticação e Usuários (Módulo 1 & 2)

* Cadastro de usuários comuns com os campos: Nome Completo, Idade, E-mail, Foto (URL) e Senha.


* Login funcional diferenciando perfis `Admin` e `Usuário Comum`.


* Fluxo de recuperação de senha com validação de token enviado por e-mail.


* Painel do Administrador com moderação de usuários e estatísticas agregadas.



### 2. Transações e Categorias (Módulo 4)

* CRUD de receitas e despesas (Descrição, Valor em R$, Data, Tipo e Categoria).


* Listagem histórica com filtros por descrição, categoria, tipo e intervalo de datas.


* Proxy/Comunicação com o microserviço Python para **Autocategorização** automática baseada na descrição.



### 3. Planejamento e Metas (Módulo 5)

* Definição de limite máximo de gastos mensais por categoria.


* Criação e acompanhamento de Metas de Economia (Nome, Valor Alvo, Data Limite e histórico de aportes).



### 4. Integrações e Notificações (Módulo 6 & 7)

* Integração com Prismic CMS para alimentar a listagem de artigos do Blog.


* Gatilhos integrados com Mailtrap para disparar relatórios mensais e alertas preditivos de orçamento estourado.


* Suporte a WebSockets para a comunicação em tempo real do Assistente Virtual (Chatbot).



---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [Docker](https://www.docker.com/) e Docker Compose (opcional, para rodar o banco de dados)
* Uma conta no [Mailtrap](https://mailtrap.io/) para testar o envio de e-mails.

---

## 🔧 Configuração e Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/gestao-financas-backend.git
cd gestao-financas-backend

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure as Variáveis de Ambiente:**
Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:
```env
# Configurações do Banco de Dados (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/financas_db?schema=public"

# NestJS App
PORT=3000
JWT_SECRET="sua_chave_secreta_aqui"

# Integração com Microserviço de IA (Python/FastAPI)
IA_SERVICE_URL="http://localhost:8000"

# Prismic CMS
PRISMIC_API_ENDPOINT="https://seu-repositorio.prismic.io/api/v2"
PRISMIC_ACCESS_TOKEN="seu_token_aqui"

# Mailtrap
MAILTRAP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_PORT=2525
MAILTRAP_USER="seu_usuario_mailtrap"
MAILTRAP_PASS="sua_senha_mailtrap"

```


4. **Execute as Migrations do Prisma:**
Certifique-se de que seu banco PostgreSQL está ativo e execute:
```bash
npx prisma migrate dev

```


5. **Inicie o servidor de desenvolvimento:**
```bash
npm run start:dev

```


A API estará disponível em `http://localhost:3000`.

---

## Documentação da API

A documentação interativa dos endpoints está disponível através do **Swagger**. Com a aplicação rodando em ambiente de desenvolvimento, acesse:

🌐 `http://localhost:3000/api/docs`

Aqui você encontrará a descrição de todas as rotas, parâmetros necessários, headers de autenticação JWT e os formatos das respostas (JSON).

---

## Fluxo de Trabalho do Git (Git Flow)

Seguimos rigidamente a estratégia de branches definida no ecossistema central:

* `main`: Produção (código 100% estável).
* `staging`: Homologação e testes integrados pré-produção.
* `develop`: Branch principal de desenvolvimento.

**Regra de Ouro:** Nunca comite diretamente nas branches fixas. Crie sempre uma branch a partir da `develop`:

* Para novas features: `feature/nome-da-funcionalidade`
* Para correções: `bugfix/nome-do-bug`

Lembre-se de utilizar a convenção de **Conventional Commits** (ex: `feat: add register validations`, `fix: auth token expiration`). All Pull Requests devem apontar obrigatoriamente para a branch `develop`.
