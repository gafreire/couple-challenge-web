# 💑 Couple Challenge — Frontend

> Uma aplicação web gamificada para casais competirem através de desafios e tarefas pontuadas

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-6-pink)](https://styled-components.com/)

---

## 📋 Sobre o Projeto

Couple Challenge é uma aplicação frontend que permite casais criarem desafios com tarefas pontuadas, competirem de forma saudável e acompanharem o progresso através de um sistema de gamificação. Consome a [Couple Challenge API](https://github.com/gafreire/couple-challenge-api).

### ✨ Funcionalidades Principais

- 🔐 **Autenticação** - Login e cadastro com JWT
- 💑 **Gestão de Casais** - Convites, aceitar, recusar, sair
- 🎯 **Desafios** - Criar desafios com períodos personalizados
- ✅ **Tarefas** - CRUD completo de tarefas pontuadas
- 🏆 **Pontuação** - Placar em tempo real com destaque para o líder
- 📊 **Histórico** - Acompanhe todos os desafios completados

---

## 🚀 Demo

**Status:** MVP Frontend 100% Completo  
**Deploy:** Em breve (Fase 3 do roadmap)

---

## 🛠️ Tecnologias

### Core
- **React 19** - Framework principal
- **TypeScript 5** - Linguagem com tipagem estática
- **Vite 6** - Build tool com HMR rápido

### Estilização & UI
- **Styled Components 6** - CSS-in-JS com temas centralizados
- **lucide-react** - Ícones SVG consistentes

### Estado & Formulários
- **Zustand 5** - Gerenciamento de estado global
- **React Hook Form 7** - Formulários performáticos
- **Zod 3** - Validação de schemas com inferência de tipos

### HTTP & Roteamento
- **Axios** - HTTP client com interceptors
- **React Router v6** - Roteamento com layout routes

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── layout/             # Sidebar, BottomNav, PrivateLayout
├── pages/
│   ├── auth/               # LoginPage, SignupPage
│   ├── couple/             # CouplePage + componentes de estado
│   │   └── components/
│   │       ├── NoCouple.tsx
│   │       ├── PendingInvite.tsx
│   │       ├── ReceivedInvite.tsx
│   │       └── ActiveCouple.tsx
│   ├── challenges/         # ChallengesPage + componentes
│   │   └── components/
│   │       ├── ActiveChallengeCard.tsx
│   │       ├── ChallengeHistoryItem.tsx
│   │       └── CreateChallengeModal.tsx
│   ├── tasks/              # TasksPage
│   │   └── components/
│   │       ├── TaskItem.tsx
│   │       ├── CreateTaskModal.tsx
│   │       └── EditTaskModal.tsx
│   ├── dashboard/          # DashboardPage
│   └── profile/            # ProfilePage
├── services/               # Camada de integração com a API
├── store/                  # Zustand stores
├── types/                  # Interfaces TypeScript por domínio
├── styles/                 # theme.ts, GlobalStyle.ts
└── routes/                 # AppRoutes.tsx
```

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/gafreire/couple-challenge-frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Configure o `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

> **Importante:** O arquivo `.env` deve estar na raiz do projeto, não em `src/`. Variáveis devem ter prefixo `VITE_` para serem expostas ao cliente.

---

## 🔌 Endpoints Consumidos

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/signup` | Criar conta |
| POST | `/api/auth/login` | Autenticar usuário |

### Usuário

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/user/profile` | Ver perfil | ✅ |
| PUT | `/api/user/profile` | Atualizar perfil | ✅ |

### Casais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/couples` | Criar casal (enviar convite) | ✅ |
| GET | `/api/couples/invites` | Listar convites recebidos | ✅ |
| GET | `/api/couples/me` | Ver dados do casal | ✅ |
| GET | `/api/couples/me/pending` | Ver convite pendente enviado | ✅ |
| PUT | `/api/couples/:id/accept` | Aceitar convite | ✅ |
| PUT | `/api/couples/:id/decline` | Recusar convite | ✅ |
| DELETE | `/api/couples/:id` | Cancelar convite | ✅ |
| DELETE | `/api/couples/me` | Sair do casal | ✅ |

### Desafios

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/challenges` | Criar desafio | ✅ |
| GET | `/api/challenges` | Listar desafios | ✅ |
| GET | `/api/challenges/active` | Ver desafio ativo | ✅ |
| GET | `/api/challenges/:id/score` | Ver pontuação atual | ✅ |
| PUT | `/api/challenges/:id/finish` | Finalizar desafio | ✅ |

### Tasks

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/tasks` | Criar task | ✅ |
| GET | `/api/challenges/:id/tasks` | Listar tasks do desafio | ✅ |
| PUT | `/api/tasks/:id` | Atualizar task | ✅ |
| DELETE | `/api/tasks/:id` | Deletar task | ✅ |
| POST | `/api/task-completions` | Completar task | ✅ |

---

## 🏗️ Arquitetura

### Padrão de Camadas

```
Usuário → Page → Service → Axios (api.ts) → API REST
            ↓                    ↓
         Zustand Store      Interceptors (JWT inject / 401 redirect)
```

### Separação de Responsabilidades

- **Routes:** Definição de rotas públicas, privadas e layout routes
- **Pages:** Orquestração de estado, chamada de services e renderização
- **Components:** Elementos visuais reutilizáveis e isolados
- **Services:** Encapsulamento das chamadas HTTP por domínio
- **Store:** Estado global (autenticação)
- **Types:** Interfaces TypeScript espelhando os modelos da API

---

## 🔐 Segurança

### Implementado ✅
- ✅ Token JWT armazenado no localStorage
- ✅ Injeção automática do token via interceptor Axios
- ✅ Redirecionamento automático em caso de 401
- ✅ Proteção de rotas privadas com PrivateRoute
- ✅ Validação client-side com Zod antes de qualquer requisição
- ✅ Controle de permissão por owner nas tarefas

### Planejado ⏳
- ⏳ Refresh tokens
- ⏳ Expiração automática de sessão com aviso
- ⏳ Proteção de rotas por papel (admin/user)

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP Backend (COMPLETO)
- [x] Auth Feature
- [x] User Feature
- [x] Couples Feature (8 endpoints)
- [x] Challenges Feature (5 endpoints)
- [x] Tasks Feature (4 endpoints)
- [x] Task Completions Feature

### ✅ Fase 2 - MVP Frontend (COMPLETO)
- [x] Setup React + Vite + TypeScript
- [x] Design System com Styled Components e tema dark
- [x] Autenticação UI (login, signup, logout)
- [x] Layout responsivo (sidebar desktop + bottom nav mobile)
- [x] Gestão de Casais (todos os estados)
- [x] Desafios (criar, listar, finalizar, histórico)
- [x] Tarefas (CRUD completo + completar)
- [x] Dashboard com placar em tempo real
- [x] Perfil editável

### 🚀 Fase 3 - Deploy Beta
- [ ] Deploy Backend (Railway)
- [ ] Deploy Frontend (Vercel)
- [ ] Banco em nuvem
- [ ] Monitoramento básico

### ⚡ Fase 4 - Features Avançadas
- [ ] Toggle dark/light theme
- [ ] Upload de foto de perfil (S3/Cloudinary)
- [ ] Foto ao completar tarefa como evidência
- [ ] Notificações em tempo real (WebSocket)
- [ ] PWA — instalação no celular como app nativo
- [ ] Gamificação (badges, conquistas)

### 🧪 Fase 5+ - Qualidade & Escala
- [ ] React Query para cache e sincronização de dados
- [ ] Testes automatizados (Vitest + Testing Library)
- [ ] CI/CD via GitHub Actions
- [ ] Skeleton loading states
- [ ] Toast notifications

---

### Padrão de Commits (Gitmoji)

- `✨` - Nova funcionalidade
- `🐛` - Correção de bug
- `📝` - Documentação
- `♻️` - Refatoração
- `🔧` - Configuração/manutenção

---

## 👨‍💻 Autor

**Gabriel Freire**

- GitHub: [@gafreire](https://github.com/gafreire)
- LinkedIn: [Gabriel Freire](https://www.linkedin.com/in/gabriel-freire-fumes/)

---

<p align="center">
  Feito com ❤️ por Gabriel Freire
</p>