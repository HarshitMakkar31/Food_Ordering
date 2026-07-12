import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <div className="spinner" />
        <p className="status-msg">Loading orders...</p>
      </>
    );
  }

  return (
    <div className="page">
      <h1>My Orders</h1>
      {orders.length === 0 && <p className="status-msg">You haven't placed any orders yet.</p>}
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span>{new Date(order.createdAt).toLocaleString()}</span>
              <span className={`status-badge status-${order.status.replace(/\s/g, '-').toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
            <div className="order-footer">
              <span>{order.address}</span>
              <strong>Total: ₹{order.totalAmount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
