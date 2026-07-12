import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  function addToCart(food) {
    setItems((prev) => {
      const existing = prev.find((i) => i.food === food._id);
      if (existing) {
        return prev.map((i) =>
          i.food === food._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { food: food._id, name: food.name, price: food.price, quantity: 1 }];
    });
  }

  function updateQuantity(foodId, quantity) {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.food === foodId ? { ...i, quantity } : i)));
  }

  function removeFromCart(foodId) {
    setItems((prev) => prev.filter((i) => i.food !== foodId));
  }

  function clearCart() {
    setItems([]);
  }

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
