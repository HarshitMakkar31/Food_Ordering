import { useCart } from '../context/CartContext';

export default function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} onError={(e) => { e.target.style.display = 'none'; }} />
      <div className="food-card-body">
        <h3>{food.name}</h3>
        <p className="food-desc">{food.description}</p>
        <div className="food-card-footer">
          <span className="price">₹{food.price}</span>
          <button onClick={() => addToCart(food)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
