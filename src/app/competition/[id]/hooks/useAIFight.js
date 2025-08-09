'use client';

import { useState } from 'react';

export default function useAIFight() {
  const [aiResponse, setAIResponse] = useState('');
  const [judgeQuestion, setJudgeQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmitArgument = async () => {
    if (!userInput.trim()) return;

    setHistory(prev => [...prev, { role: 'user', text: userInput }]);

    // TODO: Replace with real AI backend call
    const aiReply = "This is the AI's rebuttal (replace with real AI response)";
    setAIResponse(aiReply);
    setHistory(prev => [...prev, { role: 'ai', text: aiReply }]);
    setUserInput('');
  };

  const clearInput = () => setUserInput('');

  return {
    aiResponse,
    judgeQuestion,
    userInput,
    setUserInput,
    history,
    handleSubmitArgument,
    clearInput,
  };
}
