import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const NAV_LINKS = ["Work", "About", "Skills", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Professional Logistics Solutions",
    url: "https://professionallogisticssolutions.com",
    tag: "Logistics",
    tagColor: "#0ea5e9",
    year: "2025",
    problem: "Zero online presence — losing leads to competitors every day.",
    solution: "Built a responsive full-stack site with service pages and a backend-connected inquiry system. Buyers now find them on Google and submit inquiries directly.",
    stack: ["React.js", "EmailJS", "Tailwind CSS", "Netlify"],
    outcome: "Now receiving online customer inquiries",
    highlight: "Online presence created from scratch",
  },
  {
    id: 2,
    title: "BK Steel Traders",
    url: "https://bksteeltraders.in",
    tag: "B2B Trading",
    tagColor: "#f59e0b",
    year: "2025",
    problem: "B2B buyers couldn't request quotes online — all leads came through calls only.",
    solution: "Built a product catalogue with an online quotation request system. Bulk buyers can now specify product, quantity, and location — all leads go straight to the owner's inbox.",
    stack: ["React.js", "EmailJS", "Tailwind CSS", "Netlify"],
    outcome: "Increased B2B lead capture via website",
    highlight: "Quotation system → more B2B leads",
  },
  {
    id: 3,
    title: "Goodwill Traders",
    url: "https://goodwilltraders.co.in",
    tag: "Steel Trading",
    tagColor: "#10b981",
    year: "2025",
    problem: "Established offline business with no digital footprint — invisible to younger procurement managers.",
    solution: "End-to-end website with product listings, lead capture forms, and full deployment. Client needed zero technical involvement — I handled everything.",
    stack: ["React.js", "EmailJS", "Tailwind CSS", "Netlify"],
    outcome: "Business now discoverable online",
    highlight: "Full lifecycle — zero client involvement needed",
  },
];

const SKILLS = [
  { category: "Frontend", items: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Socket.IO"] },
  { category: "Database", items: ["MongoDB", "MySQL"] },
  { category: "Tools", items: ["Git", "GitHub", "Netlify", "Render", "VS Code", "JWT Auth"] },
];

export default function App() {
  const [activeNav, setActiveNav] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle");
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["work", "about", "skills", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceID || !templateID || !publicKey) {
      setFormState("error");
      return;
    }
    setFormState("sending");
    try {
      await emailjs.send(serviceID, templateID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, publicKey);
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormState("error");
    }
  };

  return (
    <div className="app">
      <div className="cursor" ref={cursorRef} />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <button className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            AK<span>.</span>
          </button>
          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <button key={l} className={`nav__link ${activeNav === l ? "nav__link--active" : ""}`} onClick={() => scrollTo(l)}>
                {l}
              </button>
            ))}
          </div>
          <button className="nav__hire" onClick={() => scrollTo("Contact")}>Hire Me</button>
          <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <div className="nav__mobile">
            {NAV_LINKS.map((l) => (
              <button key={l} className="nav__mobile-link" onClick={() => scrollTo(l)}>{l}</button>
            ))}
            <button className="nav__mobile-hire" onClick={() => scrollTo("Contact")}>Hire Me</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__grid" />
        </div>
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Available for freelance work
          </div>
          <h1 className="hero__title">
            I help businesses get more customers<br />
            <span className="hero__title--accent">with high-converting websites.</span>
          </h1>
          <p className="hero__sub">
            I design and build websites that turn visitors into real customers.
            From idea to deployment — I handle everything so you can focus on your business.
          </p>
          <div className="hero__actions">
            <a href="https://wa.me/918248967426" target="_blank" rel="noreferrer" className="btn btn--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Get Your Website
            </a>
            <button className="btn btn--ghost" onClick={() => scrollTo("Work")}>View Results</button>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">3+</span>
              <span className="hero__stat-label">Businesses Helped</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">Live</span>
              <span className="hero__stat-label">Real Client Projects</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">100%</span>
              <span className="hero__stat-label">Delivery Rate</span>
            </div>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section work">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Work</span>
            <h2 className="section__title">Real Results for Real Businesses</h2>
            <p className="section__sub">Not tutorial projects. These are live businesses in Chennai using these sites every day.</p>
          </div>
          <div className="projects">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`project-card ${activeProject === p.id ? "project-card--open" : ""}`}
                style={{ "--p-color": p.tagColor }}
                onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
              >
                <div className="project-card__bar" />
                <div className="project-card__main">
                  <div className="project-card__top">
                    <span className="project-card__num">0{i + 1}</span>
                    <span className="project-card__tag">{p.tag}</span>
                    <span className="project-card__year">{p.year}</span>
                    <div className="project-card__toggle">
                      <span>{activeProject === p.id ? "−" : "+"}</span>
                    </div>
                  </div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <div className="project-card__meta-row">
                    <p className="project-card__highlight">
                      <span className="project-card__highlight-dot" />
                      {p.highlight}
                    </p>
                    <span className="project-card__outcome">✦ {p.outcome}</span>
                  </div>
                  {activeProject === p.id && (
                    <div className="project-card__detail">
                      <div className="project-card__two-col">
                        <div className="project-card__section">
                          <span className="project-card__label">Problem</span>
                          <p>{p.problem}</p>
                        </div>
                        <div className="project-card__section">
                          <span className="project-card__label">Solution</span>
                          <p>{p.solution}</p>
                        </div>
                      </div>
                      <div className="project-card__bottom">
                        <div className="project-card__stack">
                          {p.stack.map((s) => <span key={s} className="project-card__pill">{s}</span>)}
                        </div>
                        <a href={p.url} target="_blank" rel="noreferrer" className="project-card__link" onClick={(e) => e.stopPropagation()}>
                          <span>Visit live site</span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about">
        <div className="container about__grid">
          <div className="about__left">
            <span className="section__tag">About</span>
            <h2 className="section__title">Built for businesses.<br />Not just for looks — for results.</h2>
            <p className="about__body">
              I help businesses build a strong online presence and generate leads through high-converting websites.
              Unlike typical developers, I focus on solving business problems — not just writing code.
            </p>
            <p className="about__body">
              I've worked with logistics companies, steel traders, and trading firms — handling the full development lifecycle from understanding the client's problem to deployment with a custom domain. My clients don't need to touch any technical work.
            </p>
            <p className="about__body">
              I also participated in a hackathon at IIT Madras, building a MERN stack project in a team — which means I can work under pressure and ship fast.
            </p>
            <div className="about__links">
              <a href="https://github.com/ajithkumar-v-1" target="_blank" rel="noreferrer" className="about__link">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/ajith-kumar-v-097860327" target="_blank" rel="noreferrer" className="about__link">LinkedIn ↗</a>
              <a href="https://wa.me/918248967426" target="_blank" rel="noreferrer" className="about__link">WhatsApp ↗</a>
            </div>
          </div>
          <div className="about__right">
            <div className="about__id-card">
              <div className="about__id-bg" />
              <div className="about__id-top">
                <div className="about__avatar-wrap">
                  <div className="about__avatar">AK</div>
                  <span className="about__avatar-ring" />
                </div>
                <div className="about__id-info">
                  <span className="about__name">Ajithkumar V</span>
                  <span className="about__role">Full Stack Developer</span>
                  <span className="about__location">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Chennai, Tamil Nadu
                  </span>
                </div>
              </div>
              <div className="about__id-divider" />
              <span className="about__cert-label">Achievements</span>
              <div className="about__badges">
                <div className="about__badge-item">
                  <span className="about__badge-icon">⚡</span>
                  <div><span className="about__badge-title">MERN Stack</span><span className="about__badge-org">GUVI</span></div>
                </div>
                <div className="about__badge-item">
                  <span className="about__badge-icon">🌐</span>
                  <div><span className="about__badge-title">Web Development</span><span className="about__badge-org">Internship Studio</span></div>
                </div>
                <div className="about__badge-item">
                  <span className="about__badge-icon">🏦</span>
                  <div><span className="about__badge-title">Virtual Experience</span><span className="about__badge-org">Goldman Sachs · Forage</span></div>
                </div>
                <div className="about__badge-item about__badge-item--accent">
                  <span className="about__badge-icon">🏆</span>
                  <div><span className="about__badge-title">Hackathon</span><span className="about__badge-org">IIT Madras</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section skills">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Skills</span>
            <h2 className="section__title">What I work with</h2>
          </div>
          <div className="skills__grid">
            {SKILLS.map((group) => (
              <div key={group.category} className="skills__group">
                <span className="skills__category">{group.category}</span>
                <div className="skills__items">
                  {group.items.map((item) => <span key={item} className="skills__item">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container contact__grid">
          <div className="contact__left">
            <span className="section__tag">Contact</span>
            <h2 className="section__title">Ready to get more customers?</h2>
            <p className="contact__sub">
              Tell me about your business — I'll handle the rest. Currently available for 2 freelance projects this month.
            </p>
            <div className="contact__availability">
              <span className="contact__avail-dot" />
              <span>Available now · Usually replies within 2 hours</span>
            </div>
            <div className="contact__direct">
              <a href="mailto:ajithkumar19092004@gmail.com" className="contact__item">
                <span className="contact__icon">✉</span>
                ajithkumar19092004@gmail.com
              </a>
              <a href="https://wa.me/918248967426" target="_blank" rel="noreferrer" className="contact__item">
                <span className="contact__icon">💬</span>
                +91 82489 67426 (WhatsApp preferred)
              </a>
              <span className="contact__item">
                <span className="contact__icon">📍</span>
                Chennai, Tamil Nadu
              </span>
            </div>
          </div>
          <div className="contact__right">
            <form ref={formRef} onSubmit={handleSubmit} className="form">
              <div className="form__group">
                <label className="form__label">Your name</label>
                <input className="form__input" type="text" required placeholder="Your Name"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form__group">
                <label className="form__label">Email address</label>
                <input className="form__input" type="email" required placeholder="your.email@example.com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form__group">
                <label className="form__label">Tell me about your project</label>
                <textarea className="form__input form__textarea" required rows={4}
                  placeholder="I need a website for my business..."
                  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <button type="submit" className={`btn btn--primary btn--full ${formState === "sending" ? "btn--loading" : ""}`}
                disabled={formState === "sending"}>
                {formState === "idle" && "Send Message"}
                {formState === "sending" && "Sending..."}
                {formState === "sent" && "Message Sent ✓"}
                {formState === "error" && "Try Again"}
              </button>
              {formState === "sent" && <p className="form__success">Thanks! I'll reply within 24 hours.</p>}
              {formState === "error" && <p className="form__error">Something went wrong. WhatsApp me directly.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__logo">AK<span>.</span></span>
          <span className="footer__copy">© 2025 Ajithkumar V · Chennai</span>
          <div className="footer__links">
            <a href="https://github.com/ajithkumar-v-1" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ajith-kumar-v-097860327" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}