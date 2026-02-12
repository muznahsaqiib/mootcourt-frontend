import { useState, useCallback } from "react";

const API = "http://localhost:8000";

export const useAIFight = () => {
  const [sessionId, setSessionId] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextTurn, setNextTurn] = useState(null);
  const [judgeQuestion, setJudgeQuestion] = useState(null);

  const initiateMoot = useCallback(async (caseId, caseType) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/moot/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ case_id: caseId, case_type: caseType }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setSessionId(data.session_id);
      setNextTurn(data.next_turn);
      setTranscript([]);
      setJudgeQuestion(null);
      return data;
    } finally { setLoading(false); }
  }, []);

  const submitUserTurn = useCallback(async (text) => {
    if (!nextTurn || !sessionId) return;
    setLoading(true);
    try {
      let endpoint = "";
      if (nextTurn === "PETITIONER_ARGUMENT") endpoint = "/moot/petitioner/argument";
      else if (nextTurn === "PETITIONER_REPLY_TO_JUDGE") endpoint = "/moot/petitioner/reply";
      else if (nextTurn === "PETITIONER_REBUTTAL") endpoint = "/moot/petitioner/rebut";
      else throw new Error("Unknown turn");

      const res = await fetch(`${API}${endpoint}?session_id=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      // Update transcript
      setTranscript(prev => [
        ...prev,
        { role: "petitioner", text, timestamp: new Date() },
        ...(data.judge_question ? [{ role: "judge", text: data.judge_question, timestamp: new Date() }] : [])
      ]);

      setNextTurn(data.next_turn);
      setJudgeQuestion(data.judge_question || null);

      // Respondent AI turn
      if (data.next_turn === "RESPONDENT_RAG") {
        const ragRes = await fetch(`${API}/moot/respondent/rag?session_id=${sessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const ragData = await ragRes.json();
        setTranscript(prev => [
          ...prev,
          { role: "respondent", text: ragData.respondent_argument, timestamp: new Date() },
          ...(ragData.judge_question ? [{ role: "judge", text: ragData.judge_question, timestamp: new Date() }] : []),
          ...(ragData.respondent_reply ? [{ role: "respondent", text: ragData.respondent_reply, timestamp: new Date() }] : [])
        ]);
        setNextTurn(ragData.next_turn);
        setJudgeQuestion(ragData.judge_question || null);
      }

      return data;
    } finally { setLoading(false); }
  }, [nextTurn, sessionId]);

  const endMootSession = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/moot/evaluate?session_id=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setTranscript(prev => [
        ...prev,
        { role: "system", text: "Session ended. Evaluation complete.", timestamp: new Date() },
        { role: "evaluation", text: JSON.stringify(data, null, 2), timestamp: new Date() }
      ]);
      setNextTurn(null);
      setJudgeQuestion(null);
      return data;
    } finally { setLoading(false); }
  }, [sessionId]);

  return { sessionId, transcript, loading, error, nextTurn, judgeQuestion, initiateMoot, submitUserTurn, endMootSession };
};
