import { createContext, useContext, useEffect, useRef, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  function showToast(message) {
    setToast({ message, id: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

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
    showToast(`${food.name} added to cart`);
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
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount, totalCount, toast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
