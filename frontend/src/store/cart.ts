import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem } from '@/types'
import { cartApi } from '@/lib/api/client'
import { toast } from 'react-hot-toast'

interface CartState {
  cart: Cart | null
  cartId: string | null
  isLoading: boolean
  isOpen: boolean
  initCart: () => Promise<void>
  fetchCart: () => Promise<void>
  addItem: (variantId: string, quantity: number, properties?: any) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cartId: null,
      isLoading: false,
      isOpen: false,
      
      initCart: async () => {
        const state = get()
        if (!state.cartId) {
          try {
            const response = await cartApi.create()
            set({ cartId: response.cart_id })
          } catch (error) {
            console.error('Failed to create cart:', error)
          }
        }
      },
      
      fetchCart: async () => {
        const state = get()
        if (!state.cartId) {
          await state.initCart()
        }
        
        set({ isLoading: true })
        try {
          const cartId = get().cartId
          if (cartId) {
            const response = await cartApi.get(cartId)
            // Create a minimal cart object that satisfies the Cart interface
            const cart: Cart = {
              id: 0,
              session_id: cartId,
              items: response.items,
              subtotal: response.subtotal,
              total_amount: response.subtotal,
              tax_amount: 0,
              shipping_amount: 0,
              discount_amount: 0,
              discount_codes: [],
              is_active: true,
              created_at: new Date().toISOString(),
              items_count: response.items.length,
              is_free_shipping_eligible: response.subtotal >= 49
            }
            set({ cart, isLoading: false })
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error)
          set({ isLoading: false })
        }
      },
      
      addItem: async (variantId: string, quantity: number, properties?: any) => {
        const state = get()
        if (!state.cartId) {
          await state.initCart()
        }
        
        set({ isLoading: true })
        try {
          const cartId = get().cartId
          if (cartId) {
            await cartApi.addItem(cartId, variantId, quantity)
            await get().fetchCart()
            toast.success('Added to cart!')
            get().openCart()
          }
        } catch (error) {
          console.error('Failed to add item:', error)
          toast.error('Failed to add item to cart')
          set({ isLoading: false })
        }
      },
      
      updateItem: async (itemId: string, quantity: number) => {
        const cartId = get().cartId
        if (!cartId) return
        
        set({ isLoading: true })
        try {
          await cartApi.updateItem(cartId, itemId, quantity)
          await get().fetchCart()
        } catch (error) {
          console.error('Failed to update item:', error)
          toast.error('Failed to update item')
          set({ isLoading: false })
        }
      },
      
      removeItem: async (itemId: string) => {
        const cartId = get().cartId
        if (!cartId) return
        
        set({ isLoading: true })
        try {
          await cartApi.removeItem(cartId, itemId)
          await get().fetchCart()
          toast.success('Removed from cart')
        } catch (error) {
          console.error('Failed to remove item:', error)
          toast.error('Failed to remove item')
          set({ isLoading: false })
        }
      },
      
      clearCart: async () => {
        set({ cart: null, cartId: null })
        await get().initCart()
        toast.success('Cart cleared')
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
        cartId: state.cartId // Only persist cartId
      }),
    }
  )
)