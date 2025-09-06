import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '@/types';
import toast from 'react-hot-toast';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product._id === product._id);
          
          if (existingItem) {
            // Update quantity if item already exists
            const updatedItems = state.items.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            toast.success(`Đã cập nhật số lượng ${product.name}`);
            return { items: updatedItems };
          } else {
            // Add new item
            const newItem: CartItem = { product, quantity };
            toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const item = state.items.find(item => item.product._id === productId);
          if (item) {
            toast.success(`Đã xóa ${item.product.name} khỏi giỏ hàng`);
          }
          return {
            items: state.items.filter(item => item.product._id !== productId)
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.product._id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Đã xóa tất cả sản phẩm khỏi giỏ hàng');
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getItem: (productId: string) => {
        const { items } = get();
        return items.find(item => item.product._id === productId);
      },
    }),
    {
      name: 'wool-shop-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
