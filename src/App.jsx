import { useEffect, useMemo, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
import { incrementVisitorCount, isFirebaseConfigured } from './lib/firebase'
import { useReveal } from './hooks/useReveal'
import { useInteractiveBackground } from './hooks/useInteractiveBackground'
import logo from './assets/logo/ic-logo.png'
import casamentoPreview from './assets/sites/casamento.png'
import chingLingPreview from './assets/sites/ching-ling.png'
import casaBuziosPreview from './assets/sites/casa-buzios.png'

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
        lead:
          'Crio experiências digitais que priorizam performance, clareza e experiência do usuário.',
        follow: 'Aqui você encontra meus projetos, estudos e laboratórios.',
      },
      ctaPrimary: 'Ver projetos',
      ctaSecondary: 'Entrar em contato',
    },
    sections: {
      work: 'Últimos Projetos',
      about: 'Sobre mim',
      skills: 'Habilidades',
      courses: 'Cursos e capacitacoes',
      certifications: 'Certificacoes',
      contact: 'Contato',
    },
    projects: {
      visit: 'Visitar site',
      unavailable: 'Link indisponível',
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
    projects: {
      visit: 'Visit site',
      unavailable: 'Link unavailable',
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

const featuredProjects = [
  {
    title: {
      pt: 'Plataforma para casamento',
      en: 'Wedding platform',
    },
    summary: {
      pt: 'Aplicação web sob medida para centralizar RSVP, convite digital com QR Code, check-in do evento e lista de presentes com fluxo de ecommerce. Backend serverless com Firestore garante automação, rastreabilidade e geração de convites em PDF, além de validação de acesso por QR Code no dia do evento. A lista de presentes funciona como ecommerce simplificado com catálogo dinâmico, contribuições e integração de pagamento.',
      en: 'Custom web app to centralize RSVP, digital invitations with QR Code, event check-in, and a gift list with ecommerce flow. A serverless backend with Firestore ensures automation, traceability, PDF invitation generation, and QR code access validation on event day. The gift list works as a lightweight ecommerce with dynamic catalog, contributions, and payment integration.',
    },
    stack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Firebase',
      'Node.js',
    ],
    tech: [],
    status: 'live',
    link: 'https://www.casamentopriscilaeluizfelipe.com/',
    image: casamentoPreview,
    imageAlt: {
      pt: 'Preview da plataforma de casamento',
      en: 'Wedding platform preview',
    },
  },
  {
    title: {
      pt: 'Ching Ling',
      en: 'Ching Ling',
    },
    summary: {
      pt: 'Site institucional desenvolvido para um restaurante de culinária chinesa e japonesa, com foco em fortalecer a presença digital e centralizar informações essenciais. Reúne descrição, localização, horários e contato, além de um cardápio digital organizado por categorias com pratos e descrições. O projeto prioriza usabilidade, design limpo e performance, oferecendo experiência fluida em desktop e mobile com layout responsivo e fácil manutenção.',
      en: 'Institutional website for a Chinese and Japanese restaurant, focused on strengthening the digital presence and centralizing essential information. It includes description, location, hours, and contact details, plus a digital menu organized by categories with dishes and descriptions. The project prioritizes usability, clean design, and performance, delivering a smooth experience on desktop and mobile with a responsive layout and easy maintenance.',
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    tech: [],
    status: 'live',
    link: 'https://restaurantechingling.com.br/',
    image: chingLingPreview,
    imageAlt: {
      pt: 'Preview do site Ching Ling',
      en: 'Ching Ling website preview',
    },
  },
  {
    title: {
      pt: 'Casa Alegria',
      en: 'Casa Alegria',
    },
    summary: {
      pt: 'Site institucional para divulgar um imóvel de aluguel por temporada em Búzios (RJ), com foco em apresentar a propriedade de forma atrativa, clara e confiável, facilitando contato e reserva. Centraliza descrição dos ambientes, diferenciais, localização, regras da casa e canais de contato, além de destacar imagens voltadas à experiência do hóspede. O projeto segue abordagem mobile-first, garantindo ótima navegação em smartphones, com carregamento rápido e fácil manutenção.',
      en: 'Institutional website to promote a seasonal rental property in Búzios (RJ), focused on presenting the house in an attractive, clear, and reliable way, facilitating contact and booking. It centralizes room descriptions, highlights, location, house rules, and contact channels, plus imagery aimed at the guest experience. The project is mobile-first, ensuring great smartphone navigation, fast loading, and easy maintenance.',
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    tech: [],
    status: 'live',
    link: 'https://casaalegriabuzios.com.br/',
    image: casaBuziosPreview,
    imageAlt: {
      pt: 'Preview do site Casa Alegria',
      en: 'Casa Alegria website preview',
    },
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
    icon: Mail,
    href: 'mailto:contato@isabelacamara.com',
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/belacstar',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/isabela-camara-',
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
  const lastScrollY = useRef(0)
  const autoScrollLock = useRef(false)
  const autoScrollTimeout = useRef(null)

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
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scrollToTop = () => {
      autoScrollLock.current = true
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
      if (autoScrollTimeout.current) {
        window.clearTimeout(autoScrollTimeout.current)
      }
      autoScrollTimeout.current = window.setTimeout(() => {
        autoScrollLock.current = false
      }, prefersReducedMotion ? 0 : 700)
    }

    const handleScroll = () => {
      const currentY = window.scrollY
      setHeaderExpanded(currentY > 12)

      const delta = currentY - lastScrollY.current
      if (!autoScrollLock.current && delta < -40 && currentY > 160) {
        scrollToTop()
      }

      lastScrollY.current = currentY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (autoScrollTimeout.current) {
        window.clearTimeout(autoScrollTimeout.current)
      }
    }
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
          <a className="brand" href="#top" onClick={handleNavClick}>
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
            <div className="hero-content reveal" data-reveal>
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
          <div className="container container--wide">
            <h2 className="section-title reveal" data-reveal>
              {t.sections.work}
            </h2>
            <div className="project-preview-grid">
              {featuredProjects.map((project) => {
                const hasLink = Boolean(project.link)

                return (
                  <article
                    className="project-preview reveal"
                    data-reveal
                    key={project.title.en}
                  >
                    <div className="project-preview__media">
                      <div className="project-preview__image-wrap">
                        <img
                          className="project-preview__image"
                          src={project.image}
                          alt={project.imageAlt[language]}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="project-preview__content">
                      <div className="project-preview__header">
                        <h3>{project.title[language]}</h3>
                      </div>
                      <p className="project-preview__summary">
                        {project.summary[language]}
                      </p>
                      <div className="project-preview__section">
                        <div className="chip-row">
                          {project.stack.map((tag) => (
                            <span className="chip" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="project-preview__actions">
                        <a
                          className="button project-preview__link"
                          href={hasLink ? project.link : '#'}
                          target={hasLink ? '_blank' : undefined}
                          rel={hasLink ? 'noreferrer' : undefined}
                          aria-disabled={!hasLink}
                          data-disabled={!hasLink}
                        >
                          {hasLink ? t.projects.visit : t.projects.unavailable}
                          {hasLink && (
                            <span className="button-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24" role="img">
                                <path
                                  d="M14 4h6v6m0-6L10 14"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          )}
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
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
                    <a
                      className="chip chip--icon"
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <link.icon className="icon" aria-hidden="true" />
                      <span className="sr-only">{link.label}</span>
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
