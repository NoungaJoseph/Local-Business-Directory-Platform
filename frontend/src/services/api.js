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
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Business API
export const businessAPI = {
  getAll: (params) => api.get('/business', { params }),
  getById: (id) => api.get(`/business/${id}`),
  create: (data) => api.post('/business', data),
  update: (id, data) => api.put(`/business/${id}`, data),
  delete: (id) => api.delete(`/business/${id}`),
  getMyListings: () => api.get('/business/my/listings')
};

// Review API
export const reviewAPI = {
  getByBusiness: (businessId, params) => api.get(`/review/business/${businessId}`, { params }),
  create: (data) => api.post('/review', data),
  update: (id, data) => api.put(`/review/${id}`, data),
  delete: (id) => api.delete(`/review/${id}`),
  addResponse: (id, data) => api.post(`/review/${id}/response`, data),
  markHelpful: (id) => api.post(`/review/${id}/helpful`)
};

export default api;