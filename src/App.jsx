import { useEffect, useMemo, useRef, useState } from 'react'
import { incrementVisitorCount, isFirebaseConfigured } from './lib/firebase'
import { useReveal } from './hooks/useReveal'
import { useBubbleBackground } from './hooks/useBubbleBackground'

const copy = {
  pt: {
    nav: {
      work: 'Trabalhos',
      about: 'Sobre',
      skills: 'Habilidades',
      courses: 'Cursos',
      blog: 'Blog',
      contact: 'Contato',
    },
    hero: {
      kicker: 'Desenvolvedora web',
      title: 'Isabela Camara',
      subtitle:
        'Crio experiencias digitais com foco em performance, narrativa e UX. Portfolio de projetos, estudos e experimentos.',
      ctaPrimary: 'Ver projetos',
      ctaSecondary: 'Entrar em contato',
      note: 'Disponivel para freela e parcerias em 2025.',
      highlightsTitle: 'Foco atual',
      highlights: [
        'Sites responsivos e acessiveis',
        'Animacoes leves com JavaScript',
        'SEO e performance',
      ],
    },
    sections: {
      work: 'Trabalhos recentes',
      about: 'Sobre mim',
      skills: 'Habilidades',
      courses: 'Cursos e capacitacoes',
      certifications: 'Certificacoes',
      blog: 'Blog',
      contact: 'Contato',
    },
    about: {
      body:
        'Desenvolvedora focada em design funcional, interfaces claras e experiencia do usuario. Gosto de transformar ideias em produtos digitais elegantes e faceis de usar.',
      points: [
        {
          title: 'Experiencia ponta a ponta',
          text: 'Do briefing ao deploy, com atencao para UX, UI e performance.',
        },
        {
          title: 'Colaboracao e transparencia',
          text: 'Processo proximo com clientes, com entregas claras e objetivas.',
        },
        {
          title: 'Detalhes que importam',
          text: 'Tipografia, ritmo visual e micro interacoes elevam o produto.',
        },
      ],
    },
    skills: {
      intro: 'Stack principal para criar experiencias rapidas e modernas.',
      groups: {
        frontend: 'Front-end',
        ux: 'Design e UX',
        backend: 'Back-end',
        workflow: 'Workflow',
      },
    },
    courses: {
      intro: 'Aprendizado continuo com cursos e treinamentos.',
    },
    certifications: {
      intro: 'Certificacoes atuais e metas futuras.',
    },
    blog: {
      intro: 'Noticias, insights e referencias do mundo da tecnologia.',
      cta: 'Ver todos',
    },
    contact: {
      intro: 'Tem um projeto em mente? Vamos conversar e desenhar a melhor solucao.',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar mensagem',
      helper: 'Envio ainda nao integrado. Ajuste quando definir o fluxo.',
      details: 'Onde me encontrar',
    },
    footer: {
      visitors: 'Visitantes',
      visitorHint: 'Conecte o Firebase para ativar o contador.',
      built: 'Feito com React + Vite',
      rights: 'Todos os direitos reservados.',
    },
    toggles: {
      theme: 'Tema',
      light: 'Claro',
      dark: 'Escuro',
      language: 'Idioma',
      pt: 'PT',
      en: 'EN',
      menu: 'Menu',
    },
    projectStatus: {
      live: 'No ar',
      'in-progress': 'Em andamento',
      soon: 'Em breve',
    },
  },
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      skills: 'Skills',
      courses: 'Courses',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      kicker: 'Web developer',
      title: 'Isabela Camara',
      subtitle:
        'I craft digital experiences focused on performance, story, and UX. Portfolio of projects, studies, and experiments.',
      ctaPrimary: 'View projects',
      ctaSecondary: 'Get in touch',
      note: 'Open for freelance and partnerships in 2025.',
      highlightsTitle: 'Current focus',
      highlights: [
        'Responsive and accessible sites',
        'Lightweight JavaScript animations',
        'SEO and performance',
      ],
    },
    sections: {
      work: 'Recent work',
      about: 'About',
      skills: 'Skills',
      courses: 'Courses and training',
      certifications: 'Certifications',
      blog: 'Blog',
      contact: 'Contact',
    },
    about: {
      body:
        'Web developer focused on functional design, clear interfaces, and user experience. I like turning ideas into elegant, easy to use digital products.',
      points: [
        {
          title: 'End to end experience',
          text: 'From briefing to deploy, with attention to UX, UI, and performance.',
        },
        {
          title: 'Collaboration and clarity',
          text: 'Close process with clients, clear milestones, and outcomes.',
        },
        {
          title: 'Details that matter',
          text: 'Typography, rhythm, and micro interactions elevate the product.',
        },
      ],
    },
    skills: {
      intro: 'Main stack to build fast, modern experiences.',
      groups: {
        frontend: 'Front-end',
        ux: 'Design and UX',
        backend: 'Back-end',
        workflow: 'Workflow',
      },
    },
    courses: {
      intro: 'Continuous learning through courses and training.',
    },
    certifications: {
      intro: 'Current certifications and future goals.',
    },
    blog: {
      intro: 'News, insights, and references from the tech world.',
      cta: 'View all',
    },
    contact: {
      intro: 'Have a project in mind? Lets talk and design the best solution.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      helper: 'Sending not integrated yet. Update when flow is defined.',
      details: 'Where to find me',
    },
    footer: {
      visitors: 'Visitors',
      visitorHint: 'Connect Firebase to activate the counter.',
      built: 'Built with React + Vite',
      rights: 'All rights reserved.',
    },
    toggles: {
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      language: 'Language',
      pt: 'PT',
      en: 'EN',
      menu: 'Menu',
    },
    projectStatus: {
      live: 'Live',
      'in-progress': 'In progress',
      soon: 'Coming soon',
    },
  },
}

const projects = [
  {
    title: {
      pt: 'Site institucional para estudio criativo',
      en: 'Institutional site for a creative studio',
    },
    description: {
      pt: 'Narrativa visual forte com foco em servicos e identidade.',
      en: 'Strong visual narrative focused on services and identity.',
    },
    tags: ['React', 'Vite', 'UI/UX'],
    status: 'live',
  },
  {
    title: {
      pt: 'E-commerce minimalista com foco em conversao',
      en: 'Minimal e-commerce focused on conversion',
    },
    description: {
      pt: 'Checkout rapido, vitrine modular e performance otimizada.',
      en: 'Fast checkout, modular showcase, and optimized performance.',
    },
    tags: ['React', 'Firestore', 'SEO'],
    status: 'in-progress',
  },
  {
    title: {
      pt: 'Portfolio interativo com animacoes',
      en: 'Interactive portfolio with animations',
    },
    description: {
      pt: 'Transicoes suaves e micro interacoes em scroll.',
      en: 'Smooth transitions and scroll micro interactions.',
    },
    tags: ['Motion', 'JavaScript', 'Design'],
    status: 'soon',
  },
  {
    title: {
      pt: 'Landing page para SaaS B2B',
      en: 'Landing page for B2B SaaS',
    },
    description: {
      pt: 'Estrutura clara para conversao com provas sociais.',
      en: 'Clear conversion structure with social proof.',
    },
    tags: ['UX', 'Copy', 'Analytics'],
    status: 'live',
  },
]

const blogPosts = [
  {
    title: {
      pt: 'Tendencias de UI para 2025',
      en: 'UI trends for 2025',
    },
    excerpt: {
      pt: 'Gradientes vivos, tipografia expressiva e layouts modulares.',
      en: 'Bold gradients, expressive typography, and modular layouts.',
    },
    date: '2024-10-05',
    tag: 'Design',
  },
  {
    title: {
      pt: 'Animacoes leves com JavaScript',
      en: 'Lightweight animations with JavaScript',
    },
    excerpt: {
      pt: 'Como criar movimento sem pesar no carregamento.',
      en: 'How to create motion without heavy load times.',
    },
    date: '2024-09-18',
    tag: 'Front-end',
  },
  {
    title: {
      pt: 'Checklist de performance para lancamentos',
      en: 'Performance checklist for launches',
    },
    excerpt: {
      pt: 'Pequenos ajustes que deixam o site mais rapido.',
      en: 'Small tweaks that make the site faster.',
    },
    date: '2024-08-30',
    tag: 'Performance',
  },
]

const skillGroups = [
  {
    key: 'frontend',
    items: ['React', 'Vite', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    key: 'ux',
    items: [
      'Design systems',
      'Prototipos',
      'Acessibilidade',
      'Motion',
      'Wireframes',
    ],
  },
  {
    key: 'backend',
    items: ['Firestore', 'Firebase', 'APIs', 'Auth', 'Functions'],
  },
  {
    key: 'workflow',
    items: ['Git', 'CI/CD', 'Performance', 'SEO', 'Analytics'],
  },
]

const courses = [
  {
    title: 'Arquitetura Front-end',
    provider: 'Alura',
    status: 'Concluido',
  },
  {
    title: 'Figma UI Essentials',
    provider: 'Udemy',
    status: 'Concluido',
  },
  {
    title: 'Animacoes com JavaScript',
    provider: 'Origamid',
    status: 'Em andamento',
  },
]

const certifications = [
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: '2024',
  },
  {
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    year: '2023',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'AWS',
    year: 'Em estudo',
  },
]

const contactLinks = [
  {
    label: 'Email',
    value: 'contato@isabelacamara.com',
    href: 'mailto:contato@isabelacamara.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/belacstar',
    href: 'https://github.com/belacstar',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/isabela-camara',
    href: 'https://linkedin.com/in/isabela-camara',
  },
]

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'pt'
  }

  const stored = window.localStorage.getItem('language')
  if (stored === 'pt' || stored === 'en') {
    return stored
  }

  const browserLanguage = navigator.language.toLowerCase()
  return browserLanguage.startsWith('en') ? 'en' : 'pt'
}

function App() {
  useReveal()
  const bubbleRef = useRef(null)
  useBubbleBackground(bubbleRef)

  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visitorCount, setVisitorCount] = useState(null)

  const t = copy[language]
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    window.localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return
    }

    let active = true

    incrementVisitorCount()
      .then((value) => {
        if (!active || !Number.isFinite(value)) {
          return
        }
        setVisitorCount(value)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  const visitorDisplay = useMemo(() => {
    if (!Number.isFinite(visitorCount)) {
      return '--'
    }
    const locale = language === 'pt' ? 'pt-BR' : 'en-US'
    return new Intl.NumberFormat(locale).format(visitorCount)
  }, [visitorCount, language])

  const toggleTheme = () => {
    setTheme((value) => (value === 'dark' ? 'light' : 'dark'))
  }

  const toggleLanguage = () => {
    setLanguage((value) => (value === 'pt' ? 'en' : 'pt'))
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="page" id="top">
      <div className="orb-layer" aria-hidden="true" ref={bubbleRef}>
        <svg className="orb-filter" aria-hidden="true" focusable="false">
          <filter
            id="ink-blob"
            x="-0.3"
            y="-0.3"
            width="1.6"
            height="1.6"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves="2"
              seed="2"
              result="noise"
              data-orb-turbulence
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
              data-orb-displacement
            />
          </filter>
        </svg>
        <svg className="orb-rings" viewBox="0 0 400 400" aria-hidden="true">
          <circle className="ring ring-1" cx="200" cy="200" r="150" />
          <circle className="ring ring-2" cx="200" cy="200" r="190" />
          <circle className="ring ring-3" cx="200" cy="200" r="230" />
        </svg>
        <div className="cursor-dot" />
        <div className="orb orb-primary">
          <span className="orb-drip" />
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <a className="brand" href="#top">
            Isabela Camara
          </a>

          <button
            className="nav-toggle"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={t.toggles.menu}
          >
            {t.toggles.menu}
          </button>

          <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#work" onClick={handleNavClick}>
              {t.nav.work}
            </a>
            <a href="#about" onClick={handleNavClick}>
              {t.nav.about}
            </a>
            <a href="#skills" onClick={handleNavClick}>
              {t.nav.skills}
            </a>
            <a href="#courses" onClick={handleNavClick}>
              {t.nav.courses}
            </a>
            <a href="#blog" onClick={handleNavClick}>
              {t.nav.blog}
            </a>
            <a href="#contact" onClick={handleNavClick}>
              {t.nav.contact}
            </a>
          </nav>

          <div className="toggles">
            <button
              className="toggle-button"
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
            >
              <span className="toggle-label">{t.toggles.theme}</span>
              <span>{theme === 'dark' ? t.toggles.dark : t.toggles.light}</span>
            </button>
            <button
              className="toggle-button"
              type="button"
              onClick={toggleLanguage}
              aria-pressed={language === 'en'}
            >
              <span className="toggle-label">{t.toggles.language}</span>
              <span>{language === 'pt' ? t.toggles.pt : t.toggles.en}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="section hero">
          <div className="container hero-grid">
            <div className="reveal" data-reveal>
              <div className="hero-kicker">{t.hero.kicker}</div>
              <h1 className="hero-title">
                {t.hero.title}
                <span>Portfolio</span>
              </h1>
              <p className="hero-subtitle">{t.hero.subtitle}</p>
              <div className="hero-actions">
                <a className="button" href="#work">
                  {t.hero.ctaPrimary}
                </a>
                <a className="button secondary" href="#contact">
                  {t.hero.ctaSecondary}
                </a>
              </div>
              <p className="hero-note">{t.hero.note}</p>
            </div>
            <div className="hero-card reveal" data-reveal>
              <h3>{t.hero.highlightsTitle}</h3>
              <ul className="hero-list">
                {t.hero.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.work}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.hero.subtitle}
            </p>
            <div className="card-grid">
              {projects.map((project) => (
                <article className="card reveal" data-reveal key={project.title.en}>
                  <div className="status-pill">
                    {t.projectStatus[project.status]}
                  </div>
                  <h4>{project.title[language]}</h4>
                  <p className="muted">{project.description[language]}</p>
                  <div className="chip-row">
                    {project.tags.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.about}
            </h2>
            <div className="about-grid">
              <div className="reveal" data-reveal>
                <p className="section-subtitle">{t.about.body}</p>
              </div>
              <div className="card-grid">
                {t.about.points.map((point) => (
                  <article className="card reveal" data-reveal key={point.title}>
                    <h4>{point.title}</h4>
                    <p className="muted">{point.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.skills}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.skills.intro}
            </p>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div className="card skills-group reveal" data-reveal key={group.key}>
                  <h4>{t.skills.groups[group.key]}</h4>
                  <ul className="skills-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="courses">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.courses}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.courses.intro}
            </p>
            <div className="card-grid">
              {courses.map((course) => (
                <article className="card reveal" data-reveal key={course.title}>
                  <h4>{course.title}</h4>
                  <p className="muted">{course.provider}</p>
                  <div className="status-pill">{course.status}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="certifications">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.certifications}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.certifications.intro}
            </p>
            <div className="card-grid">
              {certifications.map((cert) => (
                <article className="card reveal" data-reveal key={cert.title}>
                  <h4>{cert.title}</h4>
                  <p className="muted">{cert.issuer}</p>
                  <div className="status-pill">{cert.year}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="blog">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.blog}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.blog.intro}
            </p>
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <article className="card blog-card reveal" data-reveal key={post.title.en}>
                  <div className="blog-meta">
                    <span>{post.tag}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4>{post.title[language]}</h4>
                  <p className="muted">{post.excerpt[language]}</p>
                  <span className="status-pill">{t.blog.cta}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.contact}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.contact.intro}
            </p>
            <div className="contact-grid">
              <form className="card reveal" data-reveal onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">{t.contact.name}</label>
                  <input className="input" id="name" name="name" type="text" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{t.contact.email}</label>
                  <input className="input" id="email" name="email" type="email" />
                </div>
                <div className="form-field">
                  <label htmlFor="message">{t.contact.message}</label>
                  <textarea className="textarea" id="message" name="message" />
                </div>
                <button className="button" type="submit">
                  {t.contact.send}
                </button>
                <p className="form-hint">{t.contact.helper}</p>
              </form>

              <div className="card reveal" data-reveal>
                <h4>{t.contact.details}</h4>
                <div className="chip-row">
                  {contactLinks.map((link) => (
                    <a className="chip" key={link.label} href={link.href}>
                      {link.value}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="visitor-count">
              <span className="muted">{t.footer.visitors}</span>
              <strong>{visitorDisplay}</strong>
            </div>
            {!isFirebaseConfigured && (
              <div className="muted">{t.footer.visitorHint}</div>
            )}
          </div>
          <div className="muted">
            {t.footer.built} - {currentYear}
          </div>
          <div className="muted">{t.footer.rights}</div>
        </div>
      </footer>
    </div>
  )
}

export default App
