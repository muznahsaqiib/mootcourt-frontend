const BASE_URL = 'http://127.0.0.1:8000';  // Your FastAPI URL

// ==================== Session Management ====================

export const initiateMoot = async (caseId, maxRounds = 2) => {
  const res = await fetch(`${BASE_URL}/moot/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ case_id: caseId, max_rounds: maxRounds }),
  });
  if (!res.ok) throw new Error('Failed to initiate moot');
  return res.json();
};

export const getMootStatus = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/moot/status/${sessionId}`);
  if (!res.ok) throw new Error('Failed to get moot status');
  return res.json();
};

export const getMootTranscript = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/moot/transcript/${sessionId}`);
  if (!res.ok) throw new Error('Failed to get transcript');
  return res.json();
};

// ==================== Petitioner Submissions ====================

export const submitPetitionerArgument = async (sessionId, argument) => {
  const res = await fetch(`${BASE_URL}/moot/petitioner/argument/${sessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ argument }),
  });
  if (!res.ok) throw new Error('Failed to submit petitioner argument');
  return res.json();
};

export const submitPetitionerResponse = async (sessionId, response) => {
  const res = await fetch(`${BASE_URL}/moot/petitioner/response/${sessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ response }),
  });
  if (!res.ok) throw new Error('Failed to submit petitioner response');
  return res.json();
};

// ==================== Respondent Submissions ====================

export const submitRespondentRebuttal = async (sessionId, argument) => {
  const res = await fetch(`${BASE_URL}/moot/respondent/rebuttal/${sessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ argument }),
  });
  if (!res.ok) throw new Error('Failed to submit respondent rebuttal');
  return res.json();
};

export const submitRespondentResponse = async (sessionId, response) => {
  const res = await fetch(`${BASE_URL}/moot/respondent/response/${sessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ response }),
  });
  if (!res.ok) throw new Error('Failed to submit respondent response');
  return res.json();
};

// ==================== Judge Questions ====================

export const getJudgeQuestions = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/moot/judge/questions/${sessionId}`);
  if (!res.ok) throw new Error('Failed to get judge questions');
  return res.json();
};

// ==================== Conclude ====================

export const concludeMoot = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/moot/conclude/${sessionId}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to conclude moot');
  return res.json();
};

// Legacy functions for backward compatibility (if needed)
export const getCases = async () => {
  const res = await fetch(`${BASE_URL}/cases`);
  return res.json();
};

export const evaluateArguments = async (data) => {
  const res = await fetch(`${BASE_URL}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
