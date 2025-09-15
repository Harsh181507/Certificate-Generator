import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// Use public URL for static assets in CRA to avoid bundler import errors
const logoUrl = process.env.PUBLIC_URL + '/logo.png';

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      {/* <UseCasesCarousel /> */}

    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <img src={logoUrl} alt="CSI Logo" className="brand__logo" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
          <span className="brand__name">CSI Certificates</span>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header__cta">
          <a className="link" href="/login">Log in</a>
          <button className="btn btn--outline">Get Started</button>
        </div>
      </div>
      {/* texture removed intentionally */}
    </header>
  );
}

function UseCasesCarousel() {
  const labels = Array.from({ length: 8 }, (_, i) => `Event ${i + 1}`);
  const [images, setImages] = useState(Array.from({ length: 8 }, () => null));
  const trackRef = useRef(null);

  const onPick = (idx) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      const next = [...prev];
      if (next[idx] && next[idx].startsWith('blob:')) URL.revokeObjectURL(next[idx]);
      next[idx] = url;
      return next;
    });
  };

  const scrollByCard = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.usecard');
    const gap = 16; // must match CSS gap
    const width = card ? card.clientWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * width, behavior: 'smooth' });
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') scrollByCard(1);
      if (e.key === 'ArrowLeft') scrollByCard(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section className="usecases">
      <div className="container">
        <div className="usecases__header">
          <h2 className="usecases__title">Events Used In</h2>
          <br></br>
          <div className="carousel__navgroup">
            <button className="carousel__nav" aria-label="Previous" onClick={() => scrollByCard(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="carousel__nav" aria-label="Next" onClick={() => scrollByCard(1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <div className="carousel">
          <div className="carousel__viewport">
            <div className="carousel__track" ref={trackRef}>
              {labels.map((label, idx) => (
                <article key={idx} className="usecard">
                  <div className="usecard__media" style={images[idx] ? { backgroundImage: `url(${images[idx]})` } : undefined}>
                    <div className="usecard__label">{label}</div>
                    {!images[idx] && <div className="usecard__placeholder">Upload image</div>}
                    <input
                      id={`upload-${idx}`}
                      className="usecard__input"
                      type="file"
                      accept="image/*"
                      onChange={onPick(idx)}
                    />
                    <label className="usecard__upload" htmlFor={`upload-${idx}`}>Upload</label>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GradientPill({children}) {
  return (
    <div className="btn-wrapper">
      <button type="button" className="btn-core">{children}</button>
      <span className="btn-overlay bg-button-ghost-gradient"></span>
      <span className="pill-border"></span>
    </div>
  );
}

function LightGradientPill({children, href="#"}) {
  return (
    <div className="btn-wrapper btn-wrapper--light rounded-[40px]">
      <a className="btn-core btn-core--light" href={href}>{children}</a>
      <span className="btn-overlay bg-button-default-gradient"></span>
      <span className="pill-border pill-border--all"></span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero center">
      <div className="container hero__inner">
        {/* Device mockup above the headline (with fade-to-black) */}
        <div className="frame frame--device" aria-label="Device mockup placeholder">
          <div className="frame__caption">Device mockup frame — drop your screenshot here</div>
        </div>

        <h1 className="display">The era of one-click certificate generation</h1>
        <div className="cta-row">
          <LightGradientPill href="">Get Started</LightGradientPill>
          <GradientPill>How it Works</GradientPill>
        </div>
      </div>
    </section>
  );
}



