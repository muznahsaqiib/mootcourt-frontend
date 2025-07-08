const BASE_URL = 'http://127.0.0.1:8000';  // Your FastAPI URL

export const getCases = async () => {
  const res = await fetch(`${BASE_URL}/cases`);
  return res.json();
};

export const getJudgeQuestions = async (caseType) => {
  const res = await fetch(`${BASE_URL}/judge-questions/${caseType}`);
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
