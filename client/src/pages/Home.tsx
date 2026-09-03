import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  CirclePlay,
  ExternalLink,
  Instagram,
  Linkedin,
  Menu,
  MoveDown,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

const imagePaths = {
  moon: "/manus-storage/chandrayaan_6d2c22ec.jpg",
  upi: "/manus-storage/upi_00888a81.jpg",
  rail: "/manus-storage/namo-rail_b0ab88be.png",
};

type Domain = "all" | "digital" | "infrastructure" | "space" | "people" | "climate" | "world";

type TimelineItem = {
  year: string;
  domain: Exclude<Domain, "all">;
  title: string;
  body: string;
  tag: string;
  source: string;
};

const timeline: TimelineItem[] = [
  { year: "2014", domain: "digital", title: "Jan Dhan opens the front door", body: "Pradhan Mantri Jan Dhan Yojana launches with a simple proposition: every household should have access to a bank account and the rails of a formal economy.", tag: "Financial inclusion", source: "https://www.pmjdy.gov.in/" },
  { year: "2014", domain: "space", title: "Mars, on the first try", body: "Mangalyaan enters Mars orbit, making India the first Asian nation to reach the planet and the first in the world to do so on its maiden attempt.", tag: "ISRO · 24 Sep", source: "https://www.isro.gov.in/MarsOrbiterMissionSpacecraft.html" },
  { year: "2015", domain: "climate", title: "A solar alliance is born", body: "India and France launch the International Solar Alliance at COP21, turning tropical sunshine into a shared diplomatic and infrastructure agenda.", tag: "Climate diplomacy · 30 Nov", source: "https://isolaralliance.org/" },
  { year: "2016", domain: "digital", title: "A common tax language", body: "The constitutional amendment enabling GST passes Parliament, setting up a national indirect-tax architecture that goes live the following year.", tag: "GST · 8 Aug", source: "https://www.gstcouncil.gov.in/" },
  { year: "2016", domain: "digital", title: "UPI goes live", body: "The Unified Payments Interface begins its public journey: an interoperable layer designed to make a bank transfer as easy as sending a message.", tag: "NPCI · Apr", source: "https://www.npci.org.in/what-we-do/upi/product-overview" },
  { year: "2017", domain: "digital", title: "GST becomes a national system", body: "India moves to a destination-based goods and services tax, with one digital return-and-settlement architecture replacing a patchwork of state and central levies.", tag: "01 Jul", source: "https://www.gstcouncil.gov.in/" },
  { year: "2018", domain: "people", title: "A health assurance layer", body: "Ayushman Bharat launches with Health and Wellness Centres and PM-JAY, combining primary care with publicly financed hospital cover for eligible families.", tag: "Health · 23 Sep", source: "https://pmjay.gov.in/" },
  { year: "2019", domain: "infrastructure", title: "The first Namo Bharat corridor", body: "The foundation for India’s first Regional Rapid Transit System is laid between Delhi and Meerut: fast, frequent regional mobility built around the commuter.", tag: "RRTS · 08 Mar", source: "https://ncrtc.in/" },
  { year: "2019", domain: "space", title: "Chandrayaan-2 reaches the Moon", body: "The orbiter begins a long scientific mission around the Moon, while the lander’s hard landing becomes a lesson carried forward into the next attempt.", tag: "ISRO · 22 Jul", source: "https://www.isro.gov.in/Chandrayaan2.html" },
  { year: "2020", domain: "people", title: "A vaccine platform at national scale", body: "Co-WIN is developed as the digital backbone for India’s COVID-19 vaccination drive, pairing identity, appointment, certification and supply visibility.", tag: "Co-WIN", source: "https://www.cowin.gov.in/" },
  { year: "2020", domain: "digital", title: "A new manufacturing vocabulary", body: "Production-linked incentives are rolled out across strategic sectors, designed to grow domestic manufacturing capacity and global supply-chain participation.", tag: "PLI · 2020–", source: "https://www.investindia.gov.in/production-linked-incentive-schemes-india" },
  { year: "2021", domain: "climate", title: "The Panchamrit commitments", body: "At COP26, India announces five climate commitments, including 500 GW of non-fossil electricity capacity by 2030 and net zero by 2070.", tag: "COP26 · 02 Nov", source: "https://unfccc.int/news/india-announces-five-nectar-elements-panchamrit-at-cop26" },
  { year: "2022", domain: "world", title: "India takes the G20 chair", body: "The G20 presidency sets a stage for a development-first diplomatic story, culminating in the New Delhi Leaders’ Declaration in 2023.", tag: "G20 · 01 Dec", source: "https://www.g20.org/en/" },
  { year: "2023", domain: "space", title: "The Moon’s south polar region", body: "Chandrayaan-3 soft-lands on 23 August. India becomes the first country to land in the Moon’s southern high latitudes, a landmark for planetary exploration.", tag: "ISRO · 23 Aug", source: "https://www.isro.gov.in/Chandrayaan3_Details.html" },
  { year: "2023", domain: "infrastructure", title: "Namo Bharat opens to passengers", body: "The 17 km priority section between Sahibabad and Duhai Depot begins operations, bringing a new layer of regional connectivity to the National Capital Region.", tag: "RRTS · 20 Oct", source: "https://ncrtc.in/" },
  { year: "2023", domain: "world", title: "A declaration without a footnote", body: "The New Delhi G20 Leaders’ Declaration is adopted by consensus, with the African Union welcomed as a permanent member of the group.", tag: "G20 · 09 Sep", source: "https://www.g20.org/en/media-resources/press-releases/september-2023/g20-new-delhi-leaders-declaration/" },
  { year: "2024", domain: "space", title: "Eyes on the Sun", body: "Aditya-L1 reaches its halo orbit around the Sun–Earth L1 point, beginning continuous observation of the Sun and space weather from a strategic vantage point.", tag: "ISRO · 06 Jan", source: "https://www.isro.gov.in/Aditya_L1.html" },
  { year: "2024", domain: "infrastructure", title: "A new road to the valley", body: "Atal Tunnel and a growing national highway network sit inside a larger push to connect difficult terrain, logistics hubs and smaller cities.", tag: "Connectivity", source: "https://morth.nic.in/" },
  { year: "2025", domain: "digital", title: "UPI becomes an export", body: "India’s payment interface continues to travel through bilateral and regional partnerships, turning domestic digital public infrastructure into a diplomatic asset.", tag: "DPI · ongoing", source: "https://www.npci.org.in/what-we-do/upi/product-overview" },
  { year: "2026", domain: "world", title: "The record stays open", body: "The next chapter is still being written. This edition freezes the public record at September 2026 and leaves room for evidence, debate and the work ahead.", tag: "Current · 03 Sep", source: "https://www.pmindia.gov.in/en/" },
];

const domains: { id: Domain; label: string }[] = [
  { id: "all", label: "All chapters" },
  { id: "digital", label: "Digital India" },
  { id: "infrastructure", label: "Build & move" },
  { id: "space", label: "Space & science" },
  { id: "people", label: "People first" },
  { id: "climate", label: "Climate" },
  { id: "world", label: "The world" },
];

const quotes = [
  {
    quote: "India is on the Moon, We have our national pride placed on the Moon",
    context: "The Prime Minister’s words to the Chandrayaan-3 team after the successful lunar landing.",
    meta: "Prime Minister Narendra Modi · 26 Aug 2023",
    source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1952360",
  },
  {
    quote: "Today, India's first rapid rail service, Namo Bharat Train has begun",
    context: "A line from the inauguration of the Delhi–Ghaziabad–Meerut RRTS priority section.",
    meta: "Prime Minister Narendra Modi · 20 Oct 2023",
    source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1969356",
  },
  {
    quote: "India's solar revolution will be scripted in Golden letters",
    context: "A climate-and-energy line from the fourth Global Renewable Energy Investors’ Meet.",
    meta: "Prime Minister Narendra Modi · 16 Sep 2024",
    source: "https://www.pmindia.gov.in/en/news_updates/pm-inaugurates-4th-global-renewable-energy-investors-meet-and-expo-re-invest-in-gandhinagar-gujarat/",
  },
];

function ExternalLinkLabel({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="source-link" href={href} target="_blank" rel="noreferrer">{children}<ExternalLink size={12} /></a>;
}

export default function Home() {
  const [activeDomain, setActiveDomain] = useState<Domain>("all");
  const [activeYear, setActiveYear] = useState("2014");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredTimeline = useMemo(
    () => activeDomain === "all" ? timeline : timeline.filter((item) => item.domain === activeDomain),
    [activeDomain],
  );

  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${max ? window.scrollY / max : 0}`);
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-year]"));
      const closest = sections.reduce<{ el: HTMLElement | null; distance: number }>((acc, el) => {
        const distance = Math.abs(el.getBoundingClientRect().top - 180);
        return distance < acc.distance ? { el, distance } : acc;
      }, { el: null, distance: Infinity });
      if (closest.el?.dataset.year) setActiveYear(closest.el.dataset.year);
    };

    const anime = (window as any).anime;
    if (anime) {
      anime.timeline({ easing: "easeOutExpo" })
        .add({ targets: ".eyebrow, .hero-kicker", opacity: [0, 1], translateY: [18, 0], duration: 700, delay: anime.stagger(80) })
        .add({ targets: ".hero-title .line", opacity: [0, 1], translateY: [60, 0], duration: 1000, delay: anime.stagger(110) }, "-=440")
        .add({ targets: ".hero-note, .hero-scroll", opacity: [0, 1], translateY: [18, 0], duration: 650, delay: anime.stagger(90) }, "-=560");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const target = id.startsWith("year-")
      ? document.querySelector<HTMLElement>(`[data-year="${id.replace("year-", "")}"]`)
      : document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="progress-track" aria-hidden="true"><span /></div>
      <header className="site-nav">
        <button className="brand-lockup" onClick={() => scrollTo("top")} aria-label="Back to top">
          <span className="brand-mark">न</span>
          <span><strong>NAMO</strong><em>BHARATAM</em></span>
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <button onClick={() => scrollTo("archive")}>The archive</button>
          <button onClick={() => scrollTo("impact")}>By the numbers</button>
          <button onClick={() => scrollTo("voices")}>Voices</button>
          <button className="nav-cta" onClick={() => scrollTo("sources")}>Read the sources <ArrowUpRight size={14} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <aside className="year-rail" aria-label="Year index">
        {['2014', '2016', '2018', '2020', '2022', '2024', '2026'].map((year) => (
          <button key={year} className={activeYear === year ? "active" : ""} onClick={() => scrollTo(`year-${year}`)}>{year}</button>
        ))}
      </aside>

      <section id="top" className="hero-scene" data-year="2014">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-cloud cloud-left" aria-hidden="true" />
        <div className="hero-cloud cloud-right" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">A visual archive <span>•</span> 2014—2026</p>
          <p className="hero-kicker">नमो भारतम् <span>/</span> a decade in motion</p>
          <h1 className="hero-title"><span className="line">A decade</span><span className="line italic">of motion.</span></h1>
          <p className="hero-note">A curated, source-linked record of the systems, missions and everyday shifts that shaped India’s public story under Narendra Modi.</p>
        </div>
        <button className="hero-scroll" onClick={() => scrollTo("manifesto")}><span>Scroll to enter the record</span><ArrowDown size={17} /></button>
        <div className="hero-index">01 <span>/</span> 07</div>
        <div className="hero-credit">Photographic study / ISRO archive image</div>
      </section>

      <section id="manifesto" className="manifesto-section section-light">
        <div className="paper-orb orb-one" aria-hidden="true" />
        <div className="section-label">01 <span>THE FRAME</span></div>
        <div className="manifesto-wrap">
          <p className="display-kicker" data-reveal>From last-mile delivery</p>
          <h2 className="manifesto-title" data-reveal>to lunar orbits<span>.</span></h2>
          <p className="manifesto-copy" data-reveal>One governing decade, seen as a set of connected moves: access before aspiration, rails before speed, public digital infrastructure before scale.</p>
          <div className="manifesto-rule" data-reveal><span>THE QUESTION</span><span>What does progress feel like when it moves at the speed of a billion lives?</span></div>
        </div>
        <div className="paper-scribble" aria-hidden="true">भारत<br /><span>India</span></div>
      </section>

      <section id="impact" className="impact-section section-ink">
        <div className="section-label light">02 <span>THE STACK</span></div>
        <div className="impact-intro" data-reveal>
          <p className="display-kicker">The architecture of a</p>
          <h2 className="display-title">moving nation<span>.</span></h2>
          <p className="intro-dek">The headline moments are memorable. The quieter story is the stack beneath them: identity, accounts, payments, roads, satellites, vaccines and the institutions that make them legible at scale.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-upi" data-reveal>
            <div className="feature-image" style={{ backgroundImage: `url(${imagePaths.upi})` }} />
            <div className="feature-overlay" />
            <div className="feature-card-top"><span>01 / 03</span><span>Digital public infrastructure</span></div>
            <div className="feature-card-copy"><p>2014—2026</p><h3>Make it<br /><i>instant.</i></h3><ExternalLinkLabel href="https://www.npci.org.in/what-we-do/upi/product-overview">NPCI / UPI</ExternalLinkLabel></div>
          </article>
          <article className="feature-card feature-rail" data-reveal>
            <div className="feature-image" style={{ backgroundImage: `url(${imagePaths.rail})` }} />
            <div className="feature-overlay" />
            <div className="feature-card-top"><span>02 / 03</span><span>Build & move</span></div>
            <div className="feature-card-copy"><p>2019—2026</p><h3>Close the<br /><i>distance.</i></h3><ExternalLinkLabel href="https://ncrtc.in/">NCRTC / Namo Bharat</ExternalLinkLabel></div>
          </article>
          <article className="feature-card feature-space" data-reveal>
            <div className="feature-image" style={{ backgroundImage: `url(${imagePaths.moon})` }} />
            <div className="feature-overlay" />
            <div className="feature-card-top"><span>03 / 03</span><span>Space & science</span></div>
            <div className="feature-card-copy"><p>2014—2024</p><h3>Look<br /><i>further.</i></h3><ExternalLinkLabel href="https://www.isro.gov.in/">ISRO archive</ExternalLinkLabel></div>
          </article>
        </div>
        <div className="metrics-row" data-reveal>
          <div><strong>24.5B</strong><span>UPI transactions<br />in Aug 2026</span></div>
          <div><strong>54.9Cr</strong><span>PMJDY accounts<br />as of Feb 2025</span></div>
          <div><strong>₹1.27L Cr</strong><span>reported defence<br />production in FY24</span></div>
        </div>
      </section>

      <section id="archive" className="archive-section section-paper">
        <div className="archive-header" data-reveal>
          <div><div className="section-label">03 <span>THE ARCHIVE</span></div><h2>Dates that<br /><i>moved the line.</i></h2></div>
          <p>Not an exhaustive audit. A deliberately edited sequence of public milestones, with every date linked to the institution that records it.</p>
        </div>
        <div className="domain-filter" role="tablist" aria-label="Filter the archive">
          {domains.map((domain) => <button key={domain.id} className={activeDomain === domain.id ? "active" : ""} onClick={() => setActiveDomain(domain.id)}>{domain.label}</button>)}
        </div>
        <div className="timeline-list">
          {filteredTimeline.map((item, index) => (
            <article key={`${item.year}-${item.title}`} className="timeline-item" data-year={item.year} data-reveal>
              <div className="timeline-date"><span>{item.year}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
              <div className="timeline-line"><span /></div>
              <div className="timeline-body"><p className="timeline-tag">{item.tag}</p><h3>{item.title}</h3><p>{item.body}</p><ExternalLinkLabel href={item.source}>Read source</ExternalLinkLabel></div>
              <ChevronRight className="timeline-arrow" size={19} />
            </article>
          ))}
        </div>
      </section>

      <section id="voices" className="voices-section section-saffron">
        <div className="section-label light">04 <span>THE VOICES</span></div>
        <div className="voices-heading" data-reveal><h2>Ideas are<br /><i>infrastructure.</i></h2><p>Words travel differently when they become policy, program or a shared ambition. These are the phrases that framed the decade.</p></div>
        <div className="quote-grid">
          {quotes.map((item, index) => <blockquote key={item.quote} className="quote-card" data-reveal><Quote className="quote-mark" size={27} /><p>“{item.quote}”</p><footer><span>{item.meta}</span><ExternalLinkLabel href={item.source}>Source {String(index + 1).padStart(2, "0")}</ExternalLinkLabel></footer></blockquote>)}
        </div>
      </section>

      <section className="film-section section-ink">
        <div className="film-card" data-reveal>
          <div className="film-poster" style={{ backgroundImage: `url(${imagePaths.moon})` }}><div className="film-tint" /><span className="film-label">FIELD NOTE / 23.08.23</span><div className="film-play"><CirclePlay size={48} strokeWidth={1.2} /></div><span className="film-caption">Chandrayaan-3 · the landing that changed the map</span></div>
          <div className="film-copy"><p className="display-kicker">The moving image</p><h2>Watch a<br /><i>nation look up.</i></h2><p>Space is a useful metaphor only when it stays specific: a mission, a date, a signal, a team. Visit the official ISRO channel for the films behind the milestones.</p><a className="button-outline" href="https://www.youtube.com/@isroofficial5866/search?query=Chandrayaan%203" target="_blank" rel="noreferrer">Open ISRO films <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <section id="sources" className="sources-section section-light">
        <div className="sources-top" data-reveal><div className="section-label">05 <span>THE FOOTNOTE</span></div><h2>Keep the<br /><i>record open.</i></h2><p>This page is a visual editorial, not a verdict. It selects public milestones across the period 2014—September 2026, links outward to primary institutions where possible, and leaves room for scrutiny, correction and the next chapter.</p></div>
        <div className="source-columns" data-reveal>
          <div><p className="source-index">A / PRIMARY</p><a href="https://www.pmindia.gov.in/en/" target="_blank" rel="noreferrer">Prime Minister’s Office <ArrowUpRight size={15} /></a><a href="https://www.isro.gov.in/" target="_blank" rel="noreferrer">ISRO <ArrowUpRight size={15} /></a><a href="https://www.npci.org.in/" target="_blank" rel="noreferrer">NPCI / UPI <ArrowUpRight size={15} /></a><a href="https://ncrtc.in/" target="_blank" rel="noreferrer">NCRTC <ArrowUpRight size={15} /></a></div>
          <div><p className="source-index">B / CONTEXT</p><a href="https://www.niti.gov.in/" target="_blank" rel="noreferrer">NITI Aayog <ArrowUpRight size={15} /></a><a href="https://www.g20.org/en/" target="_blank" rel="noreferrer">G20 India <ArrowUpRight size={15} /></a><a href="https://unfccc.int/" target="_blank" rel="noreferrer">UNFCCC <ArrowUpRight size={15} /></a><a href="https://www.mohfw.gov.in/" target="_blank" rel="noreferrer">Ministry of Health <ArrowUpRight size={15} /></a></div>
          <div><p className="source-index">C / THE NOTE</p><p className="method-note">Dates are written in the format used by the originating institution where available. Metrics are intentionally restrained; where the public record is ongoing, the copy says so. Built as a living exhibit for Namo Bharatam.</p></div>
        </div>
        <div className="footer-lockup"><div><span className="brand-mark dark">न</span><span><strong>NAMO</strong><em>BHARATAM</em></span></div><span>2014—2026 / EDITION 01</span><div className="footer-socials"><Instagram size={16} /><Linkedin size={16} /><BookOpen size={16} /></div></div>
      </section>
    </main>
  );
}
