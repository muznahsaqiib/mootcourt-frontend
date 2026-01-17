// src/app/competition/[id]/hooks/useAIFight.js

import { useState, useCallback } from "react";
import {
  initiateMoot as apiInitiateMoot,
  getMootStatus as apiGetStatus,
  getMootTranscript as apiGetTranscript,
  submitPetitionerArgument as apiSubmitPetitionerArgument,
  submitPetitionerResponse as apiSubmitPetitionerResponse,
  submitRespondentRebuttal as apiSubmitRespondentRebuttal,
  submitRespondentResponse as apiSubmitRespondentResponse,
  getJudgeQuestions as apiGetJudgeQuestions,
  concludeMoot as apiConcludeMoot
} from "../../../../services/api"; // Using absolute import

export const useAIFight = () => {
  const [sessionId, setSessionId] = useState(null);
  const [status, setStatus] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==================== Initiate Moot ====================
  const initiateMoot = useCallback(async (caseId, maxRounds = 2) => {
    if (!caseId) throw new Error("caseId is required to initiate moot");
    setLoading(true);
    setError(null);
    try {
      console.log("Initiating moot with:", { caseId, maxRounds });
      const data = await apiInitiateMoot(String(caseId), maxRounds);
      console.log("Moot initiated:", data);
      setSessionId(data.session_id);
      setStatus({
        next_turn: data.next_turn,
        awaiting_from: data.awaiting_from
      });
      return data;
    } catch (err) {
      console.error("Failed to initiate moot:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== Get Status ====================
  const getStatus = useCallback(async () => {
    if (!sessionId) throw new Error("No sessionId available");
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetStatus(sessionId);
      setStatus({
        next_turn: data.current_turn,
        awaiting_from: data.current_party  // Updated to match backend
      });
      return data;
    } catch (err) {
      console.error("Failed to get status:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // ==================== Get Transcript ====================
  const getTranscript = useCallback(async () => {
    if (!sessionId) throw new Error("No sessionId available");
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetTranscript(sessionId);
      setTranscript(data);
      return data;
    } catch (err) {
      console.error("Failed to get transcript:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // ==================== Petitioner Actions ====================
  const submitPetitionerArgument = useCallback(async (argument) => {
    if (!sessionId) throw new Error("No sessionId available");
    if (!argument) throw new Error("Argument cannot be empty");
    setLoading(true);
    setError(null);
    try {
      const data = await apiSubmitPetitionerArgument(sessionId, argument);
      console.log("Petitioner argument submitted:", data);
      setStatus({
        next_turn: data.next_turn,
        awaiting_from: data.next_party
      });
      return data;
    } catch (err) {
      console.error("Failed to submit petitioner argument:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const submitPetitionerResponse = useCallback(async (response) => {
    if (!sessionId) throw new Error("No sessionId available");
    if (!response) throw new Error("Response cannot be empty");
    setLoading(true);
    setError(null);
    try {
      const data = await apiSubmitPetitionerResponse(sessionId, response);
      console.log("Petitioner response submitted:", data);
      setStatus({
        next_turn: data.next_turn,
        awaiting_from: data.next_party
      });
      return data;
    } catch (err) {
      console.error("Failed to submit petitioner response:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // ==================== Respondent Actions ====================
  const submitRespondentRebuttal = useCallback(async (argument) => {
    if (!sessionId) throw new Error("No sessionId available");
    setLoading(true);
    setError(null);
    try {
      const data = await apiSubmitRespondentRebuttal(sessionId, argument || "");
      console.log("Respondent rebuttal submitted:", data);
      setStatus({
        next_turn: data.next_turn,
        awaiting_from: data.next_party
      });
      return data;
    } catch (err) {
      console.error("Failed to submit respondent rebuttal:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const submitRespondentResponse = useCallback(async (response) => {
    if (!sessionId) throw new Error("No sessionId available");
    if (!response) throw new Error("Response cannot be empty");
    setLoading(true);
    setError(null);
    try {
      const data = await apiSubmitRespondentResponse(sessionId, response);
      console.log("Respondent response submitted:", data);
      setStatus({
        next_turn: data.next_turn,
        awaiting_from: data.next_party
      });
      return data;
    } catch (err) {
      console.error("Failed to submit respondent response:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // ==================== Judge Questions ====================
  const getJudgeQuestions = useCallback(async () => {
    if (!sessionId) throw new Error("No sessionId available");
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetJudgeQuestions(sessionId);
      console.log("Judge questions retrieved:", data);
      return data;
    } catch (err) {
      console.error("Failed to get judge questions:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // ==================== Conclude Moot ====================
  const concludeMoot = useCallback(async () => {
    if (!sessionId) throw new Error("No sessionId available");
    setLoading(true);
    setError(null);
    try {
      const data = await apiConcludeMoot(sessionId);
      console.log("Moot concluded:", data);
      setSessionId(null);
      setStatus(null);
      setTranscript([]);
      return data;
    } catch (err) {
      console.error("Failed to conclude moot:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  return {
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
    concludeMoot
  };
};