import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarCard.css';

function CarCard({ car, onBook }) {
  const [imageError, setImageError] = useState(false);
  
  const handleBook = (e) => {
    e.preventDefault();
    if (onBook) {
      onBook(car);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/car/${car.id}`} className="car-card-link">
      <div className="car-card">
        {car.new && <div className="car-badge new">НОВИНКА</div>}
        {car.discount && (
          <div className="car-badge discount">Акція -{car.discount}%</div>
        )}
        {car.available && (
          <div className="availability-badge">Доступний</div>
        )}
        <div className="car-image">
          {!imageError && car.image ? (
            <img 
              src={car.image} 
              alt={car.name}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">
              <span>{car.name}</span>
            </div>
          )}
        </div>
        <div className="car-info">
          <h3>{car.name}</h3>
          <div className="car-quick-info">
            <span className="car-class">{car.class || car.category}</span>
            <span className="car-seats">👥 {car.seats || 'N/A'}</span>
            <span className="car-fuel">{car.fuelType || 'N/A'}</span>
          </div>
          <div className="car-price">
            {car.originalPrice && (
              <span className="original-price">від {car.originalPrice} $</span>
            )}
            <span className="current-price">від {car.price} $</span>
          </div>
          <button 
            className="book-btn" 
            onClick={handleBook}
            type="button"
          >
            Бронювати
          </button>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;

