'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Grid, ChevronDown, ArrowRight } from 'lucide-react';
import { Toast } from 'primereact/toast';
import LoginForm from '../app/login/LoginForm';
import RegisterForm from '../app/register/RegisterForm';
import { useRouter } from 'next/navigation';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from 'recharts';
import { DASHBOARD_ROUTE, HOME_ROUTE } from '../utils/routes.constant';
import BackgroundParticles from '../components/BackgroundParticles';

export default function HomePage() {
  const router = useRouter();
  const toast = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const aiRef = useRef(null);
  const vrRef = useRef(null);
  const demoRef = useRef(null);
  const moreRef = useRef(null);
  const productsRef = useRef(null);

  const scrollTo = (ref) => {
    setShowDropdown(false);
    setShowMoreDropdown(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'MootCourt AI - AI-Powered Moot Court Simulations for Legal Training';
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setShowMoreDropdown(false);
      if (productsRef.current && !productsRef.current.contains(e.target)) setShowDropdown(false);
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const rubricScores = [
    { subject: 'Legal Knowledge', A: 8, fullMark: 10 },
    { subject: 'Legal Application', A: 7, fullMark: 10 },
    { subject: 'Organization', A: 9, fullMark: 10 },
    { subject: 'Judge Interaction', A: 6, fullMark: 10 },
    { subject: 'Opponent Response', A: 4, fullMark: 5 },
    { subject: 'Delivery', A: 5, fullMark: 5 },
  ];

  const whyItems = [
    'Practice anytime — AI is available 24/7',
    'Instant feedback on your arguments, tone, and logic',
    'Smart, adaptive legal scenarios tailored to your skill level',
    'Scalable — coach dozens of students simultaneously at low cost',
    'Monitor improvement over time with AI analytics',
    'AI challenges your reasoning like a real bench',
    'Personalized rebuttal generation to sharpen your counter-arguments',
  ];

  const vrItems = [
    'Fully immersive courtroom environment using VR',
    'AI-generated arguments, objections, and judicial questioning',
    'Real-time speech-to-text transcription and analysis',
    'Customizable civil, criminal, and constitutional case simulations',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;600;700&display=swap');

        html { scroll-behavior: smooth; }
        body { font-family: 'EB Garamond', Georgia, serif; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%,100% { opacity:.04; }
          50%      { opacity:.07; }
        }

        .hp-fade { animation: fadeUp .6s ease both; }
        .hp-fade-2 { animation: fadeUp .6s ease .15s both; }
        .hp-fade-3 { animation: fadeUp .6s ease .3s both; }

        /* NAV */
        .hp-nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #fecdd3;
          box-shadow: 0 1px 12px rgba(225,29,72,.06);
        }
        .hp-logo {
          font-family: 'Cinzel', serif;
          font-size: 18px; font-weight: 700;
          color: #9f1239; letter-spacing: 2px;
          text-decoration: none; display: flex; align-items: center; gap: 8px;
        }
        .hp-nav-right { display:flex; align-items:center; gap:8px; }

        /* Nav ghost button */
        .hp-btn-ghost {
          display:flex; align-items:center; gap:6px;
          padding: 7px 14px; border-radius: 8px;
          border: 1px solid transparent; background: transparent;
          font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600;
          letter-spacing: 1.5px; color: #1c1917; cursor: pointer;
          transition: all .15s;
        }
        .hp-btn-ghost:hover { background:#fff1f2; border-color:#fecdd3; color:#9f1239; }

        /* Nav solid button */
        .hp-btn-solid {
          display:flex; align-items:center; gap:6px;
          padding: 8px 18px; border-radius: 8px; border:none;
          background:#e11d48; color:white;
          font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700;
          letter-spacing: 1.5px; cursor:pointer;
          box-shadow: 0 3px 12px rgba(225,29,72,.3);
          transition: all .15s;
        }
        .hp-btn-solid:hover { background:#be123c; transform:translateY(-1px); box-shadow: 0 5px 18px rgba(225,29,72,.4); }

        /* Dropdown */
        .hp-dropdown { position:relative; }
        .hp-dropdown-menu {
          position:absolute; top:calc(100% + 8px); right:0;
          min-width:170px; background:white;
          border:1px solid #fecdd3; border-radius:10px;
          box-shadow: 0 8px 24px rgba(225,29,72,.1);
          padding:6px; z-index:200;
          animation: fadeUp .15s ease;
        }
        .hp-dropdown-item {
          display:block; width:100%; padding:9px 14px; border-radius:6px;
          border:none; background:transparent; text-align:left;
          font-family: 'Cinzel', serif; font-size:11px; letter-spacing:1px;
          color:#1c1917; cursor:pointer; transition: all .12s;
        }
        .hp-dropdown-item:hover { background:#fff1f2; color:#9f1239; }

        /* HERO */
        .hp-hero {
          min-height: calc(100vh - 64px);
          display:flex; align-items:center; justify-content:center;
          text-align:center; padding: 80px 24px;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(254,205,211,.5) 0%, transparent 70%),
                      linear-gradient(180deg, #fff1f2 0%, #ffffff 55%);
          position:relative; overflow:hidden;
        }
        .hp-hero::before {
          content:'⚖'; position:absolute;
          font-size:500px; color:#e11d48;
          top:50%; left:50%; transform:translate(-50%,-50%);
          pointer-events:none; user-select:none;
          animation: shimmer 5s ease-in-out infinite;
        }
        .hp-hero-inner { max-width:700px; position:relative; z-index:1; }
        .hp-eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          font-family:'Cinzel',serif; font-size:11px;
          letter-spacing:4px; color:#e11d48; margin-bottom:20px;
        }
        .hp-eyebrow::before,.hp-eyebrow::after {
          content:''; width:28px; height:1px; background:#fda4af;
        }

        /* SECTION */
        .hp-section { padding: 88px 48px; border-top:1px solid #fecdd3; background:white; }
        .hp-section-alt { background:#fff1f2; }
        .hp-section-inner { max-width:1100px; margin:0 auto; }
        .hp-section-eyebrow {
          font-family:'Cinzel',serif; font-size:10px;
          letter-spacing:4px; color:#fda4af; text-align:center; margin-bottom:10px;
        }
        .hp-section-title {
          font-family:'Cinzel',serif; font-size:32px; font-weight:700;
          color:#9f1239; text-align:center; margin-bottom:14px;
        }
        .hp-section-lead {
          font-size:18px; color:#57534e; text-align:center;
          line-height:1.8; max-width:640px; margin:0 auto 52px;
        }

        /* STAT STRIP */
        .hp-stat {
          background:white; border-top:1px solid #fecdd3; border-bottom:1px solid #fecdd3;
          padding:20px 48px; display:flex; align-items:center; justify-content:center; gap:16px;
        }

        /* WHY GRID */
        .hp-why-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:stretch; }

        .hp-card {
          background:white; border:1px solid #fecdd3; border-radius:16px;
          padding:32px; position:relative; overflow:hidden;
          box-shadow: 0 2px 16px rgba(225,29,72,.06);
        }
        .hp-card::before {
          content:''; position:absolute; top:0; left:0; right:0;
          height:3px; background:linear-gradient(90deg,#e11d48,#fb7185);
        }
        .hp-card-title {
          font-family:'Cinzel',serif; font-size:18px; font-weight:700;
          color:#9f1239; margin-bottom:20px; letter-spacing:.5px;
        }
        .hp-why-list { list-style:none; display:flex; flex-direction:column; gap:12px; padding:0; margin:0; }
        .hp-why-list li {
          display:flex; align-items:flex-start; gap:10px;
          font-size:17px; color:#44403c; line-height:1.6;
        }
        .hp-why-list li::before {
          content:'⚖'; font-size:12px; color:#fda4af; flex-shrink:0; margin-top:4px;
        }

        /* VR GRID */
        .hp-vr-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
        .hp-vr-placeholder {
          aspect-ratio:16/9; border-radius:14px;
          background:linear-gradient(135deg,#ffe4e6,#fff1f2);
          border:2px dashed #fecdd3;
          display:flex; align-items:center; justify-content:center;
          font-family:'Cinzel',serif; font-size:12px; letter-spacing:2px; color:#fda4af;
          flex-direction:column; gap:12px;
        }
        .hp-vr-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:16px; }
        .hp-vr-list li { display:flex; align-items:flex-start; gap:12px; font-size:17px; color:#44403c; line-height:1.6; }
        .hp-vr-check {
          width:22px; height:22px; border-radius:50%;
          background:#dcfce7; border:1px solid #bbf7d0; color:#16a34a;
          display:flex; align-items:center; justify-content:center;
          font-size:11px; font-weight:700; flex-shrink:0; margin-top:2px;
        }

        /* DEMO */
        .hp-demo-box {
          aspect-ratio:16/9; max-width:780px; margin:0 auto;
          border-radius:16px; background:linear-gradient(135deg,#ffe4e6,#fff1f2);
          border:2px dashed #fecdd3;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
          font-family:'Cinzel',serif; font-size:12px; letter-spacing:2px; color:#fda4af;
        }
        .hp-demo-play {
          width:60px; height:60px; border-radius:50%;
          background:white; border:2px solid #fecdd3;
          display:flex; align-items:center; justify-content:center;
          font-size:22px; box-shadow:0 4px 16px rgba(225,29,72,.12);
        }

        /* MODAL */
        .hp-overlay {
          position:fixed; inset:0; z-index:500;
          background:rgba(255,241,242,.75); backdrop-filter:blur(10px);
          display:flex; align-items:center; justify-content:center;
          animation:fadeUp .2s ease;
        }
        .hp-modal {
          background:white; border:1px solid #fecdd3; border-radius:18px;
          padding:44px 48px; width:100%; max-width:460px; position:relative;
          box-shadow:0 24px 80px rgba(225,29,72,.14);
          animation:fadeUp .25s ease;
        }
        .hp-modal-close {
          position:absolute; top:14px; right:16px;
          width:30px; height:30px; border-radius:50%;
          border:1px solid #fecdd3; background:white;
          color:#9f1239; font-size:20px; cursor:pointer; line-height:1;
          display:flex; align-items:center; justify-content:center;
          transition:all .15s;
        }
        .hp-modal-close:hover { background:#fff1f2; border-color:#e11d48; }
        .hp-modal-title {
          font-family:'Cinzel',serif; font-size:20px; font-weight:700;
          color:#9f1239; text-align:center; margin-bottom:28px; letter-spacing:1px;
        }

        /* FOOTER */
        .hp-footer {
          background:#fff1f2; border-top:1px solid #fecdd3;
          padding:24px 48px;
        }
        .hp-footer-inner {
          max-width:1100px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
        }
        .hp-footer-copy {
          font-family:'Cinzel',serif; font-size:11px;
          letter-spacing:1.5px; color:#9f1239;
        }
        .hp-footer-links { display:flex; gap:14px; }
        .hp-footer-link { color:#be123c; font-size:17px; transition:color .15s; }
        .hp-footer-link:hover { color:#e11d48; }

        /* Hero primary button */
        .hp-hero-btn-primary {
          display:flex; align-items:center; gap:8px;
          padding:14px 32px; border-radius:8px; border:none;
          background:#e11d48; color:white;
          font-family:'Cinzel',serif; font-size:13px; font-weight:700;
          letter-spacing:2px; cursor:pointer;
          box-shadow:0 6px 24px rgba(225,29,72,.35);
          transition:all .15s;
        }
        .hp-hero-btn-primary:hover { background:#be123c; transform:translateY(-2px); box-shadow:0 8px 28px rgba(225,29,72,.45); }

        /* Hero secondary button */
        .hp-hero-btn-secondary {
          display:flex; align-items:center; gap:8px;
          padding:14px 32px; border-radius:8px;
          border:2px solid #fecdd3; background:white; color:#9f1239;
          font-family:'Cinzel',serif; font-size:13px; font-weight:700;
          letter-spacing:2px; cursor:pointer; transition:all .15s;
        }
        .hp-hero-btn-secondary:hover { border-color:#e11d48; background:#fff1f2; transform:translateY(-2px); }

        .hp-hero-title {
          font-family:'Cinzel',serif; font-size:42px; font-weight:700;
          color:#9f1239; line-height:1.2; margin-bottom:18px; letter-spacing:.5px;
        }
        .hp-hero-sub {
          font-size:19px; color:#57534e; line-height:1.75;
          margin-bottom:36px; font-style:italic;
        }

        @media(max-width:768px){
          .hp-nav { padding:0 20px; }
          .hp-hero-title { font-size:28px; }
          .hp-why-grid,.hp-vr-grid { grid-template-columns:1fr; }
          .hp-section { padding:60px 24px; }
          .hp-footer-inner { flex-direction:column; text-align:center; }
        }
      `}</style>

      <BackgroundParticles />
      <Toast ref={toast} />

      {/* ── Nav ── */}
      <nav className="hp-nav">
        <Link href={HOME_ROUTE} className="hp-logo">
          ⚖ MOOTCOURT AI
        </Link>

        <div className="hp-nav-right">

          {/* More dropdown */}
          <div className="hp-dropdown" ref={moreRef}>
            <button
              className="hp-btn-ghost"
              onClick={() => {
                setShowMoreDropdown((s) => !s);
                setShowDropdown(false);
              }}
            >
              More <ChevronDown size={14} />
            </button>
            {showMoreDropdown && (
              <div className="hp-dropdown-menu">
                <button className="hp-dropdown-item" onClick={() => { router.push('/about?section=vision'); setShowMoreDropdown(false); }}>Our Vision</button>
                <button className="hp-dropdown-item" onClick={() => { router.push('/about?section=about'); setShowMoreDropdown(false); }}>About Us</button>
                <button className="hp-dropdown-item" onClick={() => { router.push('/about?section=contact'); setShowMoreDropdown(false); }}>Contact Us</button>
              </div>
            )}
          </div>

          <button className="hp-btn-ghost" onClick={() => router.push(DASHBOARD_ROUTE)}>Dashboard</button>

          {/* Products dropdown */}
          <div className="hp-dropdown" ref={productsRef}>
            <button
              className="hp-btn-ghost"
              onClick={() => {
                setShowDropdown((s) => !s);
                setShowMoreDropdown(false);
              }}
            >
              <Grid size={14} /> Products <ChevronDown size={14} />
            </button>
            {showDropdown && (
              <div className="hp-dropdown-menu">
                <button className="hp-dropdown-item" onClick={() => scrollTo(aiRef)}>WEB AI MootCourt</button>
                <button className="hp-dropdown-item" onClick={() => scrollTo(vrRef)}>AI MootCourt in VR</button>
              </div>
            )}
          </div>

          <button className="hp-btn-solid" onClick={() => setShowRegisterModal(true)}>
            Register for Moots
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hp-hero">
        <div className="hp-hero-inner">
          <div className="hp-eyebrow hp-fade">AI-POWERED LEGAL TRAINING</div>
          <h1 className="hp-hero-title hp-fade-2">
            Elevate Your Legal Training with Intelligent Moot Court Simulations
          </h1>
          <p className="hp-hero-sub hp-fade-2">
            See how our AI-powered simulation can sharpen your legal skills in minutes.
          </p>
          <div className="hp-fade-3" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <button className="hp-hero-btn-primary" onClick={() => setShowLoginModal(true)}>
              <i className="pi pi-sign-in" /> Start Practicing Now
            </button>
            <button className="hp-hero-btn-secondary" onClick={() => scrollTo(demoRef)}>
              ▶ Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <div className="hp-stat">
        <span style={{ fontSize: 28 }}>🏆</span>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Cinzel',serif", color: '#9f1239' }}>200+ Landmark Cases</div>
          <div style={{ fontSize: 14, color: '#78716c', marginTop: 2 }}>Practice with real Pakistani court cases</div>
        </div>
      </div>

      {/* ── Why AI MootCourt ── */}
      <section ref={aiRef} className="hp-section">
        <div className="hp-section-inner">
          <div className="hp-section-eyebrow">WHY CHOOSE US</div>
          <h2 className="hp-section-title">Why AI Moot Court?</h2>
          <p className="hp-section-lead">A smarter way to train — available anytime, adaptive, and built for real results.</p>

          <div className="hp-why-grid">
            <div className="hp-card">
              <div className="hp-card-title">Platform Advantages</div>
              <ul className="hp-why-list">
                {whyItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="hp-card">
              <div className="hp-card-title">Sample Evaluation Score</div>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={rubricScores}>
                  <PolarGrid stroke="#fecdd3" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontFamily: "'EB Garamond',serif", fontSize: 13, fill: '#78716c' }} />
                  <Radar name="Score" dataKey="A" stroke="#e11d48" fill="#e11d48" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── VR ── */}
      <section ref={vrRef} className="hp-section hp-section-alt">
        <div className="hp-section-inner">
          <div className="hp-section-eyebrow">IMMERSIVE TRAINING</div>
          <h2 className="hp-section-title">AI MootCourt in VR</h2>
          <p className="hp-section-lead">
            Step into a virtual courtroom and argue your case in front of an AI-powered judge.
          </p>
          <div className="hp-vr-grid">
            <div className="hp-vr-placeholder">
              <span style={{ fontSize: 40 }}>🥽</span>
              VR COURTROOM PREVIEW
            </div>
            <ul className="hp-vr-list">
              {vrItems.map((item, i) => (
                <li key={i}><span className="hp-vr-check">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Demo ── */}
      <section ref={demoRef} className="hp-section">
        <div className="hp-section-inner">
          <div className="hp-section-eyebrow">SEE IT IN ACTION</div>
          <h2 className="hp-section-title">See MootCourt AI in Action</h2>
          <p className="hp-section-lead">Watch students engage in realistic courtroom simulations powered by AI.</p>
          <div className="hp-demo-box">
            <div className="hp-demo-play">▶</div>
            DEMO VIDEO COMING SOON
          </div>
        </div>
      </section>

      {/* ── Login Modal ── */}
      {showLoginModal && (
        <div className="hp-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="hp-modal" onClick={e => e.stopPropagation()}>
            <button className="hp-modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <div className="hp-modal-title">Login</div>
            <LoginForm toast={toast} onSuccess={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      {/* ── Register Modal ── */}
      {showRegisterModal && (
        <div className="hp-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="hp-modal" onClick={e => e.stopPropagation()}>
            <button className="hp-modal-close" onClick={() => setShowRegisterModal(false)}>×</button>
            <div className="hp-modal-title">Register</div>
            <RegisterForm toast={toast} onSuccess={() => { setShowRegisterModal(false); setShowLoginModal(true); }} />
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <span className="hp-footer-copy">© {new Date().getFullYear()} MOOT AI. ALL RIGHTS RESERVED.</span>
          <div className="hp-footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hp-footer-link"><i className="pi pi-github" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hp-footer-link"><i className="pi pi-twitter" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hp-footer-link"><i className="pi pi-linkedin" /></a>
          </div>
        </div>
      </footer>
    </>
  );
}