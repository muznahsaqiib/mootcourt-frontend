'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

import InputControls from './components/InputControls';
import OralControls from './components/OralControls';

import { useAIFight } from './hooks/useAIFight';
import useCaseDetails from '../../dashboard/case/[id]/useCaseDetails';
import { DASHBOARD_ROUTE, EVALUATION_ROUTE } from '../../../utils/routes.constant';

// ─── Courtroom SVG Scene ──────────────────────────────────────────────────────
function CourtroomScene({ nextTurn, judgeQuestion, loading }) {
  const petitionerActive = nextTurn?.includes('PETITIONER');
  const respondentActive = nextTurn?.includes('RESPONDENT');

  return (
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff1f2" /><stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fecdd3" /><stop offset="100%" stopColor="#fda4af" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" /><stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="judgeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe4e6" /><stop offset="100%" stopColor="#fecdd3" />
        </linearGradient>
        <linearGradient id="colGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fecdd3" /><stop offset="40%" stopColor="#fda4af" /><stop offset="100%" stopColor="#fecdd3" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="softGlow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <pattern id="wood" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#fecdd3" />
          <line x1="0" y1="5" x2="20" y2="4" stroke="#fda4af" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="12" x2="20" y2="11" stroke="#fb7185" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Wall & Floor */}
      <rect x="0" y="0" width="900" height="340" fill="url(#wallGrad)" />
      <rect x="0" y="260" width="900" height="80" fill="url(#floorGrad)" />
      {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840].map(x => (
        <rect key={x} x={x} y="260" width="60" height="40" fill="none" stroke="#fda4af" strokeWidth="0.5" opacity="0.4" />
      ))}

      {/* Wall panels */}
      <rect x="50" y="10" width="800" height="200" fill="#fff1f2" rx="2" opacity="0.6" />
      <rect x="80" y="25" width="740" height="170" fill="none" stroke="#fda4af" strokeWidth="1" opacity="0.5" />

      {/* Emblem */}
      <circle cx="450" cy="80" r="38" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
      <circle cx="450" cy="80" r="30" fill="none" stroke="#e11d48" strokeWidth="0.5" opacity="0.4" />
      <text x="450" y="72" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="bold">⚖</text>
      <text x="450" y="92" textAnchor="middle" fill="#e11d48" fontSize="7" letterSpacing="2" opacity="0.7">FIAT JUSTITIA</text>

      {/* Columns */}
      {[160, 350, 550, 740].map(x => (
        <g key={x}>
          <rect x={x - 10} y="15" width="20" height="240" fill="url(#colGrad)" />
          <rect x={x - 12} y="12" width="24" height="8" fill="#fda4af" />
          <rect x={x - 12} y="248" width="24" height="8" fill="#fda4af" />
        </g>
      ))}

      {/* Judge bench */}
      <rect x="280" y="120" width="340" height="12" fill="#fda4af" rx="1" />
      <rect x="270" y="132" width="360" height="90" fill="url(#judgeGrad)" rx="2" />
      <rect x="270" y="132" width="360" height="4" fill="#fecdd3" />
      <rect x="280" y="140" width="340" height="75" fill="url(#wood)" opacity="0.6" rx="1" />
      <rect x="280" y="140" width="340" height="75" fill="none" stroke="#fda4af" strokeWidth="1" rx="1" />
      {[300, 410, 520].map(x => (
        <rect key={x} x={x} y="150" width="80" height="55" fill="none" stroke="#fda4af" strokeWidth="0.8" rx="1" opacity="0.5" />
      ))}

      {/* Judge figure */}
      <ellipse cx="450" cy="155" rx="28" ry="42" fill="#9f1239" />
      <rect x="428" y="165" width="44" height="30" fill="#881337" rx="2" />
      <rect x="440" y="158" width="20" height="14" fill="#f0ead6" rx="1" />
      <line x1="450" y1="158" x2="450" y2="172" stroke="#d4c9a8" strokeWidth="0.8" />
      <ellipse cx="450" cy="136" rx="14" ry="15" fill="#d4a96a" />
      <ellipse cx="450" cy="126" rx="18" ry="10" fill="#e8e0d0" />
      <ellipse cx="435" cy="134" rx="8" ry="12" fill="#e8e0d0" />
      <ellipse cx="465" cy="134" rx="8" ry="12" fill="#e8e0d0" />
      {[-12, -6, 0, 6, 12].map(ox => (<ellipse key={ox} cx={450 + ox} cy="120" rx="4" ry="5" fill="#ddd5c0" />))}
      <circle cx="445" cy="135" r="1.5" fill="#3b1a1a" /><circle cx="455" cy="135" r="1.5" fill="#3b1a1a" />
      <rect x="468" y="158" width="16" height="5" fill="#fda4af" rx="1" />
      <rect x="471" y="153" width="10" height="8" fill="#fecdd3" rx="1" />
      {loading && <ellipse cx="450" cy="155" rx="35" ry="50" fill="#e11d48" opacity="0.06" filter="url(#softGlow)" />}
      {loading && (
        <circle cx="450" cy="155" r="45" fill="none" stroke="#e11d48" strokeWidth="1" opacity="0.35">
          <animate attributeName="r" values="45;55;45" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Judge speech bubble */}
      {judgeQuestion && (
        <g>
          <rect x="490" y="105" width="200" height="54" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
          <polygon points="490,128 476,134 490,140" fill="#fff1f2" stroke="#e11d48" strokeWidth="1" />
          <foreignObject x="498" y="111" width="184" height="42">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '9px', color: '#881337', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
              {judgeQuestion}
            </div>
          </foreignObject>
        </g>
      )}

      {/* Petitioner table */}
      <rect x="60" y="220" width="220" height="45" fill="url(#deskGrad)" rx="3" />
      <rect x="60" y="220" width="220" height="5" fill="#fda4af" rx="2" />
      <rect x="70" y="228" width="200" height="30" fill="url(#wood)" opacity="0.5" rx="1" />
      <rect x="75" y="265" width="8" height="20" fill="#fecdd3" />
      <rect x="257" y="265" width="8" height="20" fill="#fecdd3" />
      <rect x="90" y="224" width="40" height="28" fill="#fff1f2" transform="rotate(-3,110,238)" rx="1" />
      <rect x="95" y="226" width="40" height="28" fill="#ffe4e6" transform="rotate(2,115,240)" rx="1" />

      {/* Petitioner figure */}
      <ellipse cx="170" cy="210" rx="22" ry="36" fill={petitionerActive ? "#166534" : "#1e3a5f"} />
      <rect x="153" y="218" width="34" height="26" fill={petitionerActive ? "#14532d" : "#1e3a5f"} rx="2" />
      <rect x="161" y="212" width="18" height="12" fill="#f0ead6" rx="1" />
      <line x1="170" y1="212" x2="170" y2="224" stroke="#d4c9a8" strokeWidth="0.7" />
      <ellipse cx="170" cy="194" rx="12" ry="13" fill="#d4a96a" />
      <ellipse cx="170" cy="186" rx="15" ry="8" fill="#e8e0d0" />
      <ellipse cx="158" cy="192" rx="6" ry="10" fill="#e8e0d0" />
      <ellipse cx="182" cy="192" rx="6" ry="10" fill="#e8e0d0" />
      {[-8, -3, 2, 7, 12].map(ox => (<ellipse key={ox} cx={163 + ox} cy="182" rx="3.5" ry="4" fill="#ddd5c0" />))}
      <circle cx="166" cy="194" r="1.2" fill="#3b1a1a" /><circle cx="174" cy="194" r="1.2" fill="#3b1a1a" />
      {petitionerActive && <line x1="183" y1="215" x2="200" y2="200" stroke="#166534" strokeWidth="8" strokeLinecap="round" />}
      {petitionerActive && <ellipse cx="170" cy="210" rx="30" ry="42" fill="#22c55e" opacity="0.1" filter="url(#softGlow)" />}
      <text x="170" y="283" textAnchor="middle" fill={petitionerActive ? "#16a34a" : "#9f1239"} fontSize="8" letterSpacing="1.5" fontWeight="bold">PETITIONER</text>
      {petitionerActive && <circle cx="170" cy="272" r="4" fill="#22c55e" opacity="0.8" filter="url(#glow)" />}

      {/* Respondent table */}
      <rect x="620" y="220" width="220" height="45" fill="url(#deskGrad)" rx="3" />
      <rect x="620" y="220" width="220" height="5" fill="#fda4af" rx="2" />
      <rect x="630" y="228" width="200" height="30" fill="url(#wood)" opacity="0.5" rx="1" />
      <rect x="625" y="265" width="8" height="20" fill="#fecdd3" />
      <rect x="807" y="265" width="8" height="20" fill="#fecdd3" />
      <rect x="760" y="224" width="40" height="28" fill="#fff1f2" transform="rotate(3,780,238)" rx="1" />
      <rect x="755" y="226" width="40" height="28" fill="#ffe4e6" transform="rotate(-2,775,240)" rx="1" />

      {/* Respondent figure */}
      <ellipse cx="730" cy="210" rx="22" ry="36" fill={respondentActive ? "#7f1d1d" : "#1e3a5f"} />
      <rect x="713" y="218" width="34" height="26" fill={respondentActive ? "#7f1d1d" : "#1e3a5f"} rx="2" />
      <rect x="721" y="212" width="18" height="12" fill="#f0ead6" rx="1" />
      <line x1="730" y1="212" x2="730" y2="224" stroke="#d4c9a8" strokeWidth="0.7" />
      <ellipse cx="730" cy="194" rx="12" ry="13" fill="#c4956a" />
      <ellipse cx="730" cy="186" rx="15" ry="8" fill="#e8e0d0" />
      <ellipse cx="718" cy="192" rx="6" ry="10" fill="#e8e0d0" />
      <ellipse cx="742" cy="192" rx="6" ry="10" fill="#e8e0d0" />
      {[-8, -3, 2, 7, 12].map(ox => (<ellipse key={ox} cx={723 + ox} cy="182" rx="3.5" ry="4" fill="#ddd5c0" />))}
      <circle cx="726" cy="194" r="1.2" fill="#3b1a1a" /><circle cx="734" cy="194" r="1.2" fill="#3b1a1a" />
      {respondentActive && <line x1="717" y1="215" x2="700" y2="200" stroke="#7f1d1d" strokeWidth="8" strokeLinecap="round" />}
      {respondentActive && <ellipse cx="730" cy="210" rx="30" ry="42" fill="#ef4444" opacity="0.1" filter="url(#softGlow)" />}
      <text x="730" y="283" textAnchor="middle" fill={respondentActive ? "#dc2626" : "#9f1239"} fontSize="8" letterSpacing="1.5" fontWeight="bold">RESPONDENT</text>
      {respondentActive && <circle cx="730" cy="272" r="4" fill="#ef4444" opacity="0.8" filter="url(#glow)" />}

      {/* Overhead lights */}
      {[200, 450, 700].map(x => (
        <g key={x}>
          <rect x={x - 2} y="0" width="4" height="20" fill="#fda4af" />
          <ellipse cx={x} cy="22" rx="20" ry="6" fill="#fecdd3" />
          <ellipse cx={x} cy="22" rx="16" ry="4" fill="#e11d48" opacity="0.15" filter="url(#softGlow)" />
        </g>
      ))}
    </svg>
  );
}

// ─── Turn Badge ───────────────────────────────────────────────────────────────
function TurnBadge({ nextTurn, loading }) {
  const MAP = {
    PETITIONER_ARGUMENT: { text: 'PETITIONER — OPENING', color: '#16a34a' },
    PETITIONER_REPLY_TO_JUDGE: { text: 'PETITIONER — REPLY TO JUDGE', color: '#16a34a' },
    PETITIONER_REBUTTAL: { text: 'PETITIONER — REBUTTAL', color: '#16a34a' },
    RESPONDENT_RAG: { text: 'RESPONDENT — ARGUING', color: '#dc2626' },
    SESSION_END: { text: 'SESSION CONCLUDED', color: '#e11d48' },
    AWAITING_END: { text: 'REBUTTAL SUBMITTED', color: '#be123c' },
  };
  const info = MAP[nextTurn] || { text: 'AWAITING SESSION', color: '#9f1239' };
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 18px', borderRadius: 20,
      border: `2px solid ${info.color}55`,
      background: `${info.color}12`,
    }}>
      <span style={{
        width: 9, height: 9, borderRadius: '50%',
        background: info.color,
        boxShadow: `0 0 8px ${info.color}`,
        animation: loading ? 'pulse 1s infinite' : 'none',
        display: 'inline-block', flexShrink: 0,
      }} />
      <span style={{
        color: info.color, fontSize: 13, letterSpacing: 2,
        fontWeight: 700, fontFamily: "'Cinzel',serif",
      }}>
        {loading ? 'PROCESSING…' : info.text}
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AIFightCourtroom() {
  const router = useRouter();
  const { id } = useParams();
  const [userInput, setUserInput] = useState('');
  const [mode, setMode] = useState('text');
  const { caseType } = useCaseDetails(id);

  const {
    sessionId, transcript, loading, error, nextTurn, judgeQuestion,
    initiateMoot, submitUserTurn, submitOralTurn, endMootSession, stopAudio,
  } = useAIFight();

  const [showEndModal, setShowEndModal] = useState(false);
  const [evaluationReady, setEvaluationReady] = useState(false);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    if (id && caseType && !sessionId) initiateMoot(id, caseType).catch(console.error);
  }, [id, caseType, sessionId, initiateMoot]);

  useEffect(() => {
    if (nextTurn === 'SESSION_END' || nextTurn === 'AWAITING_END') stopAudio();
  }, [nextTurn, stopAudio]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    await submitUserTurn(userInput);
    setUserInput('');
  };

  const handleEndSession = async () => {
    try {
      const data = await endMootSession();
      if (data) {
        localStorage.setItem('latestEvaluation', JSON.stringify(data));
        setShowEndModal(true);
        setEvaluationReady(true);
        return;
      }
    } catch (err) {
      console.error('End session error:', err);
    }
    const existing = localStorage.getItem('latestEvaluation');
    if (existing) { setShowEndModal(true); setEvaluationReady(true); }
  };

  const ROLE_STYLE = {
    petitioner: { color: '#16a34a', label: 'PETITIONER' },
    respondent: { color: '#dc2626', label: 'RESPONDENT' },
    judge: { color: '#be123c', label: 'JUDGE' },
    system: { color: '#9f1239', label: 'COURT' },
    evaluation: { color: '#2563eb', label: 'EVALUATION' },
  };

  const safeTranscript = Array.isArray(transcript) ? transcript : [];
  const placeholder = judgeQuestion ? 'Reply to the judge…' : `Your turn: ${nextTurn || '…'}`;

  /* ── shared button styles ── */
  const btnBase = { cursor: 'pointer', fontFamily: "'Cinzel',serif", transition: 'all 0.15s', letterSpacing: 2 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Cinzel:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #fff1f2; }
        ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        textarea::placeholder { color: #fda4af; font-style: italic; }
        textarea:focus { outline: none; border-color: #e11d48 !important; }
      `}</style>

      <div style={{
        width: '100vw', height: '100vh',
        background: '#fff1f2',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'EB Garamond', Georgia, serif",
        color: '#1c1917',
      }}>

        {/* ── Header ── */}
        <div style={{
          height: 68, flexShrink: 0,
          background: '#fff1f2',
          borderBottom: '2px solid #fecdd3',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          boxShadow: '0 2px 12px #fecdd388',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: '#e11d48', fontSize: 28 }}>⚖</span>
            <span style={{
              fontFamily: "'Cinzel',serif", fontSize: 19,
              color: '#9f1239', letterSpacing: 3, fontWeight: 700,
            }}>
              MOOT COURT PROCEEDINGS
            </span>
          </div>

          <TurnBadge nextTurn={nextTurn} loading={loading} />

          <div style={{ display: 'flex', gap: 10 }}>
            {['text', 'oral'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                ...btnBase,
                padding: '9px 22px', borderRadius: 8,
                border: `2px solid ${mode === m ? '#e11d48' : '#fecdd3'}`,
                background: mode === m ? '#ffe4e6' : 'white',
                color: mode === m ? '#be123c' : '#9f1239',
                fontSize: 13, fontWeight: 700,
              }}>
                {m === 'text' ? '✍  WRITTEN' : '🎙  ORAL'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

          {/* Scene panel */}
          <div style={{
            flex: '0 0 56%', display: 'flex', flexDirection: 'column',
            borderRight: '2px solid #fecdd3',
            background: '#fff1f2',
          }}>
            <div style={{ flex: 1, padding: '8px 8px 0', minHeight: 0, display: 'flex', alignItems: 'stretch' }}>
              <CourtroomScene nextTurn={nextTurn} judgeQuestion={judgeQuestion} loading={loading} />
            </div>
            {/* Footer strip */}
            <div style={{
              padding: '8px 24px',
              borderTop: '2px solid #fecdd3',
              background: '#ffe4e6',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              {[
                `CASE NO. ${id ? String(id).slice(-8).toUpperCase() : '—'}`,
                caseType ? String(caseType).toUpperCase() : 'CIVIL',
                new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
              ].map((t, i) => (
                <span key={i} style={{
                  fontSize: 12, color: '#9f1239', letterSpacing: 2,
                  fontFamily: "'Cinzel',serif", fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Record panel */}
          <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', background: 'white' }}>

            {/* Panel header */}
            <div style={{
              padding: '15px 22px',
              borderBottom: '2px solid #fecdd3',
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#fff1f2',
            }}>
              <div style={{ width: 3, height: 20, background: '#e11d48', borderRadius: 2 }} />
              <span style={{
                fontFamily: "'Cinzel',serif", fontSize: 15,
                color: '#9f1239', letterSpacing: 4, fontWeight: 700,
              }}>
                COURT RECORD
              </span>
            </div>

            {/* Transcript */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', background: 'white' }}>
              {safeTranscript.length === 0 ? (
                <div style={{
                  height: '100%', display: 'flex',
                  flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 12,
                }}>
                  <span style={{ fontSize: 44, opacity: 0.1, color: '#e11d48' }}>⚖</span>
                  <span style={{
                    fontSize: 13, color: '#fda4af',
                    letterSpacing: 3, fontFamily: "'Cinzel',serif",
                  }}>
                    AWAITING PROCEEDINGS
                  </span>
                </div>
              ) : safeTranscript.map((entry, i) => {
                const s = ROLE_STYLE[entry.role] || ROLE_STYLE.system;
                return (
                  <div key={i} style={{
                    marginBottom: 20,
                    animation: 'fadeIn 0.3s ease',
                    paddingLeft: 14,
                    borderLeft: `3px solid ${s.color}44`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        letterSpacing: 2.5, color: s.color,
                        fontFamily: "'Cinzel',serif",
                      }}>
                        {s.label}
                      </span>
                      <span style={{ fontSize: 13, color: '#fda4af' }}>
                        {entry.timestamp
                          ? new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                          : ''}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 17, lineHeight: 1.75,
                      color: entry.role === 'evaluation' ? '#2563eb' : '#1c1917',
                      whiteSpace: 'pre-wrap',
                    }}>
                      {entry.text}
                    </p>
                  </div>
                );
              })}
              <div ref={transcriptEndRef} />
            </div>

            {/* Input area */}
            {sessionId && nextTurn !== 'SESSION_END' && (
              <div style={{
                borderTop: '2px solid #fecdd3',
                padding: '16px 18px',
                background: '#fff1f2',
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {mode === 'text' ? (
                      <>
                        <textarea
                          value={userInput}
                          onChange={e => setUserInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                          placeholder={placeholder}
                          disabled={loading}
                          rows={3}
                          style={{
                            width: '100%', padding: '13px 16px',
                            background: 'white',
                            border: '2px solid #fecdd3',
                            borderRadius: 8,
                            color: '#1c1917',
                            fontSize: 16, lineHeight: 1.65,
                            fontFamily: "'EB Garamond', Georgia, serif",
                            resize: 'none',
                            opacity: loading ? 0.5 : 1,
                            transition: 'border-color 0.15s',
                          }}
                        />
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button
                            onClick={handleSubmit}
                            disabled={loading || !userInput.trim()}
                            style={{
                              ...btnBase,
                              flex: 1, padding: '11px',
                              borderRadius: 8,
                              border: 'none',
                              background: loading || !userInput.trim() ? '#fecdd3' : '#e11d48',
                              color: loading || !userInput.trim() ? '#fda4af' : 'white',
                              fontSize: 13, fontWeight: 700,
                              cursor: loading || !userInput.trim() ? 'not-allowed' : 'pointer',
                              opacity: loading || !userInput.trim() ? 0.6 : 1,
                              boxShadow: loading || !userInput.trim() ? 'none' : '0 4px 12px #e11d4844',
                            }}
                          >
                            SUBMIT ARGUMENT
                          </button>
                          <button
                            onClick={() => setUserInput('')}
                            disabled={loading}
                            style={{
                              ...btnBase,
                              padding: '11px 20px', borderRadius: 8,
                              border: '2px solid #fecdd3', background: 'white',
                              color: '#9f1239', fontSize: 13,
                            }}
                          >
                            CLEAR
                          </button>
                        </div>
                      </>
                    ) : (
                      <OralControls sessionId={sessionId} nextTurn={nextTurn} submitOralTurn={submitOralTurn} />
                    )}
                  </div>

                  <button
                    onClick={handleEndSession}
                    style={{
                      ...btnBase,
                      padding: '0 18px', borderRadius: 8,
                      border: '2px solid #fecdd3', background: 'white',
                      color: '#dc2626', fontSize: 12, fontWeight: 700,
                      flexShrink: 0, alignSelf: 'stretch', lineHeight: 1.4,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.background = '#fff1f2'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#fecdd3'; e.currentTarget.style.background = 'white'; }}
                  >
                    END<br />SESSION
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error toast */}
        {error && (
          <div style={{
            position: 'fixed', bottom: 24, right: 24,
            background: 'white', border: '2px solid #dc2626',
            color: '#dc2626', padding: '14px 20px',
            borderRadius: 10, fontSize: 14, maxWidth: 360,
            zIndex: 100, animation: 'fadeIn 0.3s ease',
            fontFamily: "'Cinzel',serif",
            boxShadow: '0 8px 24px #dc262622',
          }}>
            <strong>⚠ ERROR</strong> — {error.message || String(error)}
          </div>
        )}

        {/* End modal */}
        {showEndModal && (
          <div style={{
            position: 'fixed', inset: 0,
            background: 'rgba(255,241,242,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 200, backdropFilter: 'blur(6px)',
          }}>
            <div style={{
              background: 'white',
              border: '2px solid #fecdd3',
              borderRadius: 16, padding: '48px 56px',
              maxWidth: 460, width: '90%', textAlign: 'center',
              boxShadow: '0 24px 80px #e11d4822',
            }}>
              <div style={{ fontSize: 44, marginBottom: 16, color: '#e11d48' }}>⚖</div>
              <h2 style={{
                fontFamily: "'Cinzel',serif", fontSize: 22,
                color: '#9f1239', letterSpacing: 3, marginBottom: 14,
              }}>
                SESSION CONCLUDED
              </h2>
              <p style={{ fontSize: 16, color: '#9f1239', lineHeight: 1.75, marginBottom: 36, opacity: 0.7 }}>
                The proceedings have been recorded.<br />Review your evaluation or return to the dashboard.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                {evaluationReady && (
                  <button
                    onClick={() => router.push(`${EVALUATION_ROUTE}?session_id=${sessionId}`)}
                    style={{
                      ...btnBase,
                      padding: '13px 28px', borderRadius: 8,
                      border: 'none', background: '#e11d48',
                      color: 'white', fontSize: 13, fontWeight: 700,
                      boxShadow: '0 4px 16px #e11d4844',
                    }}
                  >
                    VIEW EVALUATION
                  </button>
                )}
                <button
                  onClick={() => router.push(DASHBOARD_ROUTE)}
                  style={{
                    ...btnBase,
                    padding: '13px 28px', borderRadius: 8,
                    border: '2px solid #fecdd3', background: 'white',
                    color: '#9f1239', fontSize: 13, fontWeight: 700,
                  }}
                >
                  DASHBOARD
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}