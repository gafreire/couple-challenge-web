# 💑 Couple Challenge — Frontend

Uma aplicação web gamificada para casais criarem desafios e competirem por pontos através da conclusão de tarefas.

---

## 🚀 Stack

- **React 19** + **TypeScript** + **Vite**
- **Styled Components** — CSS-in-JS com temas centralizados
- **Zustand** — gerenciamento de estado global
- **React Hook Form** + **Zod** — formulários e validação
- **Axios** — HTTP client com interceptors
- **React Router v6** — roteamento com layout routes
- **lucide-react** — ícones SVG

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/couple-challenge-frontend

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

---

## 📁 Estrutura de Pastas

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
│   │   └── (componentes compartilhados de challenges)
│   │       ├── TaskItem.tsx
│   │       ├── CreateTaskModal.tsx
│   │       └── EditTaskModal.tsx
│   ├── dashboard/          # DashboardPage
│   └── profile/            # ProfilePage
├── services/
│   ├── api.ts              # Instância Axios configurada
│   ├── auth.service.ts
│   ├── couple.service.ts
│   ├── challenge.service.ts
│   ├── task.service.ts
│   └── user.service.ts
├── store/
│   └── authStore.ts        # Zustand store
├── types/
│   ├── auth.types.ts
│   ├── couple.types.ts
│   ├── challenge.types.ts
│   ├── task.types.ts
│   └── user.types.ts
├── styles/
│   ├── theme.ts
│   └── GlobalStyle.ts
└── routes/
    └── AppRoutes.tsx
```

---

## 🗺️ Rotas

| Rota | Tipo | Página |
|------|------|--------|
| `/login` | Pública | LoginPage |
| `/signup` | Pública | SignupPage |
| `/dashboard` | Privada | DashboardPage |
| `/couple` | Privada | CouplePage |
| `/challenges` | Privada | ChallengesPage |
| `/tasks` | Privada | TasksPage |
| `/profile` | Privada | ProfilePage |
| `/` | Redirect | → `/dashboard` |

---

## ✅ Funcionalidades Implementadas

### Autenticação
- [x] Cadastro de conta com nome, email e senha
- [x] Login com email e senha
- [x] Logout
- [x] Proteção de rotas privadas
- [x] Persistência de sessão via localStorage
- [x] Interceptor Axios para injeção de token JWT
- [x] Redirecionamento automático em caso de 401

### Casal
- [x] Envio de convite por email
- [x] Visualização de convite pendente enviado
- [x] Visualização de convites recebidos
- [x] Aceitar convite
- [x] Recusar convite
- [x] Cancelar convite enviado
- [x] Sair do casal
- [x] Detecção automática de estado (sem casal / pendente / recebido / ativo)

### Desafios
- [x] Criar desafio com nome, datas e tipo de período
- [x] Validação de datas (fim deve ser posterior ao início)
- [x] Visualizar desafio ativo com progress bar e dias restantes
- [x] Pontuação em tempo real de ambos os parceiros
- [x] Finalizar desafio (liberado apenas após o fim do período)
- [x] Histórico de desafios concluídos e cancelados com vencedor e placar

### Tarefas
- [x] Criar tarefa com nome, descrição, pontos e máximo de conclusões
- [x] Listar tarefas do desafio ativo
- [x] Editar tarefa (apenas o criador)
- [x] Deletar tarefa (apenas o criador)
- [x] Concluir tarefa acumulando pontos
- [x] Bloqueio de conclusão ao atingir `max_completions`
- [x] Contagem de conclusões por tarefa

### Dashboard
- [x] Saudação personalizada
- [x] Placar atual lado a lado com destaque para quem está ganhando
- [x] Card do desafio ativo com progresso e dias restantes
- [x] Mensagens contextuais quando sem casal ou desafio

### Perfil
- [x] Visualizar foto, nome e email
- [x] Editar nome e foto de perfil via URL
- [x] Feedback de sucesso com auto-dismiss
- [x] Atualização imediata do store após edição

### Layout
- [x] Bottom navigation no mobile (< 768px)
- [x] Sidebar lateral colapsável no desktop (≥ 768px)
- [x] Tema dark com design tokens centralizados

---

## 🛣️ Roadmap

### v1.1 — Melhorias de UX
- [ ] Toggle dark/light theme
- [ ] Skeleton loading states (substituir texto "Carregando...")
- [ ] Toast notifications (substituir `ErrorMessage` inline)
- [ ] Animações de transição entre páginas
- [ ] Pull-to-refresh no mobile

### v1.2 — Upload de Mídia
- [ ] Upload de foto de perfil direto pela interface (sem URL manual)
- [ ] Foto ao completar tarefa (`photo_url`) como evidência de conclusão
- [ ] Galeria de fotos por tarefa

### v1.3 — Tempo Real
- [ ] Notificações quando o parceiro conclui uma tarefa
- [ ] Atualização de pontuação em tempo real via WebSocket ou polling
- [ ] Indicador de "parceiro online"

### v1.4 — PWA e Deploy
- [ ] Configuração de PWA — instalação no celular como app nativo
- [ ] Deploy frontend no Vercel
- [ ] Deploy backend no Railway
- [ ] CI/CD via GitHub Actions

### v2.0 — Novas Funcionalidades
- [ ] React Query para cache e sincronização inteligente de dados
- [ ] Sistema de conquistas e badges por marcos atingidos
- [ ] Comentários e reações nas tarefas concluídas
- [ ] Modo cooperativo (sem competição, pontos somados juntos)
- [ ] Estatísticas históricas com gráficos por período
- [ ] Compartilhamento de resultado do desafio via link

---

## 🔌 Integração com a API

O frontend consome a API REST do [Couple Challenge Backend](https://github.com/seu-usuario/couple-challenge-backend).

### Endpoints consumidos

| Domínio | Endpoints |
|---------|-----------|
| Auth | `POST /auth/login`, `POST /auth/signup` |
| Usuário | `GET /user/profile`, `PUT /user/profile` |
| Casal | `POST /couples`, `GET /couples/me`, `GET /couples/me/pending`, `GET /couples/invites`, `PUT /couples/:id/accept`, `PUT /couples/:id/decline`, `DELETE /couples/:id`, `DELETE /couples/me` |
| Desafios | `POST /challenges`, `GET /challenges`, `GET /challenges/active`, `GET /challenges/:id/score`, `PUT /challenges/:id/finish` |
| Tarefas | `POST /tasks`, `GET /challenges/:id/tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`, `POST /task-completions` |

---

## 🤝 Convenções do Projeto

### Commits

O projeto usa o padrão **Gitmoji**:

```
✨ feat: nova funcionalidade
🐛 fix: correção de bug
♻️ refactor: refatoração sem mudança de comportamento
🔧 chore: configuração e setup
📝 docs: documentação
```

### Styled Components

- Estilos em arquivos separados `Component.styles.ts`
- Todos os valores via tokens do tema — sem valores hardcoded
- Props dinâmicas com prefixo `$` (ex: `$isWinning`, `$collapsed`)

### Formulários

- Campos numéricos validados como `string` no Zod e convertidos no `onSubmit`
- Erros da API exibidos via `ErrorMessage` — nunca `alert()` ou `console.error`
- `axios.isAxiosError()` para acessar `err.response.data.error`

---

## 📄 Licença

MIT