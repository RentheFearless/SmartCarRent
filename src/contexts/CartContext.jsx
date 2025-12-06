// src/contexts/CartContext.js (ОНОВЛЕНА ВЕРСІЯ)

import { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Допоміжна функція для обчислення кількості діб (дублюємо з CarPage для надійності)
const calculateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (endDate <= startDate) return 0;
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ... (items, useEffect, totals залишаються без змін) ...
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Помилка читання кошика з localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error("Помилка запису кошика в localStorage:", error);
    }
  }, [items]);

  const totals = useMemo(() => {
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    const totalDeposit = items.reduce((sum, item) => sum + (item.deposit || 0), 0);
    const totalItems = items.length;
    return { totalAmount, totalDeposit, totalItems };
  }, [items]);
  // ... (кінець незмінної частини) ...


  const addToCart = (newItem) => {
    // ... (залишається без змін) ...
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = newItem; 
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // 💥 НОВА ФУНКЦІЯ: оновлення дат оренди
  const updateItemDates = (id, newStartDate, newEndDate) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          const days = calculateDays(newStartDate, newEndDate);
          
          // Тільки якщо дати коректні та дні > 0, оновлюємо
          if (days > 0) {
            return {
              ...item,
              startDate: newStartDate,
              endDate: newEndDate,
              days: days,
              total: item.pricePerDay * days, // Перерахунок суми
            };
          }
        }
        return item; // Повертаємо незмінний елемент, якщо ID не збігається або дати невірні
      });
    });
  };
  // ------------------------------------

  const clearCart = () => {
    setItems([]);
  };

  const contextValue = {
    items,
    ...totals,
    addToCart,
    removeFromCart,
    clearCart,
    updateItemDates, // 👈 Додаємо нову функцію
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};