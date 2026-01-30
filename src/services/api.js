const BASE_URL = 'http://127.0.0.1:8000';  // Your FastAPI URL

// ==================== Helper ====================
const handleFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Request failed');
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
};

// Mock in-memory storage for sessions
let mockSessions = {};

// ==================== Session Management ====================
export const initiateMoot = async (caseId, maxRounds = 2) => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  mockSessions[sessionId] = {
    session_id: sessionId,
    case_id: caseId,
    status: 'active',
    current_turn: 'petitioner_argument',
    current_party: 'petitioner',
    transcript: []
  };

  return {
    status: 'moot_initiated',
    session_id: sessionId,
    case_id: caseId,
    next_turn: 'petitioner_argument',
    awaiting_from: 'petitioner'
  };
};

export const getMootStatus = async (sessionId) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  return {
    current_turn: session.current_turn,
    current_party: session.current_party
  };
};

export const getMootTranscript = async (sessionId) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  return session.transcript;
};

// ==================== Petitioner Submissions ====================
export const submitPetitionerArgument = async (sessionId, argument) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  session.transcript.push({
    speaker: 'petitioner',
    message: argument,
    type: 'argument'
  });

  session.current_turn = 'respondent_rebuttal';
  session.current_party = 'respondent';

  return {
    status: 'argument_submitted',
    next_turn: 'respondent_rebuttal',
    next_party: 'respondent'
  };
};

export const submitPetitionerResponse = async (sessionId, response) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  session.transcript.push({
    speaker: 'petitioner',
    message: response,
    type: 'response'
  });

  session.current_turn = 'respondent_response';
  session.current_party = 'respondent';

  return {
    status: 'response_submitted',
    next_turn: 'respondent_response',
    next_party: 'respondent'
  };
};

// ==================== Respondent Submissions ====================
export const submitRespondentRebuttal = async (sessionId, rebuttal) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  session.transcript.push({
    speaker: 'respondent',
    message: rebuttal || 'AI-generated rebuttal',
    type: 'rebuttal'
  });

  session.current_turn = 'petitioner_response';
  session.current_party = 'petitioner';

  return {
    status: 'rebuttal_submitted',
    next_turn: 'petitioner_response',
    next_party: 'petitioner'
  };
};

export const submitRespondentResponse = async (sessionId, response) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  session.transcript.push({
    speaker: 'respondent',
    message: response,
    type: 'response'
  });

  session.current_turn = 'concluded';
  session.current_party = null;

  return {
    status: 'response_submitted',
    next_turn: 'concluded',
    next_party: null
  };
};

// ==================== Conclude ====================
export const concludeMoot = async (sessionId) => {
  const session = mockSessions[sessionId];
  if (!session) throw new Error('Session not found');

  const transcript = session.transcript;
  delete mockSessions[sessionId];

  return {
    status: 'moot_concluded',
    transcript: transcript,
    final_turn: 'concluded'
  };
};

// ==================== Legacy / Misc ====================
export const getCases = () => handleFetch(`${BASE_URL}/cases`);

export const evaluateArguments = (data) =>
  handleFetch(`${BASE_URL}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
