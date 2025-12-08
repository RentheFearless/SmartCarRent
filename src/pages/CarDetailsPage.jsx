// src/pages/CarDetailsPage.jsx

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

const mockCarData = { 
    '1': { id: '1', name: 'Audi A6', price: 60, image: 'audi-a6.jpg' }, 
    '2': { id: '2', name: 'BMW X5', price: 120, image: 'bmw-x5.jpg' }, 
    '3': { id: '3', name: 'Tesla Model 3', price: 90, image: 'tesla-3.jpg' }
}; 

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  
  const car = mockCarData[id] || { id: id, name: `Автомобіль #${id} (Дані відсутні)`, price: 0 };

  const handleOrderCar = () => {
    if (!isAuthenticated) {
      alert('Будь ласка, увійдіть, щоб зробити замовлення.');
      navigate('/login');
      return;
    }
    
    // Перенаправлення на сторінку оформлення
    navigate(`/order/${car.id}/confirm`); 
  };

  return (
    <div className="car-details-page container my-5">
      <Link to="/fleet" className="btn btn-secondary mb-4">← Назад до автопарку</Link>
      
      <div className="car-details-card">
        <h1 className="car-name">{car.name}</h1>
        <div className="car-image-placeholder" style={{height: '300px', backgroundColor: '#f0f0f0', marginBottom: '20px'}}>
            {/* 

[Image of car.image]
 */}
            <p style={{textAlign: 'center', paddingTop: '140px'}}>Місце для зображення</p>
        </div>
        <p className="car-price lead">**Ціна: ${car.price} / день**</p>
        
        <div className="car-info mt-4">
            <h4>Детальні характеристики</h4>
            <ul>
                <li>Рік випуску: 2023</li>
                <li>Тип палива: Бензин/Електро</li>
                <li>Мінімальний термін оренди: 1 доба</li>
            </ul>
        </div>
        
        <button 
          onClick={handleOrderCar} 
          className="btn btn-success btn-lg mt-4"
        >
          Замовити зараз
        </button>

        {!isAuthenticated && (
          <p className="alert alert-warning mt-3">⚠️ Для замовлення необхідно увійти!</p>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;