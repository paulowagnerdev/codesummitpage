# Code Summit: especificação do site

Documento de referência do site institucional da Code Summit: identidade visual, sistema de design, estrutura, comportamento e manutenção.

> Última atualização: novembro de 2026

---

## 1. Visão geral

| Item | Valor |
| --- | --- |
| Empresa | Code Summit |
| Tipo | Site institucional *one-page* (página única com âncoras) |
| Idioma | Português (pt-BR) |
| Objetivo principal | Gerar contatos pelo WhatsApp |
| Localização | Jaraguá do Sul, SC |
| Slogan | "Código é o que fazemos. Pessoas é o que somos." |
| Headline | "Transformamos ideias em sistemas que impulsionam negócios." |

### Conceito criativo: "a subida"

O site trata cada projeto como uma escalada até o cume. Esse tema aparece em todos os elementos:

- **Mapa topográfico vivo**: as curvas de nível animadas formam a assinatura visual (banner e seção Sobre).
- **Granito e névoa**: as seções alternam entre escuro (rocha) e claro (névoa de altitude).
- **Laranja sinalização**: a cor da bandeira no cume, reservada para ações e para o "ponto de chegada".
- **Processo como trilha**: as etapas de trabalho são desenhadas como uma subida até o topo.

---

## 2. Stack técnica

| Camada | Tecnologia |
| --- | --- |
| Framework | React 19 |
| Build / dev server | Vite 8 (`@vitejs/plugin-react`) |
| Estilos | CSS Modules (`*.module.css`) + `src/styles/global.css` com os tokens |
| Fonte | `@fontsource-variable/archivo` (eixo de largura `wdth`), servida localmente |
| Animações | CSS + `requestAnimationFrame` + `IntersectionObserver`, sem biblioteca externa |
| Dependências de runtime | Apenas `react`, `react-dom` e a fonte |

### Comandos

```bash
npm install       # instala dependências
npm run dev       # servidor local de desenvolvimento
npm run build     # gera a versão de produção em /dist
npm run preview   # serve o /dist localmente para conferência
```

`vite.config.js` usa `base: "./"`, então o `/dist` funciona em qualquer subpasta ou hospedagem estática (Netlify, Vercel, GitHub Pages, cPanel etc.).

### Estrutura de pastas

```
site-react/
├── index.html               # metatags, SEO, Open Graph, JSON-LD
├── public/                  # arquivos servidos como estão (favicon, og-image)
└── src/
    ├── main.jsx             # ponto de entrada; importa fonte e global.css
    ├── App.jsx              # ordem das seções
    ├── data/company.js      # TODO o conteúdo editável (fonte única de verdade)
    ├── styles/global.css    # tokens de design, reset, utilitários
    ├── hooks/               # comportamentos reutilizáveis
    └── components/          # um componente + um .module.css por bloco
```

---

## 3. Marca

### Logo

O logo é um componente SVG (`src/components/Logo.jsx`), sem arquivo de imagem. Ele tem duas partes:

1. **Símbolo (o cume)**: um traço contínuo que desenha uma cordilheira, com um ponto laranja no pico mais alto.
2. **Logotipo**: o nome "Code Summit" em Archivo, peso 700, largura 125%.

```svg
<svg viewBox="0 0 120 50">
  <path d="M3 46 C13 36 22 30 31 26 C40 22 46 10 53 4 C60 10 70 24 77 28
           C80 24 82 20 85 20 C91 24 105 41 117 47"
        fill="none" stroke="currentColor" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="53" cy="4" r="3.4" fill="#ff4f17"/>
</svg>
```

| Especificação | Valor |
| --- | --- |
| Largura do símbolo | 2.6rem (≈ 42px) |
| Espaço entre símbolo e nome | .625rem (10px) |
| Cor do traço | Herda a cor do texto (`currentColor`): claro sobre fundo escuro, escuro sobre fundo claro |
| Ponto do cume | Sempre `--signal` (#ff4f17) |
| Nome | Archivo 700, `font-stretch: 125%`, 1rem, `letter-spacing: -.01em` |

**Regras de uso**

- Use o logo em `--mist` sobre fundos escuros e em `--granite` sobre fundos claros.
- O ponto do cume é sempre laranja, nunca de outra cor.
- Não aplique sombra, contorno nem gradiente, e não distorça as proporções.
- Respiro mínimo ao redor: a altura do símbolo.

### Favicon e imagem de compartilhamento

- `public/favicon.svg`: ícone da aba.
- `public/og-image.png`: imagem que aparece ao compartilhar o link (WhatsApp, LinkedIn etc.). Tamanho recomendado: 1200 × 630px.

---

## 4. Cores

Todas as cores ficam como variáveis CSS em `src/styles/global.css`. **Use sempre o token, nunca o hex direto.**

### Paleta principal

| Token | Hex | Nome | Uso |
| --- | --- | --- | --- |
| `--granite` | `#0f1b24` | Granito | Fundo das seções escuras, cor do texto principal sobre claro, `theme-color` |
| `--granite-2` | `#172632` | Granito 2 | Superfícies elevadas no escuro |
| `--granite-3` | `#20323f` | Granito 3 | Superfícies mais claras no escuro, gradientes |
| `--mist` | `#eef2f3` | Névoa | Fundo das seções claras, texto sobre escuro |
| `--mist-2` | `#e2e8ea` | Névoa 2 | Superfícies alternativas no claro |
| `--slate` | `#5b6b76` | Ardósia | Texto secundário sobre fundo claro |
| `--slate-light` | `#8fa0aa` | Ardósia clara | Texto secundário sobre fundo escuro |
| `--glacier` | `#9fd3e6` | Geleira | Curvas de nível, detalhes e destaques frios |
| `--signal` | `#ff4f17` | Sinal | **Cor de ação**: botões primários, cume, foco, seleção de texto |
| `--signal-hover` | `#ff6a38` | Sinal hover | Hover dos botões primários |

### Linhas e divisórias

| Token | Valor | Uso |
| --- | --- | --- |
| `--line` | `rgba(15, 27, 36, .12)` | Divisórias sobre fundo claro |
| `--line-dark` | `rgba(238, 242, 243, .12)` | Divisórias sobre fundo escuro |

### Proporção de uso

Aproximadamente **60% névoa / 30% granito / 10% acentos**. O laranja `--signal` é escasso de propósito: aparece só onde há ação ou "chegada". Se tudo for laranja, nada se destaca.

### Contraste (WCAG)

| Combinação | Razão | Resultado |
| --- | --- | --- |
| `--granite` sobre `--mist` | 15.5 : 1 | AAA |
| `--slate` sobre `--mist` | 4.9 : 1 | AA |
| `--slate-light` sobre `--granite` | 6.5 : 1 | AA |
| `--glacier` sobre `--granite` | 10.8 : 1 | AAA |
| `--signal` sobre `--granite` | 5.3 : 1 | AA |
| `--granite` sobre `--signal` (texto do botão) | 5.3 : 1 | AA |
| `--signal` sobre `--mist` | 2.9 : 1 | **Reprovado para texto.** Use só em elementos gráficos ou texto grande |

> Por isso os botões laranja usam texto **granito** (escuro), e não branco.

### Temas das seções

Cada `<section>` declara `data-theme="dark"` ou `data-theme="light"`. O cabeçalho lê esse atributo e troca de cor automaticamente ao rolar a página. Toda seção nova precisa ter esse atributo.

---

## 5. Tipografia

### Família

**Archivo Variable**, uma única família para todo o site, usando o **eixo de largura** (`font-stretch`) para criar contraste entre títulos e texto.

```css
--font: "Archivo Variable", "Archivo", system-ui, -apple-system, "Segoe UI", sans-serif;
```

A fonte vem do pacote `@fontsource-variable/archivo/wdth.css` (sem chamada ao Google Fonts).

### Larguras e pesos

| Uso | `font-stretch` | Peso |
| --- | --- | --- |
| Texto corrido | 100% (`--normal`) | 400 |
| Títulos h1–h3 | 118% (`--wide`) | 600 |
| Headline do banner | 112% | 600 |
| Logotipo | 125% | 700 |
| Botões | 108% | 600 |
| Rótulos e destaques | 112% | 500–600 |

### Escala de tamanhos

Os tamanhos grandes são **fluidos** (`clamp`): crescem de acordo com a largura da tela, sem saltos entre breakpoints.

| Token | Valor | Aproximado (mín → máx) | Uso |
| --- | --- | --- | --- |
| `--fs-xs` | `.8125rem` | 13px | Legendas, rótulos, rodapé |
| `--fs-sm` | `.9375rem` | 15px | Botões, menus, textos auxiliares |
| `--fs-base` | `1.0625rem` | 17px | Texto corrido |
| `--fs-lg` | `1.25rem` | 20px | Texto de destaque |
| `--fs-xl` | `clamp(1.5rem, 1.2rem + 1vw, 2rem)` | 24 → 32px | Subtítulos |
| `--fs-2xl` | `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)` | 32 → 56px | Títulos de seção, manifesto |
| `--fs-3xl` | `clamp(2.5rem, 1.5rem + 4vw, 5.5rem)` | 40 → 88px | Títulos de impacto (Soluções, Contato) |
| `--fs-hero` | `clamp(2.4rem, 1rem + 4.4vw, 5.5rem)` | 38 → 88px | Headline do banner |

### Regras de composição

- **Entrelinha**: texto corrido `1.6`; títulos `1.04`; headline `.98`.
- **Espaçamento entre letras**: títulos `-.025em`; headline `-.04em`.
- `text-wrap: balance` nos títulos e `text-wrap: pretty` nos parágrafos, para evitar palavras órfãs.
- Largura de leitura limitada (`max-width` entre `30ch` e `46ch`) nos parágrafos.
- Trechos de código (seção Sobre) usam fonte monoespaçada do sistema: `ui-monospace, "SF Mono", "Cascadia Code", Consolas`.

---

## 6. Layout e espaçamento

| Token | Valor | Descrição |
| --- | --- | --- |
| `--container` | `82rem` (1312px) | Largura máxima do conteúdo |
| `--gutter` | `clamp(1.25rem, .5rem + 3vw, 3rem)` | Margem lateral (20 → 48px) |
| `--section-y` | `clamp(6rem, 4rem + 8vw, 11rem)` | Espaço vertical entre seções (96 → 176px) |
| `--header-h` | `4.5rem` (72px) | Altura do cabeçalho fixo |
| `--radius` | `1.25rem` (20px) | Raio padrão de cartões e painéis |

- Botões e selos: raio total (`99rem`, formato pílula).
- Grades em duas colunas usam proporções **7/5** ou **5/7** (assimétricas de propósito).
- A classe utilitária `.container` centraliza o conteúdo e aplica o gutter.

### Breakpoints

| Largura | O que muda |
| --- | --- |
| `≤ 900px` | Principal ponto de quebra: grades viram 1 coluna, aparece o menu mobile, o processo deixa de ser fixo na rolagem, o botão circular do contato vira botão comum |
| `≤ 700px` | Headline do banner quebra em 5 linhas; o rótulo "Cume" do mapa some |
| `≤ 640px` | Painel da seção Sobre se reorganiza (régua de altitude oculta) |
| `≤ 560px` | Rodapé em 2 colunas |
| `≤ 520px` | Botões ocupam 100% da largura |

---

## 7. Movimento e animação

### Curvas

| Token | Valor | Sensação |
| --- | --- | --- |
| `--ease` | `cubic-bezier(.22, 1, .36, 1)` | Expo-out: começa rápido e pousa suave, sem "quique". Padrão do site |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)` | Para revelações por máscara |

### Durações de referência

- Microinterações (hover, cores): **.3s – .5s**
- Entrada de elementos (`Reveal`): **1s**, com atrasos escalonados de 60–100ms
- Revelações grandes (máscaras, painéis): **1.2s – 1.4s**

### Padrões usados

| Padrão | Onde | Como |
| --- | --- | --- |
| Linha a linha por máscara | Headline do banner | Cada linha sobe de dentro de um `overflow: hidden` |
| Mapa topográfico vivo | Banner e Sobre | `TopoCanvas`: curvas de nível que "respiram" e reagem ao ponteiro |
| Revelação ao entrar na tela | Títulos, textos, listas | Componente `<Reveal>` + `useInView` |
| Texto que acende | Manifesto | Opacidade por palavra conforme a rolagem (`useScrollProgress`) |
| Trilha da subida | Processo | Seção fixa; um ponto percorre o caminho até o cume com a rolagem |
| Rótulo que desliza | Botões | O texto sobe e é substituído por uma cópia no hover |
| Botão magnético | Contato | O botão circular "segue" o cursor (`useMagnetic`) |
| Cabeçalho inteligente | Header | Some ao rolar para baixo, volta ao rolar para cima, troca de tema por seção |

### Acessibilidade de movimento

Com **"reduzir movimento"** ativado no sistema (`prefers-reduced-motion: reduce`), as animações ficam praticamente instantâneas, o mapa fica estático e todo o conteúdo aparece direto. Toda animação nova precisa respeitar isso.

O canvas pausa automaticamente quando sai da tela ou quando a aba fica em segundo plano, para economizar bateria.

---

## 8. Componentes

### Botão (`Button.jsx`)

| Variante | Visual | Uso |
| --- | --- | --- |
| `primary` | Fundo `--signal`, texto `--granite` | Ação principal: falar no WhatsApp |
| `ghost` | Transparente, borda `--line`, texto `--granite` | Ação secundária sobre fundo claro |
| `ghost-dark` | Transparente, borda `--line-dark`, texto `--mist` | Ação secundária sobre fundo escuro |

Altura 52px (`3.25rem`), padding horizontal 24px, pílula, peso 600. Aceita ícone (`icon={<ChatIcon />}`). Links que começam com `http` abrem em nova aba automaticamente.

### Outros componentes

| Componente | Função |
| --- | --- |
| `Logo` | Marca em SVG |
| `Reveal` | Envolve qualquer elemento para surgir ao entrar na tela (`as`, `delay`) |
| `TopoCanvas` | Mapa topográfico animado. Props: `summit` (posição do cume), `seed` (formato do relevo), `flag` (rótulo; vazio esconde), `reduced` |
| `ServiceVisual` | Ilustrações em traço animadas para cada serviço (`web`, `mobile`, `corporate`, `api`, `support`) |

### Hooks

| Hook | Função |
| --- | --- |
| `useInView` | Detecta quando um elemento entra na tela |
| `useScrollProgress` | Progresso de rolagem 0 → 1; escreve `--progress` no elemento |
| `useMagnetic` | Efeito de atração ao ponteiro (só mouse, nunca toque) |
| `useMediaQuery` | Lê media queries no React |
| `useReducedMotion` | Indica se o visitante pediu menos movimento |

---

## 9. Estrutura da página

Ordem definida em `src/App.jsx`:

| # | Seção | Âncora | Tema | Conteúdo |
| --- | --- | --- | --- | --- |
| 0 | Header | (fixo) | Automático | Logo, menu (Soluções, Processo, Sobre, Contato), botão "Fale conosco" |
| 1 | Hero | `#inicio` | Escuro | Headline no topo, mapa topográfico, texto de apoio e botões na base |
| 2 | Manifesto | (sem âncora) | Claro | Texto "sobre" que acende palavra por palavra |
| 3 | Soluções | `#solucoes` | Claro | Acordeão com 5 serviços + ilustração do serviço ativo |
| 4 | Processo | `#processo` | Escuro | 4 etapas como subida até o cume |
| 5 | Sobre | `#sobre` | Claro | Painel visual (mapa + código + "Pessoas") e valores |
| 6 | Contato | `#contato` | Escuro | Chamada, botão WhatsApp, localização, Instagram |
| 7 | Footer | (sem âncora) | Escuro | Marca, navegação, serviços, contato, direitos |

Cada serviço também tem âncora própria: `#web`, `#mobile`, `#corporativo`, `#integracoes`, `#suporte`.

---

## 10. Conteúdo

**Todo o texto editável fica em `src/data/company.js`.** Para mudar conteúdo, não é preciso mexer nos componentes.

| Chave | Conteúdo |
| --- | --- |
| `WHATSAPP_NUMBER` | Número usado nos links do WhatsApp (não é exibido na página) |
| `whatsappLink(msg)` | Gera o link `wa.me` com mensagem pré-preenchida |
| `company.description` | Descrição curta (rodapé) |
| `company.about` | Texto do Manifesto |
| `company.contact` | Cidade, e-mail (opcional; aparece se preenchido) |
| `company.social` | Redes sociais: `{ label, href, display }` |
| `navItems` | Itens do menu |
| `services` | Os 5 serviços (título, resumo, descrição, ilustração) |
| `process` | As 4 etapas do processo |
| `values` | Valores da seção Sobre (Escalável, Seguro, Inovador) |

### Tom de voz

- Direto, confiante e próximo; fala com "você".
- Frases curtas, sem jargão técnico desnecessário.
- Foco no resultado para o negócio, não na tecnologia em si.
- Metáfora da subida usada com moderação ("cume", "topo", "do primeiro passo").

### Canais de contato

- **WhatsApp**: canal principal; todos os botões de ação levam para ele.
- **Instagram**: exibido no contato e no rodapé. *Link ainda não preenchido.*
- O número de telefone **não é exibido** na página, por decisão de design.

---

## 11. SEO e compartilhamento

Configurado em `index.html`:

- `<html lang="pt-BR">`
- Título: "Code Summit — Desenvolvimento de software sob medida"
- `meta description` com serviços e cidade
- `theme-color: #0f1b24` (cor da barra do navegador no celular)
- Open Graph e Twitter Card (título, descrição, imagem `og-image.png`)
- Dados estruturados JSON-LD (`Organization`) com nome, descrição e endereço
- Conteúdo de fallback em `<noscript>`

---

## 12. Acessibilidade

- Link "Pular para o conteúdo" visível ao navegar com teclado.
- Foco visível em laranja (`outline: 2px solid --signal`) em todos os elementos interativos.
- HTML semântico: `header`, `nav`, `main`, `section` com `aria-labelledby`, `footer`.
- Acordeão de serviços com `aria-expanded` / `aria-controls`.
- Menu mobile fecha com `Esc`, devolve o foco ao botão e trava a rolagem do fundo.
- Elementos decorativos (canvas, ilustrações) marcados com `aria-hidden="true"`.
- Respeito a `prefers-reduced-motion`.
- Contraste dentro do padrão AA (ver seção 4).

---

## 13. Desempenho

- Sem bibliotecas de animação; bundle JS ≈ 80 KB gzip.
- Fonte variável única servida localmente.
- Canvas limitado a ~40 fps, pausado fora da tela e em abas inativas, com resolução máxima de 2× (`devicePixelRatio`).
- Animações usam `transform` e `opacity` (aceleradas por GPU).
- Imagens com `loading="lazy"` e `srcset` quando houver.

---

## 14. Como fazer alterações comuns

| Quero… | Onde |
| --- | --- |
| Mudar um texto, serviço ou etapa | `src/data/company.js` |
| Adicionar o link do Instagram | `company.social` → `href` |
| Adicionar LinkedIn ou e-mail | Descomentar/preencher em `company.social` / `company.contact.email` |
| Mudar uma cor do site inteiro | Token em `src/styles/global.css` |
| Mudar o número do WhatsApp | `WHATSAPP_NUMBER` em `company.js` |
| Reordenar ou remover seções | `src/App.jsx` |
| Mudar SEO / imagem de compartilhamento | `index.html` e `public/og-image.png` |

### Ao criar uma seção nova

1. Crie `NovaSecao.jsx` + `NovaSecao.module.css` em `components/`.
2. Defina `data-theme="light"` ou `"dark"` na `<section>`.
3. Use `className="container"` para o conteúdo e `--section-y` para o espaçamento vertical.
4. Use os tokens de cor, tipografia e easing; não use valores soltos.
5. Envolva títulos e textos em `<Reveal>` para manter o padrão de entrada.
6. Se tiver âncora no menu, adicione em `navItems`.

---

## 15. Pendências

- [ ] Preencher o link do Instagram em `company.social`.
- [ ] (Opcional) Adicionar e-mail de contato e LinkedIn.
- [ ] Atualizar `index.html`: o JSON-LD ainda lista o GitHub (`sameAs`) e o telefone (`telephone`), e o `<noscript>` ainda mostra o número. Remover esses dados para seguir a decisão de não exibir telefone/GitHub e incluir o Instagram em `sameAs` quando houver link.
- [ ] Remover `public/programmer-720.webp` e `public/programmer-1200.webp`, que não são mais usadas desde a troca do visual da seção Sobre.
- [ ] Conferir se `public/og-image.png` reflete a identidade atual.
