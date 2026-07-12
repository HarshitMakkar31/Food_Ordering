import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [bump, setBump] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setBump(true);
    const t = setTimeout(() => setBump(false), 320);
    return () => clearTimeout(t);
  }, [totalCount]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🍔 FoodExpress</Link>
      <div className="nav-links">
        <Link to="/">Menu</Link>
        <Link to="/cart" className="cart-link">
          Cart
          <span className={`cart-badge${bump ? ' bump' : ''}`}>{totalCount}</span>
        </Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-cta">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
