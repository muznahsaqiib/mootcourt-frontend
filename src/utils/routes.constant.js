export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const DASHBOARD_ROUTE = '/dashboard';
export const PROFILE_ROUTE = `${DASHBOARD_ROUTE}/profile`;
export const COMPETITION_ROUTE = (id) => `/competition/${id}`;
export const CASE_DETAILS_ROUTE = (id) => `${DASHBOARD_ROUTE}/case/${id}`;
export const EVALUATION_ROUTE = '/evaluation';