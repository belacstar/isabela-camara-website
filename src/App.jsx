import { useEffect, useMemo, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { incrementVisitorCount, isFirebaseConfigured } from './lib/firebase'
import { useReveal } from './hooks/useReveal'
import { useInteractiveBackground } from './hooks/useInteractiveBackground'
import logo from './assets/logo/ic-logo.png'

const copy = {
  pt: {
    nav: {
      home: 'Home',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
    },
    hero: {
      title: 'Isabela Camara',
      subtitle: {
        lead: 'Crio experiências digitais que priorizam performance, clareza e experiência do usuário.',
        follow: 'Aqui você encontra meus projetos, estudos e laboratórios.',
      },
      ctaPrimary: 'Ver projetos',
      ctaSecondary: 'Entrar em contato',
    },
    sections: {
      work: 'Trabalhos recentes',
      about: 'Sobre mim',
      skills: 'Habilidades',
      courses: 'Cursos e capacitacoes',
      certifications: 'Certificacoes',
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
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      title: 'Isabela Camara',
      subtitle: {
        lead: 'I create digital experiences focused on performance, clarity, and user experience.',
        follow: 'Explore my projects, studies, and labs.',
      },
      ctaPrimary: 'View projects',
      ctaSecondary: 'Get in touch',
    },
    sections: {
      work: 'Recent work',
      about: 'About',
      skills: 'Skills',
      courses: 'Courses and training',
      certifications: 'Certifications',
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
    return 'dark'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return 'dark'
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

  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visitorCount, setVisitorCount] = useState(null)
  const [headerExpanded, setHeaderExpanded] = useState(false)
  const backgroundRef = useRef(null)

  const t = copy[language]
  const currentYear = new Date().getFullYear()

  useInteractiveBackground(backgroundRef)

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
    const handleScroll = () => {
      setHeaderExpanded(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <div className="interactive-bg" aria-hidden="true" ref={backgroundRef} />
      <div className="orbit-layer" aria-hidden="true">
        <div className="orbit-lines orbit-lines--cursor" />
        <div className="orbit-lines orbit-lines--static orbit-lines--one" />
        <div className="orbit-lines orbit-lines--static orbit-lines--two" />
        <div className="orbit-lines orbit-lines--static orbit-lines--three" />
      </div>
      <div className="ai-network ai-network--top" aria-hidden="true" />
      <div className="ai-network ai-network--mid" aria-hidden="true" />
      <div className="ai-network ai-network--bottom" aria-hidden="true" />
      <header className={`site-header ${headerExpanded ? 'is-expanded' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#top">
            <img className="brand-logo" src={logo} alt="Logo Isabela Camara" />
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
            <a href="#top" onClick={handleNavClick}>
              {t.nav.home}
            </a>
            <a href="#about" onClick={handleNavClick}>
              {t.nav.about}
            </a>
            <a href="#work" onClick={handleNavClick}>
              {t.nav.projects}
            </a>
            <a href="#contact" onClick={handleNavClick}>
              {t.nav.contact}
            </a>
          </nav>

          <div className="toggles">
            <button
              className="theme-switch"
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={
                theme === 'dark' ? t.toggles.light : t.toggles.dark
              }
            >
              <span className="sr-only">{t.toggles.theme}</span>
              <span className="theme-switch__track" aria-hidden="true">
                <span className="theme-switch__icon">
                  <Sun aria-hidden="true" />
                </span>
                <span className="theme-switch__icon">
                  <Moon aria-hidden="true" />
                </span>
              </span>
              <span className="theme-switch__thumb" aria-hidden="true" />
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
              <h1 className="hero-title">
                <span className="hero-title-name">{t.hero.title}</span>
              </h1>
              <p className="hero-subtitle">
                {t.hero.subtitle.lead}
                <span className="hero-subtitle-line">
                  {t.hero.subtitle.follow}
                </span>
              </p>
            </div>
            <div className="hero-cta-panel reveal" data-reveal>
              <div className="hero-actions">
                <a className="button" href="#work">
                  {t.hero.ctaPrimary}
                </a>
                <a className="button secondary" href="#contact">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.work}
            </h2>
            <p className="section-subtitle reveal" data-reveal>
              {t.hero.subtitle.lead}
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
        <div className="ai-network ai-network--footer" aria-hidden="true" />
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
