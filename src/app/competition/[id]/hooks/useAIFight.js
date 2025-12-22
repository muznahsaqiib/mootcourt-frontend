'use client';

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function useAIFight(selectedCaseId) {
  const [sessionId, setSessionId] = useState(null);
  const [aiResponse, setAIResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);

  // START SESSION
  const startSession = async () => {
    if (!selectedCaseId) {
      setError('No case selected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ case_id: selectedCaseId, mode: 'argument' }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Failed to start session: ${response.status} ${text}`);
      }

      const data = await response.json();
      setSessionId(data.session_id);
      setSessionActive(true);
      setHistory([]);
      setAIResponse('');
      console.log('Session started:', data.session_id);
      return data.session_id;
    } catch (err) {
      console.error('Session start error:', err);
      setError(err.message || 'Failed to start session');
    } finally {
      setLoading(false);
    }
  };

  // SUBMIT ARGUMENT
  const handleSubmitArgument = async () => {
    if (!sessionId) {
      setError("Session not started yet. Please wait for the session to initialize.");
      return;
    }
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', text: userInput };
    const updatedHistory = [...history, userMessage];

    setLoading(true);
    setError(null);

    try {
      // Add user message
      const addRes = await fetch(`${API_BASE}/session/${sessionId}/add-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userMessage),
      });
      if (!addRes.ok) throw new Error(`Failed to add message`);

      // Get AI response
      const response = await fetch(`${API_BASE}/rag/opponent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ session_id: sessionId, argument: userInput }),
      });
      if (!response.ok) throw new Error(`Failed to get AI rebuttal`);

      const data = await response.json();
      const aiReply = data.response || data.reply || data;

      setHistory([...updatedHistory, { role: 'opponent', text: aiReply }]);
      setAIResponse(aiReply);
      setUserInput('');
    } catch (err) {
      console.error('AI fetch error:', err);
      setError(err.message || 'AI failed to respond');
    } finally {
      setLoading(false);
    }
  };

  // END SESSION
  const endSession = async (aiScore, userScore, feedback) => {
    if (!sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/session/${sessionId}/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ai_score: aiScore || null,
          user_score: userScore || null,
          evaluator_feedback: feedback || null,
        }),
      });
      if (!response.ok) throw new Error(`Failed to end session`);

      const data = await response.json();
      setSessionActive(false);
      return data;
    } catch (err) {
      console.error('Session end error:', err);
      setError(err.message || 'Failed to end session');
    } finally {
      setLoading(false);
    }
  };

  // CLEAR / RESET
  const clearInput = () => setUserInput('');
  const resetSession = () => {
    setSessionId(null);
    setHistory([]);
    setAIResponse('');
    setUserInput('');
    setError(null);
    setSessionActive(false);
  };

  return {
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
  };
}
