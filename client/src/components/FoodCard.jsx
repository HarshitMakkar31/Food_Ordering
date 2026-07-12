import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addToCart(food);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <div className="food-card">
      <div className="food-card-img-wrap">
        <img src={food.image} alt={food.name} onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      <div className="food-card-body">
        <h3>{food.name}</h3>
        <p className="food-desc">{food.description}</p>
        <div className="food-card-footer">
          <span className="price">₹{food.price}</span>
          <button
            className={`add-btn${justAdded ? ' added' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
