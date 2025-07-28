import axios, { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await api.post('/auth/refresh', {
            refresh_token: refreshToken,
          })
          
          const { access_token } = response.data
          localStorage.setItem('access_token', access_token)
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    
    // Show error toast for user-facing errors
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      const message = (error.response.data as any)?.detail || 'An error occurred'
      toast.error(message)
    } else if (error.response && error.response.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.request) {
      toast.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

// API methods
export const authApi = {
  login: (email: string, password: string) => 
    api.post('/auth/login', new URLSearchParams({ username: email, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  requestPasswordReset: (email: string) => api.post('/auth/password-reset', { email }),
}

export const productsApi = {
  getAll: (params?: any) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getByHandle: (handle: string) => api.get(`/products/${handle}`),
  getCollections: () => api.get('/products/collections'),
}

export const cartApi = {
  get: () => api.get('/cart'),
  addItem: (variantId: string, quantity: number, properties?: any) => 
    api.post('/cart/items', { variant_id: variantId, quantity, properties }),
  updateItem: (itemId: number, quantity: number) => 
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: number) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
  applyDiscount: (code: string) => api.post('/cart/discount', { discount_code: code }),
  calculateShipping: (address: any) => api.post('/cart/shipping-rates', address),
  getCheckoutUrl: () => api.get('/cart/checkout-url'),
}

export const ordersApi = {
  getAll: (params?: any) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
}

export const usersApi = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/me', data),
  getOrders: () => api.get('/users/orders'),
}

export const contactApi = {
  submit: (data: any) => api.post('/contact', data),
}

export const businessApi = {
  getInfo: () => api.get('/business/info'),
  getSocialLinks: () => api.get('/business/social-media'),
}