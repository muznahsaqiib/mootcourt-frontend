'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DASHBOARD_ROUTE } from '@/utils/routes.constant';

export default function EvaluationPage() {
    const router = useRouter();
    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        const dataStr = localStorage.getItem('latestEvaluation');
        if (!dataStr) { router.push(DASHBOARD_ROUTE); return; }
        try {
            setEvaluation(JSON.parse(dataStr));
        } catch {
            router.push(DASHBOARD_ROUTE);
        }
    }, [router]);

    if (!evaluation) {
        return (
            <>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;600;700&display=swap');
                    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
                `}</style>
                <div style={{
                    minHeight: '100vh', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: '#fff1f2', gap: 16,
                    fontFamily: "'EB Garamond', Georgia, serif",
                }}>
                    <span style={{ fontSize: 52, color: '#e11d48', animation: 'pulse 1.5s ease-in-out infinite' }}>⚖</span>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: '#fda4af', letterSpacing: 3 }}>
                        LOADING EVALUATION…
                    </span>
                </div>
            </>
        );
    }

    const { scores = {}, overall_feedback } = evaluation.evaluation || {};
    const scoreEntries = Object.entries(scores);
    const avgScore = scoreEntries.length
        ? (scoreEntries.reduce((s, [, d]) => s + (d?.score ?? 0), 0) / scoreEntries.length).toFixed(1)
        : null;

    const scoreColor = (s) => {
        if (s >= 8) return { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' };
        if (s >= 6) return { bg: '#fef9c3', text: '#ca8a04', border: '#fef08a' };
        return { bg: '#ffe4e6', text: '#e11d48', border: '#fecdd3' };
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;600;700&display=swap');

                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: #fff1f2; }
                ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 3px; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fillBar {
                    from { width: 0%; }
                    to   { width: var(--target-width); }
                }

                .eval-root {
                    min-height: 100vh;
                    background: #fff1f2;
                    font-family: 'EB Garamond', Georgia, serif;
                    color: #1c1917;
                    padding: 48px 32px 80px;
                }

                .eval-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                }

                /* ── Page header ── */
                .eval-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 40px;
                    padding-bottom: 28px;
                    border-bottom: 2px solid #fecdd3;
                    animation: fadeUp 0.5s ease both;
                }

                .eval-eyebrow {
                    font-family: 'Cinzel', serif;
                    font-size: 13px;         /* was 10px */
                    letter-spacing: 5px;
                    color: #fda4af;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .eval-eyebrow::before, .eval-eyebrow::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #fecdd3;
                    max-width: 40px;
                }

                .eval-title {
                    font-family: 'Cinzel', serif;
                    font-size: 36px;         /* was 30px */
                    font-weight: 700;
                    color: #9f1239;
                    letter-spacing: 1px;
                    line-height: 1.2;
                    margin: 0;
                }

                /* ── Score ring ── */
                .score-ring-wrap {
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }

                .score-ring {
                    width: 100px; height: 100px;  /* was 88x88 */
                    border-radius: 50%;
                    background: conic-gradient(#e11d48 0%, #e11d48 var(--pct), #fecdd3 var(--pct));
                    display: flex; align-items: center; justify-content: center;
                    position: relative;
                }

                .score-ring::before {
                    content: '';
                    position: absolute;
                    inset: 9px;
                    border-radius: 50%;
                    background: #fff1f2;
                }

                .score-ring-value {
                    position: relative; z-index: 1;
                    font-family: 'Cinzel', serif;
                    font-size: 28px;         /* was 22px */
                    font-weight: 700;
                    color: #9f1239;
                }

                .score-ring-label {
                    font-family: 'Cinzel', serif;
                    font-size: 12px;         /* was 9px */
                    letter-spacing: 3px;
                    color: #fda4af;
                    text-align: center;
                }

                /* ── Score cards grid ── */
                .scores-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 18px;
                    margin-bottom: 32px;
                }

                .score-card {
                    background: white;
                    border: 1px solid #fecdd3;
                    border-radius: 14px;
                    padding: 24px 26px 20px;
                    position: relative;
                    overflow: hidden;
                    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
                }

                .score-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e11d48, #fb7185);
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .score-card:hover { box-shadow: 0 8px 32px #e11d4814; transform: translateY(-2px); border-color: #fda4af; }
                .score-card:hover::before { opacity: 1; }

                .score-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 14px;
                    gap: 14px;
                }

                .score-criterion {
                    font-family: 'Cinzel', serif;
                    font-size: 16px;         /* was 12px */
                    font-weight: 700;
                    color: #9f1239;
                    letter-spacing: 1px;
                    line-height: 1.4;
                    flex: 1;
                }

                .score-badge {
                    flex-shrink: 0;
                    padding: 5px 14px;
                    border-radius: 20px;
                    font-family: 'Cinzel', serif;
                    font-size: 15px;         /* was 12px */
                    font-weight: 700;
                    letter-spacing: 1px;
                    border: 1px solid;
                }

                .score-bar-track {
                    height: 5px;
                    background: #ffe4e6;
                    border-radius: 3px;
                    margin-bottom: 14px;
                    overflow: hidden;
                }

                .score-bar-fill {
                    height: 100%;
                    border-radius: 3px;
                    background: linear-gradient(90deg, #fb7185, #e11d48);
                    animation: fillBar 0.8s ease both;
                    animation-delay: var(--delay);
                }

                .score-justification {
                    font-size: 19px;         /* was 16px */
                    color: #44403c;
                    line-height: 1.75;
                }

                /* ── Overall feedback box ── */
                .feedback-box {
                    background: white;
                    border: 1px solid #fecdd3;
                    border-radius: 14px;
                    padding: 30px 34px;
                    margin-bottom: 36px;
                    position: relative;
                    overflow: hidden;
                }

                .feedback-box::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 4px;
                    background: linear-gradient(180deg, #e11d48, #fb7185);
                    border-radius: 4px 0 0 4px;
                }

                .feedback-label {
                    font-family: 'Cinzel', serif;
                    font-size: 13px;         /* was 10px */
                    letter-spacing: 4px;
                    color: #fda4af;
                    margin-bottom: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .feedback-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #fecdd3;
                }

                .feedback-text {
                    font-size: 21px;         /* was 18px */
                    color: #1c1917;
                    line-height: 1.85;
                }

                /* ── Back button ── */
                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 36px;
                    border-radius: 8px;
                    border: none;
                    background: #e11d48;
                    color: white;
                    font-family: 'Cinzel', serif;
                    font-size: 16px;         /* was 13px */
                    font-weight: 700;
                    letter-spacing: 2px;
                    cursor: pointer;
                    transition: background 0.15s, box-shadow 0.15s, transform 0.15s;
                    box-shadow: 0 4px 16px #e11d4844;
                }

                .back-btn:hover { background: #be123c; box-shadow: 0 6px 24px #e11d4866; transform: translateY(-2px); }
                .back-btn:active { transform: translateY(0); }

                .empty-state {
                    text-align: center;
                    padding: 40px 0;
                    font-family: 'Cinzel', serif;
                    font-size: 16px;         /* was 13px */
                    color: #fda4af;
                    letter-spacing: 2px;
                }
            `}</style>

            <div className="eval-root">
                <div className="eval-inner">

                    {/* ── Header ── */}
                    <div className="eval-header">
                        <div className="eval-title-block">
                            <div className="eval-eyebrow">MOOTCOURT AI</div>
                            <h1 className="eval-title">Performance Evaluation</h1>
                        </div>

                        {avgScore && (
                            <div className="score-ring-wrap">
                                <div className="score-ring" style={{ '--pct': `${(parseFloat(avgScore) / 10) * 100}%` }}>
                                    <span className="score-ring-value">{avgScore}</span>
                                </div>
                                <span className="score-ring-label">AVG SCORE</span>
                            </div>
                        )}
                    </div>

                    {/* ── Score cards ── */}
                    {scoreEntries.length === 0 ? (
                        <div className="empty-state">No evaluation scores found.</div>
                    ) : (
                        <div className="scores-grid">
                            {scoreEntries.map(([criterion, data], i) => {
                                const sc = data?.score ?? 0;
                                const col = scoreColor(sc);
                                return (
                                    <div
                                        key={i}
                                        className="score-card"
                                        style={{ animation: `fadeUp 0.4s ease ${i * 0.07}s both` }}
                                    >
                                        <div className="score-card-top">
                                            <span className="score-criterion">{criterion}</span>
                                            <span className="score-badge" style={{ background: col.bg, color: col.text, borderColor: col.border }}>
                                                {sc} / 10
                                            </span>
                                        </div>

                                        <div className="score-bar-track">
                                            <div
                                                className="score-bar-fill"
                                                style={{
                                                    '--target-width': `${sc * 10}%`,
                                                    '--delay': `${0.3 + i * 0.07}s`,
                                                    width: `${sc * 10}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="score-justification">
                                            {data?.justification || 'No justification provided.'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* ── Overall feedback ── */}
                    {overall_feedback && (
                        <div className="feedback-box" style={{ animation: 'fadeUp 0.5s ease 0.3s both' }}>
                            <div className="feedback-label">OVERALL FEEDBACK</div>
                            <p className="feedback-text">{overall_feedback}</p>
                        </div>
                    )}

                    {/* ── Back button ── */}
                    <div style={{ animation: 'fadeUp 0.5s ease 0.45s both' }}>
                        <button className="back-btn" onClick={() => router.push(DASHBOARD_ROUTE)}>
                            ← BACK TO DASHBOARD
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}