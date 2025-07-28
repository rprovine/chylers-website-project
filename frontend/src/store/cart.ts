import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem } from '@/types'
import { cartApi } from '@/lib/api'
import { toast } from 'react-hot-toast'

interface CartState {
  cart: Cart | null
  isLoading: boolean
  isOpen: boolean
  fetchCart: () => Promise<void>
  addItem: (variantId: string, quantity: number, properties?: any) => Promise<void>
  updateItem: (itemId: number, quantity: number) => Promise<void>
  removeItem: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
  applyDiscount: (code: string) => Promise<void>
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      isOpen: false,
      
      fetchCart: async () => {
        set({ isLoading: true })
        try {
          const response = await cartApi.get()
          set({ cart: response.data, isLoading: false })
        } catch (error) {
          console.error('Failed to fetch cart:', error)
          set({ isLoading: false })
        }
      },
      
      addItem: async (variantId: string, quantity: number, properties?: any) => {
        set({ isLoading: true })
        try {
          const response = await cartApi.addItem(variantId, quantity, properties)
          set({ cart: response.data, isLoading: false })
          toast.success('Added to cart!')
          get().openCart()
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      updateItem: async (itemId: number, quantity: number) => {
        set({ isLoading: true })
        try {
          const response = await cartApi.updateItem(itemId, quantity)
          set({ cart: response.data, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      removeItem: async (itemId: number) => {
        set({ isLoading: true })
        try {
          const response = await cartApi.removeItem(itemId)
          set({ cart: response.data, isLoading: false })
          toast.success('Removed from cart')
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      clearCart: async () => {
        set({ isLoading: true })
        try {
          await cartApi.clear()
          set({ cart: null, isLoading: false })
          toast.success('Cart cleared')
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      applyDiscount: async (code: string) => {
        set({ isLoading: true })
        try {
          const response = await cartApi.applyDiscount(code)
          set({ cart: response.data, isLoading: false })
          toast.success('Discount applied!')
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },
      
      openCart: () => {
        set({ isOpen: true })
      },
      
      closeCart: () => {
        set({ isOpen: false })
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        isOpen: false // Don't persist cart open state
      }),
    }
  )
)