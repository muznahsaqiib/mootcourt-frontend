'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

import OralControls from './components/OralControls';
import { useAIFight } from './hooks/useAIFight';
import useCaseDetails from '../../dashboard/case/[id]/useCaseDetails';
import { DASHBOARD_ROUTE, EVALUATION_ROUTE } from '../../../utils/routes.constant';

// ─── Courtroom SVG Scene ──────────────────────────────────────────────────────
function CourtroomScene({ nextTurn, judgeQuestion, loading }) {
  const petitionerActive = nextTurn?.includes('PETITIONER');
  const respondentActive = nextTurn?.includes('RESPONDENT');

  return (
    <svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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

      <rect x="0" y="0" width="900" height="340" fill="url(#wallGrad)" />
      <rect x="0" y="260" width="900" height="80" fill="url(#floorGrad)" />
      {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840].map(x => (
        <rect key={x} x={x} y="260" width="60" height="40" fill="none" stroke="#fda4af" strokeWidth="0.5" opacity="0.4" />
      ))}
      <rect x="50" y="10" width="800" height="200" fill="#fff1f2" rx="2" opacity="0.6" />
      <rect x="80" y="25" width="740" height="170" fill="none" stroke="#fda4af" strokeWidth="1" opacity="0.5" />

      <circle cx="450" cy="80" r="38" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
      <circle cx="450" cy="80" r="30" fill="none" stroke="#e11d48" strokeWidth="0.5" opacity="0.4" />
      <text x="450" y="72" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="bold">⚖</text>
      <text x="450" y="92" textAnchor="middle" fill="#e11d48" fontSize="7" letterSpacing="2" opacity="0.7">FIAT JUSTITIA</text>

      {[160, 350, 550, 740].map(x => (
        <g key={x}>
          <rect x={x - 10} y="15" width="20" height="240" fill="url(#colGrad)" />
          <rect x={x - 12} y="12" width="24" height="8" fill="#fda4af" />
          <rect x={x - 12} y="248" width="24" height="8" fill="#fda4af" />
        </g>
      ))}

      <rect x="280" y="120" width="340" height="12" fill="#fda4af" rx="1" />
      <rect x="270" y="132" width="360" height="90" fill="url(#judgeGrad)" rx="2" />
      <rect x="280" y="140" width="340" height="75" fill="url(#wood)" opacity="0.6" rx="1" />
      <rect x="280" y="140" width="340" height="75" fill="none" stroke="#fda4af" strokeWidth="1" rx="1" />

      <ellipse cx="450" cy="155" rx="28" ry="42" fill="#9f1239" />
      <rect x="428" y="165" width="44" height="30" fill="#881337" rx="2" />
      <rect x="440" y="158" width="20" height="14" fill="#f0ead6" rx="1" />
      <ellipse cx="450" cy="136" rx="14" ry="15" fill="#d4a96a" />
      <ellipse cx="450" cy="126" rx="18" ry="10" fill="#e8e0d0" />
      <ellipse cx="435" cy="134" rx="8" ry="12" fill="#e8e0d0" />
      <ellipse cx="465" cy="134" rx="8" ry="12" fill="#e8e0d0" />
      <circle cx="445" cy="135" r="1.5" fill="#3b1a1a" /><circle cx="455" cy="135" r="1.5" fill="#3b1a1a" />
      {loading && (
        <circle cx="450" cy="155" r="45" fill="none" stroke="#e11d48" strokeWidth="1" opacity="0.35">
          <animate attributeName="r" values="45;55;45" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {judgeQuestion && (
        <g>
          <rect x="490" y="105" width="200" height="54" rx="8" fill="white" stroke="#fecdd3" strokeWidth="1.5" />
          <polygon points="490,128 476,134 490,140" fill="white" stroke="#fecdd3" strokeWidth="1" />
          <foreignObject x="498" y="111" width="184" height="42">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '9px', color: '#881337', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
              {judgeQuestion}
            </div>
          </foreignObject>
        </g>
      )}

      {/* Petitioner */}
      <rect x="60" y="220" width="220" height="45" fill="url(#deskGrad)" rx="3" />
      <rect x="70" y="228" width="200" height="30" fill="url(#wood)" opacity="0.5" rx="1" />
      <ellipse cx="170" cy="210" rx="22" ry="36" fill={petitionerActive ? "#166534" : "#1e3a5f"} />
      <rect x="153" y="218" width="34" height="26" fill={petitionerActive ? "#14532d" : "#1e3a5f"} rx="2" />
      <ellipse cx="170" cy="194" rx="12" ry="13" fill="#d4a96a" />
      <ellipse cx="170" cy="186" rx="15" ry="8" fill="#e8e0d0" />
      {petitionerActive && <ellipse cx="170" cy="210" rx="30" ry="42" fill="#22c55e" opacity="0.1" filter="url(#softGlow)" />}
      <text x="170" y="283" textAnchor="middle" fill={petitionerActive ? "#16a34a" : "#9f1239"} fontSize="8" letterSpacing="1.5" fontWeight="bold">PETITIONER</text>
      {petitionerActive && <circle cx="170" cy="272" r="4" fill="#22c55e" opacity="0.8" filter="url(#glow)" />}

      {/* Respondent */}
      <rect x="620" y="220" width="220" height="45" fill="url(#deskGrad)" rx="3" />
      <rect x="630" y="228" width="200" height="30" fill="url(#wood)" opacity="0.5" rx="1" />
      <ellipse cx="730" cy="210" rx="22" ry="36" fill={respondentActive ? "#7f1d1d" : "#1e3a5f"} />
      <rect x="713" y="218" width="34" height="26" fill={respondentActive ? "#7f1d1d" : "#1e3a5f"} rx="2" />
      <ellipse cx="730" cy="194" rx="12" ry="13" fill="#c4956a" />
      <ellipse cx="730" cy="186" rx="15" ry="8" fill="#e8e0d0" />
      {respondentActive && <ellipse cx="730" cy="210" rx="30" ry="42" fill="#ef4444" opacity="0.1" filter="url(#softGlow)" />}
      <text x="730" y="283" textAnchor="middle" fill={respondentActive ? "#dc2626" : "#9f1239"} fontSize="8" letterSpacing="1.5" fontWeight="bold">RESPONDENT</text>
      {respondentActive && <circle cx="730" cy="272" r="4" fill="#ef4444" opacity="0.8" filter="url(#glow)" />}

      {[200, 450, 700].map(x => (
        <g key={x}>
          <rect x={x - 2} y="0" width="4" height="20" fill="#fda4af" />
          <ellipse cx={x} cy="22" rx="20" ry="6" fill="#fecdd3" />
        </g>
      ))}
    </svg>
  );
}

// ─── Turn Badge ───────────────────────────────────────────────────────────────
function TurnBadge({ nextTurn, loading }) {
  const MAP = {
    PETITIONER_ARGUMENT: { text: 'Petitioner — Opening', color: '#16a34a' },
    PETITIONER_REPLY_TO_JUDGE: { text: 'Petitioner — Reply to Judge', color: '#16a34a' },
    PETITIONER_REBUTTAL: { text: 'Petitioner — Rebuttal', color: '#16a34a' },
    RESPONDENT_RAG: { text: 'Respondent — Arguing', color: '#dc2626' },
    SESSION_END: { text: 'Session Concluded', color: '#be123c' },
    AWAITING_END: { text: 'Rebuttal Submitted', color: '#be123c' },
  };
  const info = MAP[nextTurn] || { text: 'Awaiting Session', color: '#9f1239' };
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold"
      style={{ borderColor: `${info.color}44`, background: `${info.color}10`, color: info.color }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: info.color, boxShadow: `0 0 6px ${info.color}`, animation: loading ? 'pulse 1s infinite' : 'none' }} />
      {loading ? 'Processing…' : info.text}
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
        setShowEndModal(true); setEvaluationReady(true); return;
      }
    } catch (err) { console.error(err); }
    if (localStorage.getItem('latestEvaluation')) { setShowEndModal(true); setEvaluationReady(true); }
  };

  const ROLE_STYLE = {
    petitioner: { color: '#16a34a', label: 'Petitioner' },
    respondent: { color: '#dc2626', label: 'Respondent' },
    judge: { color: '#9f1239', label: 'Judge' },
    system: { color: '#78716c', label: 'Court' },
    evaluation: { color: '#2563eb', label: 'Evaluation' },
  };

  const safeTranscript = Array.isArray(transcript) ? transcript : [];

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #fff1f2; }
        ::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 2px; }
        textarea:focus { outline: none; }
      `}</style>

      <div className="w-screen h-screen flex flex-col overflow-hidden bg-rose-50 text-stone-800">

        {/* ── Header ── */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-6
          bg-white border-b border-rose-100 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-rose-600 text-2xl">⚖</span>
            <span className="font-semibold text-stone-800 text-base tracking-wide">
              Moot Court Proceedings
            </span>
          </div>

          <TurnBadge nextTurn={nextTurn} loading={loading} />

          <div className="flex gap-2">
            {['text', 'oral'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${mode === m
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white text-stone-600 border-rose-200 hover:border-rose-400 hover:text-rose-700'
                  }`}>
                {m === 'text' ? '✍ Written' : '🎙 Oral'}
              </button>
            ))}
          </div>
        </header>

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Scene panel */}
          <div className="flex-[0_0_56%] flex flex-col border-r border-rose-100 bg-rose-50">
            <div className="flex-1 p-2 min-h-0 flex">
              <CourtroomScene nextTurn={nextTurn} judgeQuestion={judgeQuestion} loading={loading} />
            </div>
            <div className="flex justify-between items-center px-6 py-2 bg-white border-t border-rose-100">
              <span className="text-xs text-stone-400 font-medium">
                Case #{id ? String(id).slice(-8).toUpperCase() : '—'}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {caseType || 'Civil'}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Record panel */}
          <div className="flex-[0_0_44%] flex flex-col bg-white">

            {/* Panel header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-rose-100 bg-rose-50">
              <div className="w-1 h-5 bg-rose-500 rounded-full" />
              <span className="text-sm font-semibold text-stone-700 tracking-wide">Court Record</span>
            </div>

            {/* Transcript */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {safeTranscript.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <span className="text-4xl opacity-10 text-rose-600">⚖</span>
                  <span className="text-sm text-stone-400 tracking-wide">Awaiting proceedings…</span>
                </div>
              ) : safeTranscript.map((entry, i) => {
                const s = ROLE_STYLE[entry.role] || ROLE_STYLE.system;
                return (
                  <div key={i} className="mb-5 pl-3 border-l-2"
                    style={{ borderColor: `${s.color}44`, animation: 'fadeIn 0.3s ease' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold tracking-wide" style={{ color: s.color }}>
                        {s.label}
                      </span>
                      {entry.timestamp && (
                        <span className="text-xs text-stone-300">
                          {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap"
                      style={{ color: entry.role === 'evaluation' ? '#2563eb' : undefined }}>
                      {entry.text}
                    </p>
                  </div>
                );
              })}
              <div ref={transcriptEndRef} />
            </div>

            {/* Input area */}
            {sessionId && nextTurn !== 'SESSION_END' && (
              <div className="border-t border-rose-100 p-4 bg-rose-50">
                <div className="flex gap-3 items-stretch">
                  <div className="flex-1 flex flex-col gap-2">
                    {mode === 'text' ? (
                      <>
                        <textarea
                          value={userInput}
                          onChange={e => setUserInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                          placeholder={judgeQuestion ? 'Reply to the judge…' : 'Enter your argument…'}
                          disabled={loading}
                          rows={3}
                          className="w-full px-4 py-3 bg-white border border-rose-200 rounded-lg
                            text-sm text-stone-800 leading-relaxed resize-none
                            placeholder:text-rose-300 placeholder:italic
                            focus:border-rose-500 disabled:opacity-50 transition-colors"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSubmit}
                            disabled={loading || !userInput.trim()}
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold border-none
                              transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              background: loading || !userInput.trim() ? '#fecdd3' : '#e11d48',
                              color: loading || !userInput.trim() ? '#fda4af' : 'white',
                            }}
                          >
                            Submit Argument
                          </button>
                          <button
                            onClick={() => setUserInput('')}
                            disabled={loading}
                            className="px-4 py-2.5 rounded-lg text-sm font-semibold
                              border border-rose-200 bg-white text-stone-600
                              hover:border-rose-400 hover:text-rose-700 transition-all"
                          >
                            Clear
                          </button>
                        </div>
                      </>
                    ) : (
                      <OralControls sessionId={sessionId} nextTurn={nextTurn} submitOralTurn={submitOralTurn} />
                    )}
                  </div>

                  <button
                    onClick={handleEndSession}
                    className="px-4 rounded-lg border border-rose-200 bg-white text-rose-600
                      text-xs font-semibold flex-shrink-0 self-stretch
                      hover:border-rose-500 hover:bg-rose-50 transition-all leading-tight"
                  >
                    End<br />Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error toast */}
        {error && (
          <div className="fixed bottom-6 right-6 bg-white border border-rose-300 text-rose-700
            px-5 py-3 rounded-xl text-sm font-medium shadow-lg max-w-sm z-50"
            style={{ animation: 'fadeIn 0.3s ease' }}>
            ⚠ {error.message || String(error)}
          </div>
        )}

        {/* End modal */}
        {showEndModal && (
          <div className="fixed inset-0 bg-rose-50/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white border border-rose-100 rounded-2xl p-12 max-w-md w-[90%]
              text-center shadow-xl">
              <div className="text-4xl text-rose-500 mb-4">⚖</div>
              <h2 className="text-xl font-bold text-stone-800 mb-3">Session Concluded</h2>
              <p className="text-sm text-stone-500 leading-relaxed mb-8">
                The proceedings have been recorded.<br />
                Review your evaluation or return to the dashboard.
              </p>
              <div className="flex gap-3 justify-center">
                {evaluationReady && (
                  <button
                    onClick={() => router.push(`${EVALUATION_ROUTE}?session_id=${sessionId}`)}
                    className="px-6 py-2.5 rounded-lg bg-rose-600 text-white text-sm font-semibold
                      shadow-sm hover:bg-rose-700 transition-all"
                  >
                    View Evaluation
                  </button>
                )}
                <button
                  onClick={() => router.push(DASHBOARD_ROUTE)}
                  className="px-6 py-2.5 rounded-lg border border-rose-200 bg-white
                    text-stone-700 text-sm font-semibold hover:border-rose-400 hover:text-rose-700 transition-all"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}