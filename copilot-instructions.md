# Copilot Instructions - Isabela Camara Website

## Regra de ouro
- Sempre consultar este arquivo antes de decidir algo.
- Atualizar este arquivo conforme o site evolui.

## Repositorio
- https://github.com/belacstar/isabela-camara-website.git

## Objetivo do site
- Website/portfolio para www.isabelacamara.com.
- Mostrar trabalhos como desenvolvedora e sites ja entregues.
- Incluir mini bio, capacitacoes, cursos, habilidades e certificacoes.
- Contato visivel e facil.
- Rodape com contador de visitantes.
- Header com troca de tema (claro/escuro) e troca de idioma (PT/EN).
- Animacoes variadas e uma interacao com o usuario (a definir).
- Sem secao de blog.

## Direcao visual
- Minimalista, moderno e elegante.
- Usar gradientes com tons de roxo, rosa, azul e verde (paleta final a definir).
- Tipografia expressiva; evitar fontes padrao sem personalidade.
- Layout focado em experiencia do usuario, 100% responsivo.
- Garantir excelente experiencia mobile (mobile-first).

## Arquitetura de conteudo (MVP)
- Hero com headline forte, resumo e CTAs.
- Trabalhos/Projetos (cards + case studies quando possivel).
- Sobre/mini bio.
- Habilidades e stack.
- Cursos e certificacoes.
- Contato (formulario + links sociais).
- Rodape (contador de visitantes + links essenciais).

## Funcionalidades obrigatorias
- Toggle de tema claro/escuro com persistencia (localStorage).
- Toggle de idioma PT/EN no header.
- Contador de visitantes no rodape (dados agregados, sem PII).
- Animacoes: entrada de pagina, reveal em scroll, e interacoes sutis.
- Interacao com usuario: ainda nao definida (registrar ideias aqui).

## Interacao com usuario (ideias para decidir)
- Linha do tempo interativa dos projetos.
- Micro-interacao no hover do card de projeto.
- Easter egg discreto (tecla ou gesto).
- Seletor de temas com preview rapido.

## Tecnologia
- Front-end: React + Vite.
- Animacoes: JavaScript (avaliar libs como GSAP ou Framer Motion).
- Hosting/Deploy: Firebase Hosting (projeto `isabela-camara-website`).
- Banco de dados: Firestore (Firebase).
- Backend/Servicos: Firebase (Firestore + hosting; outros servicos apenas se necessario).

## Dados e integracoes
- Firebase centraliza dados e hosting.
- Firestore guarda portfolio, skills, cursos, certificacoes e contador de visitantes.
- Colecao `site_metrics`, documento `visitor_total`, campo `value`.
- Todas as chaves devem ficar em variaveis de ambiente com prefixo VITE_.
- Evitar dados sensiveis no front-end.
- Variaveis base em `.env.example` (copiar para `.env.local`).
- Config do Firebase Hosting em `firebase.json` e `.firebaserc`.

## SEO e qualidade
- SEO basico: title, meta description, OG tags, sitemap.
- Acessibilidade: contraste, navegacao por teclado, ARIA quando necessario.
- Performance: imagens otimizadas, lazy-load e bundles enxutos.

## Ambientes
### Dev (local)
- Node 18+.
- Instalar dependencias: `npm install`.
- Rodar dev server: `npm run dev`.
- Usar `.env.local` com variaveis VITE_ e projeto de teste no Firebase.

### Build/Deploy (prod)
- Build: `npm run build`.
- Validar build localmente: `npm run preview`.
- Usar variaveis de ambiente de producao.
- Firebase Hosting (projeto `isabela-camara-website`):
  - Instalar CLI: `npm install -g firebase-tools`.
  - Login: `firebase login`.
  - Init: `firebase init hosting` (public dir `dist`, SPA `yes`).
  - Selecionar projeto: `firebase use isabela-camara-website`.
  - Deploy: `firebase deploy --only hosting`.
- Confirmar URLs publicas e analytics no ambiente de producao.

## Sites de inspiracao (observacoes rapidas)
- https://www.itsoffbrand.com/ : estudio criativo, foco em branding, web de alta performance, menciona 3D/WebGL.
- https://oakharborwebdesigns.com/ : foco em servicos e proposta de valor clara, destaca cases.
- https://m7mad.dev/ : portfolio pessoal, foco em projetos e interacoes.
- https://www.radnaabazar.com/en : portfolio multi-idioma, narrativa pessoal rica, projetos e contato.
- https://rondeobalos.com/ : portfolio clean com intro direta e projetos.
- https://portfolio-inky-beta-47.vercel.app/ : portfolio simples, foco em trabalhos.
- https://www.rathinsharma.com/ : portfolio com seccoes interativas e servicos.
- https://www.sunnypatel.net/ : portfolio full-stack com enfase em stack/skills.
- Nota: observacoes baseadas em HTML/meta; revisar visualmente no browser quando possivel.

## Estado atual (base implementada)
- Scaffold React + Vite com layout inicial e seccoes principais.
- Toggle de tema/idioma com persistencia em localStorage.
- Animacoes de reveal via IntersectionObserver (`src/hooks/useReveal.js`).
- Contador de visitantes preparado via Firestore.
- Fundo com bolhas interativas reagindo a hover e scroll.
