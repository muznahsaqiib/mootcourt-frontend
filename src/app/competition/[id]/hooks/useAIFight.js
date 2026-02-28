import { useState, useCallback, useRef } from "react";

const API = "http://localhost:8000";

export const useAIFight = () => {
  // ------------------ STATE ------------------
  const [sessionId, setSessionId] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextTurn, setNextTurn] = useState(null);
  const [judgeQuestion, setJudgeQuestion] = useState(null);
  const [judgeAudioBase64, setJudgeAudioBase64] = useState(null);
  const [respondentAudioBase64, setRespondentAudioBase64] = useState(null);

  const activeAudioRef = useRef(null);

  // ------------------ AUDIO HELPER ------------------
  const stopAudio = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
  }, []);

  const playAudio = useCallback((base64, mimeType = "audio/mpeg") => {
    return new Promise(resolve => {
      if (!base64) return resolve();
      stopAudio();
      const audio = new Audio(`data:${mimeType};base64,${base64}`);
      activeAudioRef.current = audio;
      audio.onended = resolve;
      audio.onerror = resolve;
      audio.play().catch(resolve);
    });
  }, [stopAudio]);

  const playSequence = useCallback(async (...base64Clips) => {
    for (const clip of base64Clips) {
      if (clip) await playAudio(clip);
    }
  }, [playAudio]);

  // ------------------ INITIATE MOOT ------------------
  const initiateMoot = useCallback(async (caseId, caseType) => {
    setLoading(true);
    setError(null);
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
      setJudgeAudioBase64(null);
      setRespondentAudioBase64(null);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ------------------ RESPONDENT RAG (SSE streaming) ------------------
  const triggerRAG = useCallback((currentSessionId) => {
    if (!currentSessionId) return;

    setLoading(true);
    setError(null);

    const es = new EventSource(
      `${API}/moot/respondent/rag/stream?session_id=${currentSessionId}`,
      { withCredentials: true }
    );

    // Step 1 — respondent argument arrives first, show + play immediately
    es.addEventListener("respondent_argument", async (e) => {
      const { text, audio } = JSON.parse(e.data);
      setTranscript(prev => [...prev, { role: "respondent", text, timestamp: new Date() }]);
      setRespondentAudioBase64(audio || null);
      if (audio) await playAudio(audio);
    });

    // Step 2 — judge question arrives next, show + play immediately
    es.addEventListener("judge_question", async (e) => {
      const { text, audio } = JSON.parse(e.data);
      setTranscript(prev => [...prev, { role: "judge", text, timestamp: new Date() }]);
      setJudgeQuestion(text);
      setJudgeAudioBase64(audio || null);
      if (audio) await playAudio(audio);
    });

    // Step 3 — respondent reply to judge, show + play immediately
    es.addEventListener("respondent_reply", async (e) => {
      const { text, audio } = JSON.parse(e.data);
      setTranscript(prev => [...prev, { role: "respondent", text, timestamp: new Date() }]);
      if (audio) await playAudio(audio);
    });

    // Step 4 — all done, unlock UI
    es.addEventListener("done", (e) => {
      const { next_turn } = JSON.parse(e.data);
      setNextTurn(next_turn);
      setLoading(false);
      es.close();
    });

    es.onerror = () => {
      console.error("SSE stream error");
      setError(new Error("Respondent stream failed. You may continue."));
      setNextTurn("PETITIONER_REBUTTAL");
      setLoading(false);
      es.close();
    };
  }, [playAudio]);

  // ------------------ SUBMIT TEXT TURN ------------------
  const submitUserTurn = useCallback(async (text) => {
    if (!nextTurn || !sessionId || !text.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const endpointMap = {
        PETITIONER_ARGUMENT: "/moot/petitioner/argument",
        PETITIONER_REPLY_TO_JUDGE: "/moot/petitioner/reply",
        PETITIONER_REBUTTAL: "/moot/petitioner/rebut",
      };
      const endpoint = endpointMap[nextTurn];
      if (!endpoint) throw new Error(`Unknown turn: ${nextTurn}`);

      const res = await fetch(`${API}${endpoint}?session_id=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();
      const ts = new Date();

      setTranscript(prev => [
        ...prev,
        { role: "petitioner", text, timestamp: ts },
        ...(data.judge_question ? [{ role: "judge", text: data.judge_question, timestamp: ts }] : []),
      ]);

      const nextTurnToSet = data.next_turn === "SESSION_END" ? "AWAITING_END" : data.next_turn;
      setNextTurn(nextTurnToSet);
      setJudgeQuestion(data.judge_question || null);

      if (data.next_turn === "RESPONDENT_RAG") {
        triggerRAG(sessionId);
      }

      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [nextTurn, sessionId, triggerRAG]);

  // ------------------ SUBMIT ORAL TURN ------------------
  const submitOralTurn = useCallback(async (audioBlob) => {
    if (!nextTurn || !sessionId || !audioBlob) return null;
    setLoading(true);
    setError(null);

    try {
      const endpointMap = {
        PETITIONER_ARGUMENT: "/moot/petitioner/argument/audio",
        PETITIONER_REPLY_TO_JUDGE: "/moot/petitioner/reply/audio",
        PETITIONER_REBUTTAL: "/moot/petitioner/rebut/audio",
      };
      const endpoint = endpointMap[nextTurn];
      if (!endpoint) return null;

      const formData = new FormData();
      formData.append("file", audioBlob);
      formData.append("session_id", sessionId);

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const ts = new Date();
      const text = data.transcribed_text || "";

      setTranscript(prev => [
        ...prev,
        { role: "petitioner", text, timestamp: ts },
        ...(data.judge_question ? [{ role: "judge", text: data.judge_question, timestamp: ts }] : []),
      ]);

      const nextTurnToSet = data.next_turn === "SESSION_END" ? "AWAITING_END" : data.next_turn;
      setNextTurn(nextTurnToSet);
      setJudgeQuestion(data.judge_question || null);
      setJudgeAudioBase64(data.judge_audio || null);

      if (data.judge_audio) {
        await playAudio(data.judge_audio);
      }

      if (data.next_turn === "RESPONDENT_RAG") {
        triggerRAG(sessionId);
      }

      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [nextTurn, sessionId, playAudio, triggerRAG]);

  // ------------------ END SESSION ------------------
  const endMootSession = useCallback(async () => {
    if (!sessionId) return null;
    setLoading(true);
    stopAudio();

    try {
      if (nextTurn && nextTurn !== "SESSION_END" && nextTurn !== "AWAITING_END") {
        const forceEndMap = {
          PETITIONER_ARGUMENT: `/moot/petitioner/argument`,
          PETITIONER_REPLY_TO_JUDGE: `/moot/petitioner/reply`,
          PETITIONER_REBUTTAL: `/moot/petitioner/rebut`,
          RESPONDENT_RAG: null,
        };
        const endpoint = forceEndMap[nextTurn];
        if (endpoint) {
          await fetch(`${API}${endpoint}?session_id=${sessionId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ text: "[Session ended by user]" }),
          });
          if (nextTurn === "PETITIONER_ARGUMENT" || nextTurn === "PETITIONER_REPLY_TO_JUDGE") {
            await fetch(`${API}/moot/petitioner/rebut?session_id=${sessionId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ text: "[Session ended by user]" }),
            });
          }
        }
      }

      const res = await fetch(`${API}/moot/evaluate?session_id=${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      setTranscript(prev => [
        ...prev,
        { role: "system", text: "Session ended. Evaluation complete.", timestamp: new Date() },
      ]);

      setNextTurn("SESSION_END");
      setJudgeQuestion(null);
      setJudgeAudioBase64(null);
      setRespondentAudioBase64(null);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [sessionId, nextTurn, stopAudio]);

  return {
    sessionId,
    transcript,
    loading,
    error,
    nextTurn,
    judgeQuestion,
    judgeAudioBase64,
    respondentAudioBase64,
    initiateMoot,
    submitUserTurn,
    submitOralTurn,
    endMootSession,
    stopAudio,
  };
};