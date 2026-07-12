import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address || '');
  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function placeOrder() {
    if (!user) {
      navigate('/login');
      return;
    }
    if (items.length === 0) return;
    setPlacing(true);
    setMessage('');
    try {
      await api.post('/orders', { items, address });
      clearCart();
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p className="status-msg">Your cart is empty. Go add something tasty!</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-row" key={item.food}>
            <span className="cart-name">{item.name}</span>
            <div className="qty-control">
              <button onClick={() => updateQuantity(item.food, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.food, item.quantity + 1)}>+</button>
            </div>
            <span className="cart-price">₹{item.price * item.quantity}</span>
            <button className="remove-btn" onClick={() => removeFromCart(item.food)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <label>
          Delivery Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
        </label>
        <div className="total-row">
          <strong>Total: ₹{totalAmount}</strong>
        </div>
        {message && <p className="status-msg">{message}</p>}
        <button className="primary-btn" onClick={placeOrder} disabled={placing}>
          {placing ? 'Placing order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
