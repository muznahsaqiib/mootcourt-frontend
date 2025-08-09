'use client';

import { useParams } from 'next/navigation';
import Flags from './components/Flags';
import JudgePanel from './components/JudgePanel';
import Benches from './components/Benches';

import Transcript from './components/Transcript';
import InputControls from './components/InputControls';
import useAIFight from './hooks/useAIFight';

export default function AIFightCourtroom() {
  const { id } = useParams();
  const {
    aiResponse,
    judgeQuestion,
    userInput,
    setUserInput,
    history,
    handleSubmitArgument,
    clearInput,
  } = useAIFight();

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-pink-100 flex flex-col items-center justify-center overflow-hidden relative">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <Flags />
        <JudgePanel judgeQuestion={judgeQuestion} />
        <Benches />
        
        <Transcript history={history} />
      </div>

      <InputControls
        userInput={userInput}
        setUserInput={setUserInput}
        handleSubmitArgument={handleSubmitArgument}
        clearInput={clearInput}
      />
    </div>
  );
}
