# Cláudio Ferreira Neves — Portfólio Profissional

> **Site ao vivo:** [claudioneves.com.br](https://claudioneves.com.br)  
> Deploy preview: [aed4ade1.my-astro-app-9wi.pages.dev](https://aed4ade1.my-astro-app-9wi.pages.dev)

Portfólio B2B desenvolvido do zero com foco em **desempenho**, **design profissional** e **zero custo de hospedagem** — SSG estático deployado diretamente no edge global da Cloudflare.

---

## Demonstração ao vivo

| Seção | Descrição |
|---|---|
| **Hero** | Stats animados via counter + domino stack de dashboards dark |
| **Clientes** | 8 empresas atendidas com logos padronizadas em cards brancos |
| **Como trabalhamos** | Processo consultivo em 5 etapas com ícones SVG customizados |
| **Serviços** | 4 especialidades: BI completo, Finanças, KPIs estratégicos e IA |
| **Portfólio** | 3 projetos reais com dashboards SVG mockup interativos |
| **Sobre** | Bio profissional + skills tags + links sociais |
| **Contato** | WhatsApp, Email, LinkedIn, GitHub |

---

## Stack Técnico

```
Astro 6.1.4           → Framework SSG/SSR com islands architecture
@astrojs/cloudflare   → Adapter para Cloudflare Pages (edge computing)
Wrangler 4.x          → CLI de build e deploy
Node.js ≥22.12.0      → Runtime mínimo requerido
Vanilla CSS           → Design system com CSS custom properties (tokens)
Vanilla JS            → IntersectionObserver, counter animado, animações
SVG inline            → Ícones e dashboard mockups sem dependências externas
```

**Hospedagem:** Cloudflare Pages — CDN global, HTTPS automático, **custo zero**  
**Build output:** HTML/CSS/JS puro — sem servidor necessário em produção  
**Deploy:** `npm run deploy` — pipeline completo em 1 comando

---

## Por que Astro?

Astro usa **islands architecture**: todo conteúdo estático é pré-renderizado como HTML puro. Zero JavaScript no bundle por padrão — JS é injetado apenas onde realmente necessário.

Neste projeto, toda a interatividade se resume a:
- `IntersectionObserver` para animações de entrada no scroll
- Counter animado nos stats do hero com easing cúbico

Resultado: **nenhuma framework JS carregada**, carregamento instantâneo.

---

## Decisões de Arquitetura

### Single-file por design

Todo o site vive em `src/pages/index.astro`. Escolha deliberada para um SPA com âncoras:
- CSS scoped no mesmo arquivo — zero FOUC (flash de estilo)
- Nenhuma complexidade de bundler para portfólio de página única
- Todo o HTML, CSS e JS em um lugar — fácil de manter e auditar

### Design System com CSS Custom Properties

Em vez de Tailwind ou CSS-in-JS, o projeto usa tokens CSS nativos — mais performático e sem overhead de build:

```css
--bg: #040D1B         /* Dark navy profundo — fundo principal */
--bg-2: #091422       /* Fundo de seções alternadas */
--pbi: #F2C811        /* Amarelo Power BI — identidade de marca */
--teal: #2DD4BF       /* Acento teal para dados/visualizações */
--font-h: 'Space Grotesk'      /* Títulos — sem serifa com caráter */
--font-b: 'Plus Jakarta Sans'  /* Corpo — legibilidade otimizada */
```

### Dashboards SVG inline

Os mockups de dashboard no portfólio são SVGs codificados diretamente no HTML — sem imagens externas, carregamento instantâneo, escalável em qualquer resolução e densidade de pixel.

Cada dashboard simula uma visualização Power BI real:
- **SENAI** (amarelo): gráfico de barras de cursos + KPI tiles
- **Grupo Lider** (teal): gráfico de linha com área preenchida + linha de meta
- **PonceTech** (roxo): série temporal com banda de previsão + marcadores de anomalia

### Pipeline de Deploy com patch automático

```
npm run deploy
  └─→ astro build
        └─→ node scripts/patch-wrangler.js   ← corrige incompatibilidade Wrangler 4.81+
              └─→ wrangler pages deploy ./dist/client
```

O `@astrojs/cloudflare` gera campos no `wrangler.json` (`pages_build_output_dir`, binding `ASSETS`) que conflitam com o Wrangler ≥4.81. O script `patch-wrangler.js` remove esses campos automaticamente após cada build — solução que mantém o Wrangler sempre na versão mais recente sem quebrar o deploy.

---

## Estrutura do Projeto

```
my-astro-app/
├── src/
│   └── pages/
│       └── index.astro          ← Toda a página (~700 linhas: HTML + CSS + JS)
├── public/
│   ├── claudio.jpg              ← Foto de perfil
│   ├── logo-cn.png              ← Logo da marca CN
│   └── logos/                   ← 8 logos de empresas clientes
│       ├── senai-pa.png
│       ├── ponce-tech.webp
│       ├── grupo-lider.webp
│       ├── cinbesa.jpg
│       ├── save-co.png
│       ├── senai-sc.jpg
│       ├── faculdade-pitagoras.jpg
│       └── lanlink.jpg
├── scripts/
│   └── patch-wrangler.js        ← Fix de compatibilidade Wrangler 4.81+
├── astro.config.mjs             ← Astro + Cloudflare adapter config
├── wrangler.jsonc               ← Cloudflare Pages config
└── package.json
```

---

## Setup Local

Pré-requisito: **Node.js ≥ 22.12.0**

```bash
git clone https://github.com/cfneves/meu-site.git
cd meu-site/my-astro-app

npm install
npm run dev        # servidor em http://localhost:4321
```

### Comandos disponíveis

| Comando | Ação |
|---|---|
| `npm run dev` | Servidor local com hot-reload |
| `npm run build` | Build de produção para `./dist/` |
| `npm run preview` | Preview local do build de produção |
| `npm run deploy` | Build + patch + deploy para Cloudflare Pages |

---

## Sobre o Profissional

**Cláudio Ferreira Neves** — Especialista em Power BI, Governança de Dados e IA Aplicada.

Presto serviços de Business Intelligence para empresas de médio e grande porte nos segmentos industrial, comercial e educacional, com foco em transformar dados em decisões.

**Especialidades:**

- **BI Completo com Power BI** — diagnóstico, modelagem, DAX, deploy em produção
- **BI para Finanças & Controladoria** — DRE, Fluxo de Caixa, Budget vs Real
- **Indicadores Estratégicos & KPIs** — DAX avançado, scorecards, metas, alertas
- **IA & Dados Avançados** — Forecasting, Machine Learning, Python + Power BI

**Números:**
- 8+ empresas atendidas (SENAI, PonceTech, Grupo Lider, Cinbesa, e outros)
- 5+ anos de experiência com Power BI
- 100% de projetos entregues
- 3 estados atendidos

**Contato:**  
Email: [s2b.claudioneves@gmail.com](mailto:s2b.claudioneves@gmail.com)  
LinkedIn: [linkedin.com/in/claudio-f-neves](https://linkedin.com/in/claudio-f-neves)  
WhatsApp: [(47) 98869-5648](https://wa.me/5547988695648)  
GitHub: [github.com/cfneves](https://github.com/cfneves)

CNPJ: 44.283.517/0001-00

---

*Desenvolvido com Astro 6 + Cloudflare Pages | Design system próprio com CSS Custom Properties | Pipeline de deploy automatizado*
