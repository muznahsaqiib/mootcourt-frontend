'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Flags from './components/Flags';
import JudgePanel from './components/JudgePanel';
import Benches from './components/Benches';
import Transcript from './components/Transcript';
import InputControls from './components/InputControls';

import { useAIFight } from './hooks/useAIFight';
import useCaseDetails from '../../dashboard/case/[id]/useCaseDetails';
import { DASHBOARD_ROUTE, EVALUATION_ROUTE } from '../../../utils/routes.constant';
export default function AIFightCourtroom() {
  const router = useRouter();
  const { id } = useParams(); // case ID
  const [userInput, setUserInput] = useState('');

  const { summaryData, mootData, caseType } = useCaseDetails(id);

  const {
    sessionId,
    transcript,
    loading,
    error,
    nextTurn,
    awaitingFrom,
    judgeQuestion,
    initiateMoot,
    submitUserTurn,
    endMootSession,
  } = useAIFight();

  // ----- Modal & Evaluation State -----
  const [showEndModal, setShowEndModal] = useState(false);
  const [evaluationData, setEvaluationData] = useState(null);
  const [evaluationReady, setEvaluationReady] = useState(false);

  // ------------------ Initiate session ------------------
  useEffect(() => {
    if (id && caseType && !sessionId) {
      initiateMoot(id, caseType).catch(console.error);
    }
  }, [id, caseType, sessionId, initiateMoot]);

  // ------------------ Submit handler ------------------
  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    try {
      await submitUserTurn(userInput);
      setUserInput('');
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleEndSession = async () => {
    try {
      const data = await endMootSession();
      setEvaluationData(data);
      setShowEndModal(true);
      setEvaluationReady(true); // ✅ mark evaluation ready
    } catch (err) {
      console.error('Failed to end session:', err);
    }
  };


  // ------------------ Placeholder text ------------------
  const placeholder = sessionId
    ? judgeQuestion
      ? 'Reply to judge question...'
      : `Your turn: ${awaitingFrom}`
    : 'Waiting for session to start...';

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-stone-100 via-rose-50 to-gray-200 flex flex-col overflow-hidden relative">

      {/* Flags - Top Corners */}
      <Flags />

      {/* Header */}
      <div className="w-full h-20 bg-gradient-to-r from-rose-300 via-stone-300 to-gray-300 border-b-2 border-rose-400 flex items-center justify-center shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-3 h-10 bg-gradient-to-b from-rose-400 to-rose-200 rounded-full"></div>
          <h1 className="text-4xl font-black text-rose-700 tracking-wider font-sans drop-shadow-md">MOOT COURT ARENA</h1>
          <div className="w-3 h-10 bg-gradient-to-b from-rose-400 to-rose-200 rounded-full"></div>
        </div>
      </div>

      {/* Judge Panel */}
      <div className="flex-1 flex flex-col">
        <div className="h-32 flex items-center justify-center bg-stone-100/50">
          <JudgePanel question={judgeQuestion} />
        </div>

        {/* Main Arena */}
        <div className="flex-1 flex px-8 pb-4 relative">
          <Benches />

          {/* Transcript */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="bg-stone-50/80 backdrop-blur-md p-6 rounded-3xl shadow-md border-2 border-rose-200 w-full max-w-2xl h-96 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-rose-700 font-black text-center mb-4 text-lg tracking-wide font-sans drop-shadow-sm">COURT RECORD</h3>
                <div className="h-80 overflow-y-auto">
                  <Transcript history={transcript} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Controls + End Session */}
        {sessionId && (
          <div className="h-24 bg-stone-100/50 flex items-center justify-center px-8 gap-4">
            <div className="w-full max-w-4xl flex items-center gap-4">
              <InputControls
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmitArgument={handleSubmit}
                clearInput={() => setUserInput('')}
                loading={loading}
                sessionId={sessionId}
                placeholder={placeholder}
              />

              {/* ✅ Only show End Session if session ended */}
              <button
                onClick={handleEndSession}
                className="px-6 py-3 rounded-2xl font-semibold text-base tracking-wide bg-rose-400 hover:bg-rose-300 text-white border-2 border-rose-300 shadow-md transition-all duration-200"
              >
                END SESSION
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed top-24 right-4 bg-rose-200 text-stone-700 px-5 py-3 rounded-2xl shadow-md border-2 border-rose-300 font-sans font-bold">
          <strong>ERROR:</strong> {error.message || String(error)}
        </div>
      )}

      {/* ------------------ End Session Modal ------------------ */}
      {showEndModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl border-2 border-rose-200">
            <h2 className="text-2xl font-bold text-rose-700 mb-4 text-center">Session Completed!</h2>
            <p className="text-center text-stone-700 mb-6">
              Your moot session has ended. What would you like to do next?
            </p>
            <div className="flex justify-around gap-4">
              {evaluationReady && (
                <button
                  onClick={() => {
                    // navigate to EvaluationPage with session_id param
                    router.push(`${EVALUATION_ROUTE}?session_id=${sessionId}`);
                  }}
                  className="px-6 py-3 bg-rose-400 text-white rounded-2xl font-semibold hover:bg-rose-300 transition-all"
                >
                  See Evaluated Feedback
                </button>
              )}
              <button
                onClick={() => router.push(DASHBOARD_ROUTE)}
                className="px-6 py-3 bg-stone-300 text-stone-700 rounded-2xl font-semibold hover:bg-stone-200 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
