import axios, { AxiosResponse } from 'axios';
import {
  Product,
  Order,
  Contact,
  CreateOrderInput,
  CreateContactInput,
  ApiResponse,
  PaginatedResponse,
  ProductQuery,
} from '@/types';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    } else if (error.code === 'NETWORK_ERROR') {
      console.error('Network error');
    }
    
    return Promise.reject(error);
  }
);

// Product API
export const productApi = {
  // Get all products with optional filters
  getProducts: async (query?: ProductQuery): Promise<PaginatedResponse<Product>> => {
    const response: AxiosResponse<PaginatedResponse<Product>> = await api.get('/products', {
      params: query,
    });
    return response.data;
  },

  // Get product by slug
  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response: AxiosResponse<ApiResponse<Product>> = await api.get(`/products/${slug}`);
    return response.data;
  },

  // Get all available tags
  getTags: async (): Promise<ApiResponse<string[]>> => {
    const response: AxiosResponse<ApiResponse<string[]>> = await api.get('/products/tags');
    return response.data;
  },

  // Get related products
  getRelatedProducts: async (productId: string, limit?: number): Promise<ApiResponse<Product[]>> => {
    const response: AxiosResponse<ApiResponse<Product[]>> = await api.get(
      `/products/${productId}/related`,
      { params: { limit } }
    );
    return response.data;
  },
};

// Order API
export const orderApi = {
  // Create new order
  createOrder: async (orderData: CreateOrderInput): Promise<ApiResponse<Order>> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.post('/orders', orderData);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<ApiResponse<Order>> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.get(`/orders/${orderId}`);
    return response.data;
  },
};

// Contact API
export const contactApi = {
  // Create new contact message
  createContact: async (contactData: CreateContactInput): Promise<ApiResponse<Contact>> => {
    const response: AxiosResponse<ApiResponse<Contact>> = await api.post('/contacts', contactData);
    return response.data;
  },
};

// Export both named and default exports
export { api };
export default api;
