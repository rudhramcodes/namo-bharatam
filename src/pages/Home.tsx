import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronRight, ExternalLink, Menu, X } from "lucide-react";

type Domain = "all" | "digital" | "infrastructure" | "space" | "people" | "climate" | "world";
const imagePaths = { moon: "/images/chandrayaan.jpg", rail: "/images/namo-rail.png", upi: "/images/upi-hd.jpg", hero: "/images/pmindia/modi-hero.jpg", detail: "/images/pmindia/modi-roundtable-detail.jpg", wide: "/images/pmindia/modi-roundtable-wide.jpg", semicon: "/images/pmindia/semicon-exhibition.jpg", roundtable: "/images/pmindia/semicon-roundtable.jpg", quoteCard: "/images/pmindia/brics-quote.png", upiNpc: "https://www.npci.org.in/uploads/Mask_group_4_2725352ef6.webp", upiRecord: "/images/upi-august-2026-record.png", speech: "/images/pmindia/speech-video.jpg" };
const chapters = ["Overview", "Systems", "Archive", "Voices", "Sources"];
const domains: { id: Domain; label: string }[] = [
  { id: "all", label: "All chapters" }, { id: "digital", label: "Digital India" }, { id: "infrastructure", label: "Build & move" },
  { id: "space", label: "Space & science" }, { id: "people", label: "People first" }, { id: "world", label: "The world" },
];
const timeline = [
  { year: "2014", domain: "digital" as Domain, tag: "Access", title: "A platform for a billion", body: "Jan Dhan begins a financial inclusion push designed to bring a bank account, identity and a path to credit within reach.", source: "https://pmjdy.gov.in/" },
  { year: "2016", domain: "digital" as Domain, tag: "DPI", title: "The interface becomes public", body: "UPI launches a common layer for instant payments, turning a complex banking network into a simple everyday action.", source: "https://www.npci.org.in/what-we-do/upi/product-overview" },
  { year: "2018", domain: "people" as Domain, tag: "Health", title: "Coverage at national scale", body: "Ayushman Bharat establishes a new architecture for public health cover, moving care from the edge of policy toward the centre of daily life.", source: "https://pmjay.gov.in/" },
  { year: "2020", domain: "people" as Domain, tag: "Response", title: "A country learns to coordinate", body: "Co-WIN and the vaccine rollout show a public digital system being used as a living coordination layer during a crisis.", source: "https://www.cowin.gov.in/" },
  { year: "2023", domain: "space" as Domain, tag: "ISRO · 23 Aug", title: "The Moon’s south polar region", body: "Chandrayaan-3 soft-lands on 23 August. India becomes the first country to land in the Moon’s southern high latitudes.", source: "https://www.isro.gov.in/Chandrayaan3_Details.html" },
  { year: "2023", domain: "infrastructure" as Domain, tag: "RRTS · 20 Oct", title: "Namo Bharat opens to passengers", body: "The priority section between Sahibabad and Duhai Depot begins operations, adding a new layer of regional connectivity.", source: "https://ncrtc.in/" },
  { year: "2023", domain: "world" as Domain, tag: "G20 · 09 Sep", title: "A declaration without a footnote", body: "The New Delhi G20 Leaders’ Declaration is adopted by consensus, with the African Union welcomed as a permanent member.", source: "https://www.g20.org/en/" },
  { year: "2024", domain: "space" as Domain, tag: "ISRO · 06 Jan", title: "Eyes on the Sun", body: "Aditya-L1 reaches its halo orbit around the Sun–Earth L1 point, beginning continuous observation of space weather.", source: "https://www.isro.gov.in/Aditya_L1.html" },
  { year: "2026", domain: "world" as Domain, tag: "Current · 03 Sep", title: "The record stays open", body: "The next chapter is still being written. This edition freezes the public record at September 2026 and leaves room for evidence.", source: "https://www.pmindia.gov.in/en/" },
];
const quotes = [
  { quote: "India is on the Moon. We have our national pride placed on the Moon.", meta: "Prime Minister Narendra Modi · 26 Aug 2023", source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1952360" },
  { quote: "Today, India's first rapid rail service, Namo Bharat Train has begun.", meta: "Prime Minister Narendra Modi · 20 Oct 2023", source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1969356" },
  { quote: "India's solar revolution will be scripted in golden letters.", meta: "Prime Minister Narendra Modi · 16 Sep 2024", source: "https://www.pmindia.gov.in/en/news_updates/pm-inaugurates-4th-global-renewable-energy-investors-meet-and-expo-re-invest-in-gandhinagar-gujarat/" },
];
function LinkOut({ href, children }: { href: string; children: React.ReactNode }) { return <a className="link-out" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} /></a>; }
export default function Home() {
  const [activeDomain, setActiveDomain] = useState<Domain>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => activeDomain === "all" ? timeline : timeline.filter((item) => item.domain === activeDomain), [activeDomain]);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  useEffect(() => {
    const anime = (window as any).anime;
    if (!anime) return;
    anime.timeline({ easing: "easeOutExpo" }).add({ targets: ".intro-label, .intro-meta", opacity: [0, 1], translateY: [12, 0], duration: 600, delay: anime.stagger(70) }).add({ targets: ".intro-title .word", opacity: [0, 1], translateY: [50, 0], duration: 900, delay: anime.stagger(100) }, "-=350").add({ targets: ".intro-copy, .intro-actions", opacity: [0, 1], translateY: [18, 0], duration: 650 }, "-=500");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); if (anime) anime({ targets: entry.target, opacity: [0, 1], translateY: [22, 0], duration: 720, easing: "easeOutCubic" }); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <main className="new-shell">
    <header className="new-nav"><button className="new-brand" onClick={() => go("top")}><span className="brand-mark">NB</span><span>Namo Bharatam <small>/ public index</small></span></button><nav>{chapters.map((item, i) => <button key={item} onClick={() => go(["top", "systems", "archive", "voices", "sources"][i])}>{item}</button>)}</nav><button className="nav-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button></header>
    {menuOpen && <div className="new-mobile-menu">{chapters.map((item, i) => <button key={item} onClick={() => go(["top", "systems", "archive", "voices", "sources"][i])}><span>0{i + 1}</span>{item}<ChevronRight size={18}/></button>)}</div>}
    <section id="top" className="intro-section"><div className="intro-grid"><div className="intro-main"><p className="intro-label">A public record / 2014—2026</p><h1 className="intro-title"><span className="word">India,</span><span className="word accent-word">in motion.</span></h1><p className="intro-copy">A clear-eyed index of the systems, missions and everyday shifts that changed how a billion lives connect, move and imagine what comes next.</p><div className="intro-actions"><button className="primary-action" onClick={() => go("systems")}>Start with the systems <ArrowDownRight size={17}/></button><span className="intro-meta">9 chapters · 12 years · primary sources</span></div></div><div className="intro-image"><img src={imagePaths.hero} alt="Prime Minister Narendra Modi chairs a semiconductor roundtable at Seva Teerth, New Delhi"/></div></div></section>
    <section id="systems" className="systems-section">
      <div className="section-head" data-reveal>
        <div>
          <p className="eyebrow">01 / The overview</p>
          <h2>Progress is<br/><em>an ecosystem.</em></h2>
        </div>
        <p className="section-intro">
          The headline moments are only the visible layer. Underneath is a stack of public infrastructure—accounts, payments, networks, satellites and institutions—designed to make movement possible at scale.
        </p>
      </div>

      <div className="system-landscape-stack">
        {/* Screen 01: Digital Public Infrastructure */}
        <article className="system-landscape-screen" data-reveal>
          <div className="system-media-wrap">
            <img
              className="system-landscape-media"
              src={imagePaths.upi}
              alt="Digital public infrastructure and UPI payments"
              onError={(e) => { e.currentTarget.src = "/images/upi.jpg"; }}
            />
            <div className="system-landscape-overlay" />
          </div>
          <div className="system-landscape-content">
            <div className="landscape-badge">
              <span className="badge-dot" />
              <span>01 / Digital public infrastructure</span>
            </div>
            <h3 className="landscape-title">One tap<br/><em>at a time.</em></h3>
            <p className="landscape-copy">Identity, accounts and instant payments made access feel less like a programme and more like a daily habit.</p>
            <div className="landscape-actions">
              <LinkOut href="https://www.npci.org.in/what-we-do/upi/product-overview">Explore UPI</LinkOut>
              <LinkOut href="https://youtu.be/QqTFVUIKoZI?si=ltIVVJkQMA8C2Uzm">Watch film</LinkOut>
            </div>
          </div>
        </article>

        {/* Screen 02: Connectivity */}
        <article className="system-landscape-screen" data-reveal>
          <div className="system-media-wrap">
            <video
              className="system-landscape-media"
              src="/videos/namo-bharat-train.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="system-landscape-overlay" />
          </div>
          <div className="system-landscape-content">
            <div className="landscape-badge">
              <span className="badge-dot" />
              <span>02 / Connectivity</span>
            </div>
            <h3 className="landscape-title">Build<br/><em>forward.</em></h3>
            <p className="landscape-copy">Regional rail, roads and logistics turn distance into a design problem with a public answer.</p>
            <div className="landscape-actions">
              <LinkOut href="https://ncrtc.in/">Explore Namo Bharat</LinkOut>
            </div>
          </div>
        </article>

        {/* Screen 03: The measure */}
        <article className="system-landscape-screen" data-reveal>
          <div className="system-media-wrap">
            <video
              className="system-landscape-media"
              src="/videos/UPI.mp4"
              poster="/videos/upi-thumb.jpg"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="system-landscape-overlay" />
          </div>
          <div className="system-landscape-content">
            <div className="landscape-badge">
              <span className="badge-dot" />
              <span>03 / The measure</span>
            </div>
            <div className="landscape-metric">
              <strong className="metric-number">24.51B</strong>
              <span className="metric-caption">UPI transactions<br/>August 2026 · NPCI data</span>
            </div>
            <div className="landscape-actions">
              <LinkOut href="https://www.npci.org.in/product/upi/product-statistics">View NPCI statistics</LinkOut>
            </div>
          </div>
        </article>
      </div>
    </section>
    <section id="archive" className="archive-section"><div className="section-head archive-head" data-reveal><div><p className="eyebrow">02 / The archive</p><h2>Dates that<br/><em>changed the line.</em></h2></div><p className="section-intro dark">A deliberately curated timeline. Each entry points outward to the originating institution so the story stays open to verification.</p></div><div className="filter-row" role="tablist">{domains.map((domain) => <button key={domain.id} className={activeDomain === domain.id ? "filter active" : "filter"} onClick={() => setActiveDomain(domain.id)}>{domain.label}</button>)}</div><div className="archive-list">{filtered.map((item, i) => <article className="archive-item" data-reveal key={`${item.year}-${item.title}`}><div className="archive-year"><strong>{item.year}</strong><span>{String(i + 1).padStart(2, "0")}</span></div><div className="archive-rule"/><div className="archive-content"><p className="card-index">{item.tag}</p><h3>{item.title}</h3><p>{item.body}</p><LinkOut href={item.source}>Read primary source</LinkOut></div><ArrowUpRight className="archive-arrow" size={19}/></article>)}</div></section>
    <section id="voices" className="voices-section"><div className="section-head voice-head" data-reveal><div><p className="eyebrow">03 / The voices</p><h2>Words become<br/><em>infrastructure.</em></h2></div><p className="section-intro">Public ambition is often heard before it is seen. These statements framed moments when an idea became a programme, a policy or a shared horizon.</p></div><div className="quote-grid">{quotes.map((item, i) => <blockquote key={item.quote} data-reveal><span className="quote-no">0{i + 1}</span><p>“{item.quote}”</p><footer>{item.meta}<LinkOut href={item.source}>Source</LinkOut></footer></blockquote>)}</div></section>
    <section className="official-section"><div className="official-head" data-reveal><div><p className="eyebrow">04 / The PM India archive</p><h2>Public work,<br/><em>in the frame.</em></h2></div><p className="section-intro dark">Selected official images, quote cards and video references from the Prime Minister of India archive. The source stays visible, so the visual record remains accountable.</p></div><div className="official-grid" data-reveal><figure className="official-image feature-official"><img src={imagePaths.semicon} alt="PM visits the SEMICON India 2026 exhibition at Yashobhoomi, New Delhi"/><figcaption><span>Photo gallery</span><strong>Semiconductor India 2026</strong><small>17 September 2026 · PM India</small></figcaption></figure><figure className="official-image"><img src={imagePaths.detail} alt="Prime Minister Narendra Modi chairs a semiconductor roundtable with leading CEOs"/><figcaption><span>Photo gallery</span><strong>A roundtable for the next layer</strong><small>16 September 2026 · PM India</small></figcaption></figure><figure className="official-quote"><img src={imagePaths.quoteCard} alt="Official PM India quote card from the BRICS Business Forum 2026"/><figcaption><span>Info quote</span><strong>Ideas travel as images, too.</strong><small>11 September 2026 · PM India</small></figcaption></figure><a className="official-video" href="https://www.pmindia.gov.in/en/speeches/" target="_blank" rel="noreferrer"><img src={imagePaths.speech} alt="PM India speech video thumbnail"/><span className="play-dot">▶</span><div><span>Speeches / video archive</span><strong>Watch the public record speak</strong><small>Open PM India speeches →</small></div></a></div></section>
    <section className="film-section"><div className="film-layout" data-reveal><div className="film-media"><img src={imagePaths.moon} alt="Moon surface from the Chandrayaan mission"/><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=PLPPKwCCueQ_CGgXjbfUoegMewEz4J2R9H&mute=1&controls=1&rel=0" title="Chandrayaan-3 landing archive" allow="encrypted-media; picture-in-picture" allowFullScreen/></div><div className="film-copy"><p className="eyebrow">04 / The moving image</p><h2>Watch a nation<br/><em>look up.</em></h2><p>The Chandrayaan-3 landing telecast is a piece of public memory. Keep the controls, the source and the moment in the same frame.</p><LinkOut href="https://www.youtube.com/@isroofficial5866/search?query=Chandrayaan%203">Open ISRO film archive</LinkOut></div></div></section>
    <section id="sources" className="sources-section"><div className="sources-head" data-reveal><p className="eyebrow">05 / The sources</p><h2>Keep the record<br/><em>open.</em></h2><p>This page is a visual editorial, not a verdict. It selects public milestones across 2014—September 2026, links outward to primary institutions and leaves room for scrutiny, correction and the next chapter.</p></div><div className="source-grid" data-reveal><div><p className="card-index">A / Primary registries</p><LinkOut href="https://www.pmindia.gov.in/en/">Prime Minister’s Office</LinkOut><LinkOut href="https://www.isro.gov.in/">ISRO</LinkOut><LinkOut href="https://www.npci.org.in/">NPCI / UPI</LinkOut><LinkOut href="https://ncrtc.in/">NCRTC</LinkOut></div><div><p className="card-index">B / Context</p><LinkOut href="https://www.niti.gov.in/">NITI Aayog</LinkOut><LinkOut href="https://www.g20.org/en/">G20 India</LinkOut><LinkOut href="https://unfccc.int/">UNFCCC</LinkOut><LinkOut href="https://www.mohfw.gov.in/">Ministry of Health</LinkOut></div><div><p className="card-index">C / Editorial note</p><p className="method-copy">Dates follow the calendar standard of each originating institution where available. Metrics are intentionally restrained. Where the public record is ongoing, the copy says so.</p></div></div><footer className="new-footer"><span>NB / Namo Bharatam</span><span>Public index · edition 01 · 2014—2026</span><button onClick={() => go("top")}>Back to top <ArrowUpRight size={14}/></button></footer></section>
  </main>;
}
