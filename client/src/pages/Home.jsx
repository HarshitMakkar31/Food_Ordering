import { useEffect, useState } from 'react';
import api from '../api/axios';
import FoodCard from '../components/FoodCard';

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/foods')
      .then(({ data }) => setFoods(data))
      .catch(() => setError('Could not load menu. Is the backend server running?'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(foods.map((f) => f.category))];
  const visible = category === 'All' ? foods : foods.filter((f) => f.category === category);

  if (loading) {
    return (
      <>
        <div className="spinner" />
        <p className="status-msg">Loading menu...</p>
      </>
    );
  }
  if (error) return <p className="status-msg error">{error}</p>;

  return (
    <div className="page">
      <h1>Today's Menu</h1>
      <div className="category-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? 'chip active' : 'chip'}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="food-grid">
        {visible.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
}
