import axios from 'axios';
import { mockApi } from './mockData';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.yourecommerceapp.com', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = store.getState().auth.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// For development, we'll use mock data
// In production, replace these with actual API calls
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    // Use mock data for now
    return await mockApi.login(credentials);
    // In production, use: return await api.post('/auth/login', credentials);
  },
  
  register: async (userData: { name: string; email: string; password: string }) => {
    return await mockApi.register(userData);
    // In production, use: return await api.post('/auth/register', userData);
  },
  
  logout: async () => {
    return await mockApi.logout();
    // In production, use: return await api.post('/auth/logout');
  },
};

export const productsAPI = {
  fetchProducts: async () => {
    return await mockApi.fetchProducts();
    // In production, use: return await api.get('/products');
  },
  
  fetchProductById: async (id: string) => {
    return await mockApi.fetchProductById(id);
    // In production, use: return await api.get(`/products/${id}`);
  },
  
  searchProducts: async (query: string) => {
    return await mockApi.searchProducts(query);
    // In production, use: return await api.get(`/products/search?q=${query}`);
  },
};

export default api;
