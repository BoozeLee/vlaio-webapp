import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const agentApi = {
  execute: async (task: string, context?: Record<string, unknown>) => {
    const response = await axios.post(`${API_BASE}/execute`, { task, context });
    return response.data;
  },

  getStats: async () => {
    const response = await axios.get(`${API_BASE}/stats`);
    return response.data;
  },

  health: async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  },
};
