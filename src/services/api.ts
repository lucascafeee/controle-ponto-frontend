// src/services/apiService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'REACT_APP_API_URL',
});

export const loginUser = (code: string) => {
  return api.post('/auth/login', { code });
};

export const startWorkSession = (userId: string) => {
  return api.post('/work-sessions/start', { userId });
};

export const endWorkSession = (sessionId: string) => {
  return api.post('/work-sessions/end', { sessionId });
};

export const getWorkSessions = (userId: string) => {
  return api.get(`/work-sessions/${userId}`);
};
