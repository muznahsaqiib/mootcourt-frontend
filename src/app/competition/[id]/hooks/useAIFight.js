import { useState, useCallback } from "react";

const API = "http://localhost:8000";

export const useAIFight = () => {
  const [sessionId, setSessionId] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nextTurn, setNextTurn] = useState(null);
  const [awaitingFrom, setAwaitingFrom] = useState(null);
  const [judgeQuestion, setJudgeQuestion] = useState(null);

  // ================= START SESSION =================
  const initiateMoot = useCallback(async (caseId, caseType) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/moot/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ case_id: caseId, case_type: caseType }),
      });
      const data = await res.json();

      setSessionId(data.session_id);
      setNextTurn(data.next_turn);
      setAwaitingFrom("PETITIONER");
      setTranscript([]);
      setJudgeQuestion(null);

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= HANDLE USER TURN =================
  const submitUserTurn = useCallback(
    async (text) => {
      if (!sessionId || !nextTurn) return;
      setLoading(true);

      try {
        let endpoint = "";

        // ===== USER TURNS =====
        if (nextTurn === "PETITIONER_ARGUMENT") endpoint = "/moot/petitioner/argument";
        else if (nextTurn === "PETITIONER_REPLY_TO_JUDGE") endpoint = "/moot/petitioner/reply";
        else if (nextTurn === "PETITIONER_REBUTTAL") endpoint = "/moot/petitioner/rebut";
        else throw new Error(`Unknown user turn: ${nextTurn}`);

        const res = await fetch(`${API}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, text }),
        });
        const data = await res.json();

        setTranscript((prev) => [
          ...prev,
          { role: "petitioner", text, timestamp: new Date() },
          ...(data.judge_question
            ? [{ role: "judge", text: data.judge_question, timestamp: new Date() }]
            : []),
        ]);

        setNextTurn(data.next_turn);
        setJudgeQuestion(data.judge_question || null);
        setAwaitingFrom(data.next_turn === "SESSION_END" ? null : "PETITIONER");

        // ===== IF AI RESPONDENT TURN =====
        if (data.next_turn === "RESPONDENT_RAG") {
          const ragRes = await fetch(`${API}/moot/respondent/rag`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          });

          const ragData = await ragRes.json();

          setTranscript((prev) => [
            ...prev,
            { role: "respondent", text: ragData.respondent_argument, timestamp: new Date() },
            ...(ragData.judge_question
              ? [{ role: "judge", text: ragData.judge_question, timestamp: new Date() }]
              : []),
            ...(ragData.respondent_reply
              ? [{ role: "respondent", text: ragData.respondent_reply, timestamp: new Date() }]
              : []),
          ]);

          setNextTurn(ragData.next_turn);
          setAwaitingFrom(ragData.next_turn?.startsWith("PETITIONER") ? "PETITIONER" : null);
          setJudgeQuestion(ragData.judge_question || null);
        }

        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [sessionId, nextTurn]
  );

  // ================= END SESSION =================
  const endMootSession = useCallback(async () => {
    if (!sessionId) return; // just check session exists
    setLoading(true);

    try {
      const res = await fetch(`${API}/moot/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json();

      setTranscript((prev) => [
        ...prev,
        { role: "system", text: "Session ended. Evaluation complete.", timestamp: new Date() },
        { role: "evaluation", text: JSON.stringify(data, null, 2), timestamp: new Date() },
      ]);

      setNextTurn(null);
      setAwaitingFrom(null);
      setJudgeQuestion(null);

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  return {
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
  };
};
