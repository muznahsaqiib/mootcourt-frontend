'use client';

/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function AboutPage() {
    const visionRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get('section');
        switch (section) {
            case 'vision':
                visionRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }, [searchParams]);

    const fadeUp = {
        hidden: { opacity: 0, y: 48 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };

    const teamMembers = [
        { name: 'Muznah Saqib', role: 'AI & Legal Systems Lead' },
    ];

    const highlights = [
        { icon: '⚖', label: 'AI Counsel & Judge', desc: 'Acts as opposing counsel, judge, and evaluator simultaneously.' },
        { icon: '🎙', label: 'Voice Interaction', desc: 'Real-time speech powered by STT & TTS pipelines.' },
        { icon: '🥽', label: 'Immersive VR', desc: 'Full courtroom environment built in Unity3D.' },
        { icon: '🌐', label: 'Global Scenarios', desc: 'Tailored legal cases with worldwide adaptability.' },
        { icon: '📊', label: 'Smart Evaluation', desc: 'Live rubric scoring and argument quality feedback.' },
        { icon: '🏛', label: 'Competition-Ready', desc: 'Designed for law education, training, and moots.' },
    ];

    return (
        <>
            <Head>
                <title>About | AI Powered MootCourt in VR</title>
                <meta name="description" content="Explore the AI Powered MootCourt in VR project — blending artificial intelligence, virtual reality, and legal education." />
                <meta name="keywords" content="AI, VR, MootCourt, legal education, virtual reality, argument evaluation, law training" />
            </Head>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;600;700&display=swap');

                .ap-body {
                    font-family: 'EB Garamond', Georgia, serif;
                    background: #fff;
                    color: #1c1917;
                    min-height: 100vh;
                }

                /* ── SHARED SECTION ── */
                .ap-section {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 96px 48px;
                    position: relative;
                    overflow: hidden;
                }
                .ap-section-inner {
                    max-width: 1000px;
                    width: 100%;
                    position: relative;
                    z-index: 1;
                }

                /* ── EYEBROW ── */
                .ap-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Cinzel', serif;
                    font-size: 12px;
                    letter-spacing: 5px;
                    color: #fda4af;
                    margin-bottom: 18px;
                    text-transform: uppercase;
                }
                .ap-eyebrow::before, .ap-eyebrow::after {
                    content: '';
                    width: 32px;
                    height: 1px;
                    background: #fecdd3;
                }

                /* ── HEADING ── */
                .ap-heading {
                    font-family: 'Cinzel', serif;
                    font-size: 48px;
                    font-weight: 700;
                    color: #9f1239;
                    text-align: center;
                    margin-bottom: 24px;
                    letter-spacing: 1px;
                    line-height: 1.15;
                }

                /* ── LEAD TEXT ── */
                .ap-lead {
                    font-size: 21px;
                    color: #57534e;
                    text-align: center;
                    line-height: 1.85;
                    max-width: 720px;
                    margin: 0 auto 16px;
                    font-style: italic;
                }
                .ap-body-text {
                    font-size: 20px;
                    color: #44403c;
                    text-align: center;
                    line-height: 1.9;
                    max-width: 720px;
                    margin: 0 auto;
                }

                /* ── DIVIDER ── */
                .ap-divider {
                    width: 64px;
                    height: 2px;
                    background: linear-gradient(90deg, #e11d48, #fb7185);
                    margin: 28px auto 48px;
                    border-radius: 2px;
                }

                /* ── VISION BG ── */
                .ap-vision-bg {
                    background: white;
                }
                .ap-vision-bg::before {
                    content: '⚖';
                    position: absolute;
                    font-size: 480px;
                    color: #e11d48;
                    opacity: 0.03;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    user-select: none;
                }

                /* ── ABOUT BG ── */
                .ap-about-bg {
                    background: #fff1f2;
                    border-top: 1px solid #fecdd3;
                    border-bottom: 1px solid #fecdd3;
                }

                /* ── CONTACT BG ── */
                .ap-contact-bg {
                    background: white;
                    border-top: 1px solid #fecdd3;
                }

                /* ── TEAM CARDS ── */
                .ap-team-grid {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    margin-top: 52px;
                }
                .ap-team-card {
                    max-width: 280px;
                    width: 100%;
                }
                .ap-team-card {
                    background: white;
                    border: 1px solid #fecdd3;
                    border-radius: 16px;
                    padding: 36px 28px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 2px 20px rgba(225,29,72,.07);
                    transition: transform .2s, box-shadow .2s;
                }
                .ap-team-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 32px rgba(225,29,72,.13);
                }
                .ap-team-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e11d48, #fb7185);
                }
                .ap-team-avatar {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #fecdd3, #fff1f2);
                    border: 2px solid #fecdd3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    font-size: 26px;
                }
                .ap-team-name {
                    font-family: 'Cinzel', serif;
                    font-size: 17px;
                    font-weight: 700;
                    color: #9f1239;
                    margin-bottom: 8px;
                    letter-spacing: .5px;
                }
                .ap-team-role {
                    font-size: 16px;
                    color: #78716c;
                    font-style: italic;
                }

                /* ── HIGHLIGHT GRID ── */
                .ap-highlight-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-top: 52px;
                }
                .ap-highlight-card {
                    background: white;
                    border: 1px solid #fecdd3;
                    border-radius: 14px;
                    padding: 28px 24px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 1px 12px rgba(225,29,72,.05);
                }
                .ap-highlight-icon {
                    font-size: 28px;
                    margin-bottom: 12px;
                }
                .ap-highlight-label {
                    font-family: 'Cinzel', serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: #9f1239;
                    margin-bottom: 8px;
                    letter-spacing: .5px;
                }
                .ap-highlight-desc {
                    font-size: 17px;
                    color: #57534e;
                    line-height: 1.7;
                }

                /* ── CONTACT CARDS ── */
                .ap-contact-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    margin-top: 48px;
                    max-width: 640px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .ap-contact-card {
                    background: #fff1f2;
                    border: 1px solid #fecdd3;
                    border-radius: 14px;
                    padding: 28px 24px;
                    text-align: center;
                    transition: transform .2s, box-shadow .2s;
                }
                .ap-contact-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 24px rgba(225,29,72,.1);
                }
                .ap-contact-card-icon {
                    font-size: 26px;
                    margin-bottom: 10px;
                    color: #e11d48;
                }
                .ap-contact-card-label {
                    font-family: 'Cinzel', serif;
                    font-size: 12px;
                    letter-spacing: 3px;
                    color: #fda4af;
                    margin-bottom: 8px;
                }
                .ap-contact-card-value {
                    font-size: 18px;
                    color: #9f1239;
                    text-decoration: none;
                    transition: color .15s;
                }
                .ap-contact-card-value:hover { color: #e11d48; }

                .ap-social-row {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 40px;
                }
                .ap-social-btn {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    background: white;
                    border: 1px solid #fecdd3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #9f1239;
                    font-size: 20px;
                    text-decoration: none;
                    transition: all .2s;
                    box-shadow: 0 2px 10px rgba(225,29,72,.08);
                }
                .ap-social-btn:hover {
                    background: #e11d48;
                    border-color: #e11d48;
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(225,29,72,.3);
                }

                @media (max-width: 768px) {
                    .ap-heading { font-size: 32px; }
                    .ap-team-grid, .ap-highlight-grid { grid-template-columns: 1fr; }
                    .ap-contact-grid { grid-template-columns: 1fr; }
                    .ap-section { padding: 72px 24px; }
                }
            `}</style>

            <div className="ap-body">

                {/* ══ OUR VISION ══ */}
                <motion.section
                    ref={visionRef}
                    className="ap-section ap-vision-bg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={stagger}
                >
                    <div className="ap-section-inner" style={{ textAlign: 'center' }}>
                        <motion.div variants={fadeUp} className="ap-eyebrow">Our Vision</motion.div>
                        <motion.h2 variants={fadeUp} className="ap-heading">
                            Revolutionizing Legal Education
                        </motion.h2>
                        <motion.div variants={fadeUp} className="ap-divider" />
                        <motion.p variants={fadeUp} className="ap-lead">
                            "Through Immersive Technology"
                        </motion.p>
                        <motion.p variants={fadeUp} className="ap-body-text">
                            We envision a future where legal training is accessible, interactive, and technologically advanced.
                            Our AI-Powered Moot Court in Virtual Reality project bridges the gap between theoretical law education
                            and practical courtroom experience — integrating AI-driven argument evaluation, dynamic judge simulation,
                            and immersive VR interactions. Our goal is to empower aspiring lawyers with confidence, analytical skills,
                            and real-time decision-making capabilities, making legal education engaging, effective, and globally competitive.
                        </motion.p>
                    </div>
                </motion.section>

                {/* ══ ABOUT US ══ */}
                <motion.section
                    ref={aboutRef}
                    className="ap-section ap-about-bg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={stagger}
                >
                    <div className="ap-section-inner">
                        <div style={{ textAlign: 'center' }}>
                            <motion.div variants={fadeUp} className="ap-eyebrow">About Us</motion.div>
                            <motion.h2 variants={fadeUp} className="ap-heading">
                                Blending AI, VR & Legal Expertise
                            </motion.h2>
                            <motion.div variants={fadeUp} className="ap-divider" />
                            <motion.p variants={fadeUp} className="ap-body-text">
                                We leverage fine-tuned LLMs, NLP task routing, and immersive VR to create an interactive
                                learning environment — transforming how students practice, learn, and excel in law.
                            </motion.p>
                        </div>

                        {/* Team */}
                        <motion.div variants={fadeUp} className="ap-team-grid">
                            {teamMembers.map((m, i) => (
                                <div key={i} className="ap-team-card">
                                    <div className="ap-team-avatar">⚖</div>
                                    <div className="ap-team-name">{m.name}</div>
                                    <div className="ap-team-role">{m.role}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Highlights */}
                        <motion.div variants={fadeUp} className="ap-highlight-grid">
                            {highlights.map((h, i) => (
                                <div key={i} className="ap-highlight-card">
                                    <div className="ap-highlight-icon">{h.icon}</div>
                                    <div className="ap-highlight-label">{h.label}</div>
                                    <div className="ap-highlight-desc">{h.desc}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* ══ CONTACT US ══ */}
                <motion.section
                    ref={contactRef}
                    className="ap-section ap-contact-bg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={stagger}
                >
                    <div className="ap-section-inner" style={{ textAlign: 'center' }}>
                        <motion.div variants={fadeUp} className="ap-eyebrow">Contact Us</motion.div>
                        <motion.h2 variants={fadeUp} className="ap-heading">
                            Get In Touch
                        </motion.h2>
                        <motion.div variants={fadeUp} className="ap-divider" />
                        <motion.p variants={fadeUp} className="ap-lead">
                            Collaborate, connect, or follow our journey.
                        </motion.p>

                        <motion.div variants={fadeUp} className="ap-contact-grid">
                            <div className="ap-contact-card">
                                <div className="ap-contact-card-icon"><i className="pi pi-envelope" /></div>
                                <div className="ap-contact-card-label">EMAIL</div>
                                <a href="mailto:aimootcourt2025@hotmail.com" className="ap-contact-card-value">
                                    aimootcourt2025@hotmail.com
                                </a>
                            </div>
                            <div className="ap-contact-card">
                                <div className="ap-contact-card-icon"><i className="pi pi-linkedin" /></div>
                                <div className="ap-contact-card-label">LINKEDIN</div>
                                <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="ap-contact-card-value">
                                    linkedin.com/in/your-linkedin
                                </a>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="ap-social-row">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="ap-social-btn">
                                <i className="pi pi-github" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ap-social-btn">
                                <i className="pi pi-twitter" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ap-social-btn">
                                <i className="pi pi-linkedin" />
                            </a>
                        </motion.div>
                    </div>
                </motion.section>

            </div>
        </>
    );
}