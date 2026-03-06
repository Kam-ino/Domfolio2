import { useEffect, useState } from 'react';
import QuestBoard from './components/QuestBoard';
import Section from './components/Section';
import Stack from "./components/CardStack";
import { aboutParagraphs, projects, siteConfig, skills, timeline } from './data/portfolioData';
import './styles.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Quest Board', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const pics = [
  { id: 1, content: (
            <div className="portrait">
                <img src="./public/Poster (1).png" alt="Me 1"/>
            </div>
        ),
  },
  { id: 2, content: (
            <div className="portrait">
                <img src="./public/Poster (2).png" alt="Me 2"/>
            </div>
        ),
  },
  { id: 3, content: (
            <div className="portrait">
                <img src="./public/Poster (3).png" alt="Me 3"/>
            </div>
        ),
  },
  { id: 4, content: (
            <div className="portrait">
                <img src="./public/Poster (4).png" alt="Me 4"/>
            </div>
        ),
  },
  { id: 5, content: (
            <div className="portrait">
                <img src="./public/Poster (5).png" alt="Me 5"/>
            </div>
        ),
  },
]

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'parchment');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="app-shell">
        <header className="site-header">
          <a className="brand" href="#hero">
            <span className="brand-mark">⚔</span>
            <span>{siteConfig.name}</span>
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === 'parchment' ? 'moonlit' : 'parchment'))}
            aria-label={`Switch to ${theme === 'parchment' ? 'moonlit' : 'parchment'} theme`}
          >
            {theme === 'parchment' ? 'Moonlit Mode' : 'Parchment Mode'}
          </button>
        </header>

        <main id="main-content">
          <section id="hero" className="hero section-frame">
            <div className="hero-copy">
              <p className="eyebrow">Adventure-ready developer portfolio</p>
              <h1>{siteConfig.name}</h1>
              <p className="hero-role">{siteConfig.title}</p>
              <p className="hero-tagline">{siteConfig.tagline}</p>
              <p className="hero-summary">{siteConfig.resumeNote}</p>

              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  View Projects
                </a>
                <a className="button secondary" href="#journey">
                  Explore Quest Board
                </a>
              </div>
            </div>
            <aside className="hero-portrait" aria-label="Profile portraits">
                <Stack
                      randomRotation={true}
                      sensitivity={180}
                      sendToBackOnClick={false}
                      cardDimensions={{ width: 400, height: 550 }}
                      cardsData={pics}
                  />
            </aside>
            <aside className="hero-card" aria-label="Profile highlights">
              <h2>Guild Summary</h2>
              <ul>
                <li>Frontend and full stack web development</li>
                <li>React, Node.js, Shopify, and automation</li>
                <li>AI-assisted product workflows and research</li>
                <li>Based in Marikina, NCR, Philippines</li>
              </ul>
            </aside>
          </section>

          <Section id="about" eyebrow="The Story" title="About Me">
            <div className="about-grid">
              <div className="parchment-card">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="parchment-card stats-card" aria-label="Key profile details">
                <div>
                  <span>Location</span>
                  <strong>{siteConfig.location}</strong>
                </div>
                <div>
                  <span>Email</span>
                  <strong>{siteConfig.email}</strong>
                </div>
                <div>
                  <span>Focus</span>
                  <strong>Full Stack, UI Engineering, Automation</strong>
                </div>
                <div>
                  <span>Strength</span>
                  <strong>User-focused, practical solutions</strong>
                </div>
              </div>
            </div>
          </Section>

          <Section id="skills" eyebrow="Tools of the Trade" title="Skills & Expertise">
            <div className="skills-grid">
              <article className="skill-panel parchment-card">
                <h3>Technical</h3>
                <div className="chip-group">
                  {skills.technical.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article className="skill-panel parchment-card">
                <h3>Cloud, AI & Automation</h3>
                <div className="chip-group">
                  {skills.cloudAndAi.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article className="skill-panel parchment-card">
                <h3>Professional</h3>
                <div className="chip-group">
                  {skills.professional.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </Section>

          <Section id="projects" eyebrow="Quest Log" title="Portfolio Projects">
            <div className="projects-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card parchment-card">
                  <div className="project-topline">
                    <p>{project.status}</p>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chip-group">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href="#journey">See related quest</a>
                    <a href="#contact">Request case study</a>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="journey" eyebrow="Chronicle" title="Experience, Education & Certifications">
            <div className="journey-intro">
              <div className="parchment-card">
                <h3>Snapshot Timeline</h3>
                <ul className="journey-list">
                  {timeline.slice(0, 4).map((item) => (
                    <li key={`${item.title}-${item.date}`}>
                      <strong>{item.date}</strong> — {item.title} · {item.org}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <QuestBoard />
          </Section>

          <Section id="contact" eyebrow="Send a Scroll" title="Contact">
            <div className="contact-grid">
              <div className="parchment-card contact-panel">
                <h3>Let’s build something useful</h3>
                <p>
                  I’m interested in product development, freelance opportunities, and collaborative teams
                  building practical software.
                </p>
                <ul className="contact-list">
                  <li>
                    <span>Email</span>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </li>
                  <li>
                    <span>Phone</span>
                    <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
                  </li>
                  <li>
                    <span>Location</span>
                    <span>{siteConfig.location}</span>
                  </li>
                </ul>
                <div className="social-links" aria-label="Social links">
                  {siteConfig.socials.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <form
                className="parchment-card contact-form"
                action={`mailto:${siteConfig.email}`}
                method="post"
                encType="text/plain"
              >
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" required />

                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project, role, or idea."
                  required
                />

                <button className="button primary" type="submit">
                  Send Message
                </button>
              </form>
            </div>
          </Section>
        </main>

        <footer className="site-footer">
          <p>Built with React and handcrafted CSS.</p>
          <p>{siteConfig.name} · Full Stack Developer</p>
        </footer>
      </div>
    </>
  );
}

export default App;
