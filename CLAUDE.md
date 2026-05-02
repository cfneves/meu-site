# CLAUDE.md — Memória do Projeto: Portfolio Cláudio Ferreira Neves

> Leia este arquivo no início de cada nova sessão antes de qualquer alteração.
> Ele documenta tudo que foi decidido, construído e aprendido sobre este projeto.

---

## 1. Identidade do Projeto

**Proprietário:** Cláudio Ferreira Neves
**Objetivo:** Site portifólio profissional para atrair clientes B2B
**Posicionamento:** Especialista em **Power BI · Governança de Dados · Inteligência Artificial**
**Domínio:** claudioneves.com.br
**CNPJ:** 44.283.517/0001-00

### ⚠️ Ponto crítico de posicionamento
Cláudio presta serviços de BI **para** as áreas de Finanças e Controladoria, mas **não é especialista nessas áreas**. Nunca posicioná-lo como "especialista em Finanças/Controladoria". O correto é: "BI para Finanças & Controladoria".

---

## 2. Stack Técnica

| Tecnologia | Versão | Função |
|---|---|---|
| Astro | 6.1.4 | Framework principal (SSG/SSR) |
| @astrojs/cloudflare | 13.1.7 | Adapter para Cloudflare Pages |
| Wrangler | 4.x | CLI de deploy |
| Node.js | >=22.12.0 | Runtime mínimo requerido |

**Hospedagem:** Cloudflare Pages
**Build output:** `dist/client` (arquivos estáticos)
**Deploy command:** `npm run deploy`
**Pipeline completo:** `astro build && node scripts/patch-wrangler.js && wrangler pages deploy ./dist/client --project-name my-astro-app`

---

## 3. Estrutura de Pastas

```
my-astro-app/
├── src/
│   ├── pages/
│   │   └── index.astro          ← ARQUIVO PRINCIPAL (página única, ~600 linhas)
│   ├── components/
│   │   └── Welcome.astro        ← Componente padrão Astro, não usado na página
│   └── layouts/
│       └── Layout.astro         ← Wrapper HTML básico com slot (não usado em index)
├── public/
│   ├── claudio.jpg              ← Foto de perfil (usada na seção Sobre)
│   ├── logo-cn.png              ← Logo da marca (usada no nav e footer)
│   ├── favicon.ico
│   ├── favicon.svg
│   └── logos/                   ← Logos dos clientes
│       ├── senai-pa.png
│       ├── ponce-tech.webp
│       ├── grupo-lider.webp
│       ├── cinbesa.jpg
│       ├── save-co.png
│       ├── senai-sc.jpg
│       ├── faculdade-pitagoras.jpg
│       └── lanlink.jpg
├── scripts/
│   └── patch-wrangler.js        ← Script que corrige wrangler.json após build
├── dist/                        ← Build gerado (não editar manualmente)
├── astro.config.mjs             ← Configuração do Astro + adapter Cloudflare
├── wrangler.jsonc               ← Configuração do Cloudflare Pages/Workers
├── package.json
├── tsconfig.json
└── CLAUDE.md                    ← Este arquivo
```

---

## 4. Arquivo Principal: `src/pages/index.astro`

Toda a lógica, estilos e conteúdo estão neste único arquivo. Ele é uma single-page application com âncoras. **Não usar o Layout.astro** — o index.astro já tem `<html>`, `<head>` e `<body>` completos.

### Seções e seus IDs (âncoras obrigatórias)

| Seção | ID | Descrição |
|---|---|---|
| Navegação | `.nav` (fixed) | Logo + links + ícones de contato + botão CTA |
| Hero | `#hero` | Título principal + stats + domino de dashboards |
| Clientes | `#clientes` | 8 logos de empresas clientes |
| Serviços | `#servicos` | Card principal dark + 3 especialidades |
| Portfolio | `#portfolio` | 3 cards de projetos |
| Sobre | `#sobre` | Foto + bio + skills tags + botões sociais |
| Contato | `#contato` | 4 cards de contato (WA, Email, LinkedIn, GitHub) |
| Footer | `footer` | Barra simples com nav e copyright |

> ⚠️ Todos os links do nav DEVEM ter um `id` correspondente na página. Âncoras sem ID de destino simplesmente não funcionam (foi o bug original do site).

---

## 5. Sistema de Design

### Tokens de Cor (CSS variables)
```css
--bg:         #f5f7fa      /* fundo geral (cinza muito claro) */
--bg-2:       #ffffff      /* fundo de cards e seções alternadas */
--bg-3:       #eef0f4      /* fundo de elementos internos */
--glass:      rgba(0,0,0,0.03)
--glass-2:    rgba(0,0,0,0.05)
--border:     rgba(0,0,0,0.08)
--text:       #111827      /* texto principal */
--text-2:     #6b7280      /* texto secundário */
--text-3:     #9ca3af      /* texto terciário / labels */
--pbi:        #F2C811      /* amarelo Power BI — COR PRIMÁRIA */
--pbi-dim:    rgba(242,200,17,0.14)
--pbi-border: rgba(242,200,17,0.40)
--pbi-glow:   rgba(242,200,17,0.20)
--blue:       #0078D4      /* azul Microsoft */
--font-h:     'Montserrat' /* títulos */
--font-b:     'Inter'      /* corpo */
```

### Tipografia
- **Títulos (h1, h2, h3, chips, labels):** Montserrat — pesos 400, 600, 700, 800, 900
- **Corpo (parágrafos, descrições):** Inter — pesos 300, 400, 500, 600
- **h1:** `clamp(2.8rem, 5.5vw, 5.6rem)`, weight 900, letter-spacing -2px
- **h2:** `clamp(1.75rem, 2.8vw, 2.6rem)`, weight 800, letter-spacing -1.2px

### Espaçamento
- **Seções:** `padding: 80px 0` (`.sec`)
- **Seções alternadas:** `background: var(--bg-2)` com `border-top: 1px solid var(--border)` (`.sec-alt`)
- **Container:** `max-width: 1280px; padding: 0 40px` (`.wrap`)
- **Cards:** `border-radius: 14px; padding: 22px`
- **Nav height:** 64px

### Componentes visuais
- **Chip (badge):** fundo `--pbi-dim`, borda `--pbi-border`, texto `#7a5c00`, dot pulsante amarelo
- **Botão primário (.btn-pbi):** fundo `#F2C811`, texto preto, hover eleva + glow
- **Botão ghost (.btn-ghost):** transparente com borda, hover escurece levemente
- **Cards:** fundo branco, borda suave, hover eleva 3px + borda amarela
- **Logos de clientes:** fundo `#ffffff` uniforme, altura `76px`, hover com borda dourada
- **Domino stack:** 3 dashboards dark (`#0e0e1c`) empilhados com rotações e animação float
- **Cards de portfolio:** header dark com KPIs flutuantes, tag colorida por categoria

---

## 6. Conteúdo Atual

### Stats do Hero
- `8+` Empresas atendidas
- `5+` Anos com Power BI
- `100%` Projetos entregues
- `3` Estados atendidos

### Clientes (8 empresas)
1. SENAI/PA → fiepa.org.br
2. PonceTech → poncetech.com.br
3. Grupo Lider → grupolideronline.com.br
4. Cinbesa → digital.belem.pa.gov.br
5. Save Co → savecompany.com.br
6. SENAI/SC → fiesc.com.br
7. Faculdade Pitágoras → kroton.com.br
8. Lanlink Informática → lanlink.com.br

### Serviços (4 cards)
1. **BI Completo com Power BI** (card dark principal) — 6 etapas do diagnóstico à produção
2. **BI para Finanças & Controladoria** — DRE, Fluxo de Caixa, Budget vs Real
3. **Indicadores Estratégicos & KPIs** — DAX avançado, metas, scorecards
4. **IA & Dados Avançados** — Machine Learning, Forecasting, Python + Power BI

### Portfolio (3 projetos placeholder — substituir pelos projetos reais)
1. **Dashboard Acadêmico — SENAI** | Power BI · Educação | 12+ relatórios, 4 fontes, 40+ usuários
2. **BI Comercial — Grupo Lider** | Power BI · Comercial | 35+ KPIs, 6 regionais, update diário
3. **Forecasting de Demanda — PonceTech** | Governança de Dados · IA | 94% acurácia, 90d horizonte

### Skills Tags (seção Sobre)
Power BI · Governança de Dados · Inteligência Artificial · DAX Avançado · Python · Power Query · Power BI Service

---

## 7. Contatos do Proprietário

| Canal | Dado |
|---|---|
| WhatsApp | (47) 98869-5648 → `https://wa.me/5547988695648` |
| E-mail | s2b.claudioneves@gmail.com |
| LinkedIn | linkedin.com/in/claudio-f-neves |
| GitHub | github.com/cfneves |
| CNPJ | 44.283.517/0001-00 |

---

## 8. Preferências do Proprietário

- **Design compacto:** menos seções, menos scroll, visual limpo e profissional
- **Logos de clientes:** SEMPRE fundo branco `#ffffff` uniforme para todas as logos
- **Âncoras:** TODOS os links de navegação devem ter seção com ID correspondente
- **Finanças:** nunca posicionar como especialista em finanças — apenas prestador de BI para a área
- **Terminologia atual aprovada:** "Power BI · Governança de Dados · Inteligência Artificial"
- **Idioma:** todo o conteúdo em português brasileiro
- **Seções removidas (não recriar sem pedido):** "Ecossistema" e "O Problema"
- **Deploy:** após cada alteração, rodar `npm run deploy` no diretório do projeto

---

## 9. Responsividade

| Breakpoint | Comportamento |
|---|---|
| `≤ 1100px` | Hero e serviços viram 1 coluna; domino escondido |
| `≤ 768px` | Portfolio, contato e sobre viram 1 coluna |
| `≤ 600px` | Nav links ocultos; hero CTA em coluna; padding reduzido |

---

## 10. Animações

- **`dp-float`:** dashboard frontal flutua suavemente (translateY 0 → -10px), 6s loop
- **`pulse`:** ponto verde do "live" pisca (opacity 1 → 0.3), 2s loop
- **Reveal on scroll:** `IntersectionObserver` em todos `.card` e `[data-reveal]` — fade in + translateY ao entrar na viewport

---

## 11. Histórico de Decisões Importantes

| Data | Decisão |
|---|---|
| 2026-04-08 | Reestruturação completa para modelo portifólio — criação das seções Portfolio, Sobre e Contato |
| 2026-04-08 | Logos padronizadas com fundo branco uniforme |
| 2026-04-08 | Contatos adicionados ao header (ícones coloridos) |
| 2026-04-08 | Seções Ecossistema e Problema removidas para compactar |
| 2026-04-08 | "Ciência de Dados" substituído por "Governança de Dados" em toda a página |
| 2026-04-08 | Posicionamento de Finanças alterado: especialidade → serviço prestado para a área |
