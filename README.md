# Movimentos de Massa — Veranópolis/RS

Dashboard interativo para análise exploratória dos dados de movimentos de massa no município de **Veranópolis/RS**. Permite identificar quais combinações de variáveis ambientais são mais frequentes nas ocorrências registradas.

---

## Capturas de tela

> Interface disponível em **Português (PT-BR)** e **Inglês (EN)**, com tema **claro** e **escuro** (padrão: sistema).

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework UI | React 18 + TypeScript |
| Build | Vite 5 |
| Estilização | Tailwind CSS v4 |
| Gráficos | Recharts |
| Internacionalização | i18next / react-i18next |
| Parse de CSV | PapaParse |

---

## Funcionalidades

- **Combinações mais frequentes** — tabela ranqueada com as 15 principais combinações de variáveis (unidade geológica, solo, material de origem, declive, drenagem, textura, cobertura)
- **Unidade / Fácie Geológica** — frequência e distribuição de área por fácie
- **Tipos de Solo (EMBRAPA)** — frequência e % de área
- **Cobertura do Solo** — legenda de uso do solo e classes IBGE
- **Terreno** — declive e drenagem
- **Geologia** — material de origem e textura
- **Drenagem e Profundidade** — profundidade do solo e classificação IBGE nível 2
- **Cards de métricas** — total de ocorrências, área total (ha), combinações únicas, solo dominante, cobertura dominante
- **Tema claro/escuro** — segue o sistema por padrão; preferência salva no `localStorage`
- **Idioma** — PT-BR padrão; EN disponível; preferência salva no `localStorage`

---

## Estrutura do projeto

```
mass-movement/
├── data/
│   └── data.csv                  Dados originais
├── public/
│   └── data/data.csv             Servido estaticamente pelo Vite
├── src/
│   ├── components/
│   │   ├── Charts.tsx            BarChart horizontal + DonutChart (Recharts)
│   │   ├── CombinationsTable.tsx Tabela ranqueada de combinações
│   │   ├── Header.tsx            Cabeçalho sticky com seletor de idioma e tema
│   │   ├── Sections.tsx          Seções de análise por variável
│   │   └── StatsCards.tsx        Cards de métricas resumidas
│   ├── hooks/
│   │   └── useLocalStorage.ts    Hook genérico de persistência
│   ├── i18n/
│   │   ├── index.ts              Configuração do i18next
│   │   └── locales/
│   │       ├── pt-BR.json        Traduções em português
│   │       └── en.json           Traduções em inglês
│   ├── types/
│   │   └── data.ts               Interfaces TypeScript
│   ├── utils/
│   │   ├── dataLoader.ts         Parse do CSV e agregações
│   │   └── normalize.ts          Correção de caracteres quebrados (ISO-8859-1)
│   ├── App.tsx                   Orquestração principal
│   ├── index.css                 Tailwind + estilos globais mínimos
│   └── main.tsx                  Entry point React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Como executar

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mass-movement

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

### Build para produção

```bash
npm run build
npm run preview
```

---

## Dados

O arquivo `data/data.csv` contém registros geoespaciais de movimentos de massa com as seguintes variáveis:

| Coluna | Descrição |
|---|---|
| `area (m2)` | Área do polígono em metros quadrados |
| `UNIDADE` | Fácie/unidade geológica (ex.: Facies Gramado) |
| `SOLO_EMBRA` | Classificação do solo (EMBRAPA) |
| `MAT_ORIGEM` | Material de origem (xisto, basalto…) |
| `DECLIVE` | Classe de declividade (%) |
| `DRENAGEM` | Tipo de drenagem (bem, moderada…) |
| `TEXTURA` | Textura do solo (média, argila…) |
| `PROFUND_SO` | Profundidade do solo (cm) |
| `LEGENDA` | Uso e cobertura do solo |
| `IBGE_N1` | Classificação IBGE nível 1 |
| `IBGE_N2` | Classificação IBGE nível 2 |

> Os caracteres corrompidos no CSV original (codificação ISO-8859-1) são normalizados automaticamente em `src/utils/normalize.ts`.

---

## Licença

Uso acadêmico e de pesquisa.
