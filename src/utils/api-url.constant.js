// Base URL
export const BASE_URL = "http://localhost:8000";

// Auth Endpoints
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const ME_URL = `${BASE_URL}/auth/me`;

// Cases & Moot Problems
export const CASES_URL = `${BASE_URL}/cases`;
export const MOOT_PROBLEMS_URL = `${BASE_URL}/moot-problems`;

// Dynamic endpoints 
export const CASE_BY_ID_URL = (id) => `${CASES_URL}/${id}`;
export const MOOT_PROBLEM_BY_ID_URL = (id) => `${MOOT_PROBLEMS_URL}/${id}`;
