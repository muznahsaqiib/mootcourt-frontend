'use client';

import { useParams } from 'next/navigation'; // Next.js router hooks
import { useEffect, useState } from 'react'; // React hooks
import Flags from './components/Flags';
import JudgePanel from './components/JudgePanel';
import Benches from './components/Benches';
import Transcript from './components/Transcript';
import InputControls from './components/InputControls';
import useAIFight from './hooks/useAIFight';

export default function AIFightCourtroom() {
  const { id } = useParams(); // case ID from URL
  const [sessionStarted, setSessionStarted] = useState(false);

  const {
    sessionId,
    sessionActive,
    aiResponse,
    userInput,
    setUserInput,
    history,
    loading,
    error,
    startSession,
    handleSubmitArgument,
    endSession,
    clearInput,
    resetSession,
  } = useAIFight(id);

  // Auto-start session when component mounts
  useEffect(() => {
    if (id && !sessionStarted) {
      startSession().then(() => setSessionStarted(true));
    }
  }, [id, sessionStarted, startSession]);

  const handleEndSession = async () => {
    await endSession(null, null, null); // Add scores/feedback if needed
    resetSession();
    setSessionStarted(false);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-pink-100 flex flex-col items-center justify-center overflow-hidden relative">

      {/* Error message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading / session starting */}
      {!sessionId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Starting Session...</h2>
            <p className="text-gray-600 mb-4">Initializing AI Fight for Case {id}</p>
            {loading && <div className="animate-spin">⏳</div>}
          </div>
        </div>
      )}

      {/* Main courtroom */}
      {sessionId && sessionActive && (
        <>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <Flags />
            <JudgePanel judgeQuestion={aiResponse} />
            <Benches />
            <Transcript history={history} />
          </div>

          <InputControls
            userInput={userInput}
            setUserInput={setUserInput}
            handleSubmitArgument={handleSubmitArgument}
            clearInput={clearInput}
            loading={loading}
            onEndSession={handleEndSession}
            sessionId={sessionId}
          />
        </>
      )}
    </div>
  );
}
