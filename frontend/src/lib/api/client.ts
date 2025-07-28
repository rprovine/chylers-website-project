import { Product, CartItem, Order } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }))
    throw new ApiError(response.status, error.detail || 'An error occurred')
  }

  return response.json()
}

// Products API
export const productsApi = {
  async getAll(): Promise<Product[]> {
    return fetchAPI('/products')
  },

  async getByHandle(handle: string): Promise<Product> {
    return fetchAPI(`/products/${handle}`)
  },

  async getFeatured(): Promise<Product[]> {
    return fetchAPI('/products/featured')
  },
}

// Cart API
export const cartApi = {
  async create(): Promise<{ cart_id: string }> {
    return fetchAPI('/cart', {
      method: 'POST',
    })
  },

  async get(cartId: string): Promise<{ items: CartItem[]; subtotal: number }> {
    return fetchAPI(`/cart/${cartId}`)
  },

  async addItem(cartId: string, variantId: string, quantity: number): Promise<CartItem> {
    return fetchAPI(`/cart/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify({ variant_id: variantId, quantity }),
    })
  },

  async updateItem(cartId: string, itemId: string, quantity: number): Promise<CartItem> {
    return fetchAPI(`/cart/${cartId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  },

  async removeItem(cartId: string, itemId: string): Promise<void> {
    return fetchAPI(`/cart/${cartId}/items/${itemId}`, {
      method: 'DELETE',
    })
  },
}

// Orders API
export const ordersApi = {
  async checkout(data: {
    cart_id: string
    email: string
    shipping_address?: {
      name: string
      street: string
      city: string
      state: string
      zip: string
      phone: string
    }
    is_pickup: boolean
  }): Promise<Order> {
    return fetchAPI('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async get(orderId: string): Promise<Order> {
    return fetchAPI(`/orders/${orderId}`)
  },
}

// Contact API
export const contactApi = {
  async submit(data: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<{ message: string }> {
    return fetchAPI('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

// Auth API (for future use)
export const authApi = {
  async login(email: string, password: string): Promise<{ access_token: string; user: any }> {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async register(data: {
    email: string
    password: string
    full_name: string
  }): Promise<{ access_token: string; user: any }> {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async getProfile(token: string): Promise<any> {
    return fetchAPI('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}