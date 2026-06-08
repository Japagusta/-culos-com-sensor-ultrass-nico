import { useState, useEffect, useCallback } from 'react';

const CART_STORAGE_KEY = 'naviglasses_cart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const item = window.localStorage.getItem(CART_STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback(() => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === 'naviglasses');
      if (existingItem) {
        if (existingItem.quantity >= 5) return currentItems;
        return currentItems.map((item) =>
          item.id === 'naviglasses' ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...currentItems,
        {
          id: 'naviglasses',
          name: 'NaviGlasses',
          price: 550,
          quantity: 1,
          image: '/naviglasses-product.png',
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, Math.min(5, item.quantity + delta));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
  };
}
