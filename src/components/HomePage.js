'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Grid, ChevronDown } from 'lucide-react';
import { Toast } from 'primereact/toast';
import LoginForm from '../app/login/LoginForm';
import RegisterForm from '../app/register/RegisterForm';
import { useRouter } from 'next/navigation';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import styles from '../app/styles/styles';
import { DASHBOARD_ROUTE,HOME_ROUTE} from '../utils/routes.constant';

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

  const scrollTo = (ref) => {
    setShowDropdown(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    document.title = "MootCourt AI - AI-Powered Moot Court Simulations for Legal Training";
  }, []);

  const rubricScores = [
    { subject: 'Legal Knowledge', A: 8, fullMark: 10 },
    { subject: 'Legal Application', A: 7, fullMark: 10 },
    { subject: 'Organization', A: 9, fullMark: 10 },
    { subject: 'Judge Interaction', A: 6, fullMark: 10 },
    { subject: 'Opponent Response', A: 4, fullMark: 5 },
    { subject: 'Delivery', A: 5, fullMark: 5 },
  ];

  return (
    <>
      <BackgroundParticles/>
      <div className={`${styles.container} relative z-10`}>

      
      <Toast ref={toast} />

      <nav className={styles.navbar}>
        <Link href={HOME_ROUTE} className={styles.logo}>
          ⚖️
        </Link>
        
        <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                className={styles.dropdownBtn}
              >
                <i className="pi pi-ellipsis-h mr-2"></i> More <ChevronDown size={16} />
              </button>

              {showMoreDropdown && (
                <div className={styles.dropdownMenu}>
                  <button onClick={() => router.push('/about?section=vision')} className={styles.dropdownItem}>
                    Our Vision
                  </button>
                  <button onClick={() => router.push('/about?section=about')} className={styles.dropdownItem}>
                    About Us
                  </button>
                  <button onClick={() => router.push('/about?section=contact')} className={styles.dropdownItem}>
                    Contact Us
                  </button>

                </div>
              )}
            </div>



          <button onClick={() => router.push(DASHBOARD_ROUTE)} className={styles.secondaryBtn}>
            Dashboard
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={styles.dropdownBtn}
            >
              <Grid size={16} /> Products <ChevronDown size={16} />
            </button>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button onClick={() => scrollTo(aiRef)} className={styles.dropdownItem}>
                  WEB AI MootCourt
                </button>
                <button onClick={() => scrollTo(vrRef)} className={styles.dropdownItem}>
                  AI MootCourt in VR
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowRegisterModal(true)}
            className={styles.secondaryBtn}
          >
            <i className="pi pi-user mr-2" />
            <span>Register for Moots</span>
          </button>
        </div>
      </nav>

      <main className={styles.heromain}>
        <div className="max-w-2xl w-full">
          <p className={styles.heroTitle}>
            Elevate Your Legal Training with Intelligent Moot Court Simulations
          </p>

            <p className={styles.heroSubtext}>
              See how our AI-powered simulation can sharpen your legal skills in minutes.
            </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className={styles.primaryBtn}
            >
              <i className="pi pi-sign-in mr-2" />
              <span>Start Practicing now</span>
            </button>
            <button
              onClick={() => scrollTo(demoRef)}
              className={styles.secondaryBtn}
            >
              ▶ Watch Demo
            </button>
          </div>
        </div>
      </main>
      <section className="bg-white py-10 px-4 flex justify-center">
        <div
          className={styles.box}
        >
          <div className="text-yellow-500 text-3xl">🏆</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">200+ Landmark Cases</h3>
            <p className="text-gray-600 text-sm">Practice with real Pakistani court cases</p>
          </div>
        </div>
      </section>

      <section ref={aiRef} className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
          <div className={styles.evaluationBox}>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Why AI Moot Court?</h2>
            <ul className={styles.evaluationItem}>
              <li>Practice anytime — AI is available 24/7</li>
              <li>Instant feedback on your arguments, tone, and logic</li>
              <li>Smart, adaptive legal scenarios tailored to your skill level</li>
              <li>Scalable — coach dozens of students simultaneously at low cost</li>
              <li>Monitor improvement over time with AI analytics</li>
              <li>AI challenges your reasoning like a real bench</li>
              <li>Personalized rebuttal generation to sharpen your counter-arguments</li>
            </ul>
          </div>

          <div className={styles.chartBox}>
            <h4 className="text-xl font-semibold text-center text-neutral-900 mb-6">
              Evaluation Score Chart
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={rubricScores}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#9f1239"
                  fill="#f43f5e"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      <section ref={vrRef} className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI MootCourt in VR</h2>
          <p className="text-gray-600 text-lg mb-10">
            Step into a virtual courtroom and argue your case in front of an AI-powered judge. Experience immersive legal training
            like never before—designed for law students, educators, and professionals seeking practical courtroom skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className={styles.vrImg}>
              <span className="text-gray-500 text-lg">VR Courtroom Preview</span>
            </div>
            <ul className="text-left text-gray-700 space-y-4 text-lg">
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                Fully immersive courtroom environment using VR
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                AI-generated arguments, objections, and judicial questioning
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                Real-time speech-to-text transcription and analysis
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                Customizable civil, criminal, and constitutional case simulations
              </li>
              
            </ul>
          </div>
        </div>
      </section>

      <section ref={demoRef} className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">See MootCourt AI in Action</h2>
          <p className="text-gray-600 text-lg mb-10">
            Watch a live walkthrough of how students engage in realistic courtroom simulations powered by AI.
          </p>

          <div className={styles.demoBox}>
            <span className="text-gray-500 text-lg">Demo Video Coming Soon</span>
          </div>
        </div>
      </section>

      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button
              onClick={() => setShowLoginModal(false)}
              className={styles.modalClose}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Login</h2>
            <LoginForm
              toast={toast}
              onSuccess={() => setShowLoginModal(false)}
            />
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button
              onClick={() => setShowRegisterModal(false)}
              className={styles.modalClose}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">Register</h2>
            <RegisterForm
              toast={toast}
              onSuccess={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }}
            />
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <div className={styles.footer_div}>
          <div className={styles.footer_items }>
            <div className="text-sm">&copy; {new Date().getFullYear()} Moot AI. All rights reserved.</div>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition">
                <i className="pi pi-github text-lg" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition">
                <i className="pi pi-twitter text-lg" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition">
                <i className="pi pi-linkedin text-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
