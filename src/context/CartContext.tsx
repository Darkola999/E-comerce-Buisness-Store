import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('cartItems');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, qty: entry.qty + 1 } : entry))
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((entry) => (entry.id === id ? { ...entry, qty: entry.qty - 1 } : entry))
        .filter((entry) => entry.qty > 0)
    );
  };

  const setQty = (id: string, qty: number) => {
    const nextQty = Math.max(0, qty);
    setCartItems((prev) =>
      prev
        .map((entry) => (entry.id === id ? { ...entry, qty: nextQty } : entry))
        .filter((entry) => entry.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      addToCart,
      increaseQty,
      decreaseQty,
      setQty,
      removeItem,
      clearCart,
    }),
    [cartItems, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
