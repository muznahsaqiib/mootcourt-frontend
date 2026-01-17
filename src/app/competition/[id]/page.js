'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Flags from './components/Flags';
import JudgePanel from './components/JudgePanel';
import Benches from './components/Benches';
import Transcript from './components/Transcript';
import InputControls from './components/InputControls';
import { useAIFight } from './hooks/useAIFight'; // Named import

export default function AIFightCourtroom() {
  const { id } = useParams(); // Case ID from URL
  const [sessionStarted, setSessionStarted] = useState(false);
  const [userInput, setUserInput] = useState('');

  const {
    sessionId,
    status,
    transcript,
    loading,
    error,
    initiateMoot,
    getStatus,
    getTranscript,
    submitPetitionerArgument,
    submitPetitionerResponse,
    submitRespondentRebuttal,
    submitRespondentResponse,
    getJudgeQuestions,
    concludeMoot,
  } = useAIFight();

  // Auto-start session when component mounts
  useEffect(() => {
    if (id && !sessionStarted) {
      initiateMoot(id)
        .then(() => setSessionStarted(true))
        .catch(console.error);
    }
  }, [id, sessionStarted, initiateMoot]);

  // Refresh status periodically
  useEffect(() => {
    if (sessionId) {
      const interval = setInterval(() => {
        getStatus().catch(console.error);
        getTranscript().catch(console.error);
        getJudgeQuestions().catch(console.error);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sessionId, getStatus, getTranscript, getJudgeQuestions]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    try {
      // Determine what type of submission is required
      const turn = status?.next_turn;

      if (turn === 'petitioner_argument') {
        await submitPetitionerArgument(userInput);
      } else if (turn === 'petitioner_response') {
        await submitPetitionerResponse(userInput);
      } else if (turn === 'respondent_rebuttal') {
        await submitRespondentRebuttal(userInput);
      } else if (turn === 'respondent_response') {
        await submitRespondentResponse(userInput);
      } else {
        console.warn('Unknown turn:', turn);
      }

      setUserInput(''); // Clear input after submission
      await getStatus();
      await getTranscript();
      await getJudgeQuestions();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleEndSession = async () => {
    if (!sessionId) return;
    try {
      await concludeMoot(sessionId);
    } catch (err) {
      console.error('Failed to conclude moot:', err);
    } finally {
      setSessionStarted(false);
      setUserInput('');
    }
  };

  const getInputPlaceholder = () => {
    if (!sessionId) return "Waiting for session to start...";
    return status?.next_turn
      ? `Current turn: ${status.next_turn.replace(/_/g, ' ')}`
      : "Type your response...";
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-pink-100 flex flex-col items-center justify-center overflow-hidden relative">

      {/* Error */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error.message || String(error)}
        </div>
      )}

      {/* Current Turn */}
      {sessionId && status?.next_turn && (
        <div className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          <div className="text-sm font-semibold">
            Current Turn: {status.next_turn.replace(/_/g, ' ').toUpperCase()}
          </div>
          {status.awaiting_from && (
            <div className="text-xs">
              Awaiting: {status.awaiting_from}
            </div>
          )}
        </div>
      )}

      {/* Judge Questions */}
      {status?.judgeQuestions?.length > 0 && (
        <div className="fixed top-20 left-4 bg-yellow-100 border border-yellow-300 p-4 rounded-lg max-w-md">
          <h3 className="font-bold text-yellow-800 mb-2">Judge Questions:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            {status.judgeQuestions.map((q, i) => (
              <li key={i}>• {q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading / starting */}
      {!sessionId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Starting Moot Court...</h2>
            <p className="text-gray-600 mb-4">Initializing session for Case {id}</p>
            {loading && <div className="animate-spin">⏳</div>}
          </div>
        </div>
      )}

      {/* Main Courtroom */}
      {sessionId && (
        <>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Flags />
            <JudgePanel judgeQuestion={status?.judgeQuestions || []} />
            <Benches />
            <Transcript history={transcript} />
          </div>

          <InputControls
            userInput={userInput}
            setUserInput={setUserInput}
            handleSubmitArgument={handleSubmit}
            clearInput={() => setUserInput('')}
            loading={loading}
            onEndSession={handleEndSession}
            sessionId={sessionId}
            placeholder={getInputPlaceholder()}
          />
        </>
      )}
    </div>
  );
}
