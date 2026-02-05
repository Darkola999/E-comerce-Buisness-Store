import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type OrderItem = {
  name: string;
  qty: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: 'En attente' | 'Livre' | 'En preparation' | 'Annule';
  items: OrderItem[];
};

type CreateOrderInput = {
  items: OrderItem[];
  total: number;
};

type OrdersContextValue = {
  orders: Order[];
  addOrder: (order: CreateOrderInput) => void;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

const ORDERS_KEY = 'orders';
const ORDER_SEQ_KEY = 'orderSequence';

const getNextOrderNumber = () => {
  const raw = window.localStorage.getItem(ORDER_SEQ_KEY);
  const current = raw ? Number(raw) : 109;
  const next = Number.isFinite(current) ? current + 1 : 110;
  window.localStorage.setItem(ORDER_SEQ_KEY, String(next));
  return next;
};

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(ORDERS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Order[];
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      } catch {
        setOrders([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: CreateOrderInput) => {
    const now = new Date();
    const orderNumber = getNextOrderNumber();
    const nextOrder: Order = {
      id: `ORD-${now.getFullYear()}-${orderNumber}`,
      date: now.toISOString().slice(0, 10),
      total: order.total,
      status: 'En attente',
      items: order.items,
    };
    setOrders((prev) => [nextOrder, ...prev]);
  };

  const value = useMemo(
    () => ({
      orders,
      addOrder,
    }),
    [orders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
};
