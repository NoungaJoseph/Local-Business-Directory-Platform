import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me')
};

// Business API
export const businessAPI = {
  getAll: (params) => api.get('/api/business', { params }),
  getById: (id) => api.get(`/api/business/${id}`),
  create: (data) => api.post('/api/business', data),
  update: (id, data) => api.put(`/api/business/${id}`, data),
  delete: (id) => api.delete(`/api/business/${id}`),
  getMyListings: () => api.get('/api/business/my/listings')
};

// Review API
export const reviewAPI = {
  getByBusiness: (businessId, params) => api.get(`/api/review/business/${businessId}`, { params }),
  create: (data) => api.post('/api/review', data),
  update: (id, data) => api.put(`/api/review/${id}`, data),
  delete: (id) => api.delete(`/api/review/${id}`),
  addResponse: (id, data) => api.post(`/api/review/${id}/response`, data),
  markHelpful: (id) => api.post(`/api/review/${id}/helpful`)
};

export default api;