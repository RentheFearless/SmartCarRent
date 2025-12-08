// src/pages/OrderConfirmationPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { carId } = useParams();

  return (
    <div className="confirmation-container container my-5 text-center">
      <h2 className="text-success mb-3" style={{color: '#28a745'}}>✅ Ваше бронювання підтверджено!</h2>
      <p className="lead mb-4">
        Дякуємо, що обрали Olimp Rent Car! Замовлення на авто #{carId} оформлено.
      </p>
      <p className="text-muted mb-5">
        Наш менеджер зв'яжеться з вами протягом години для узгодження всіх деталей.
      </p>
      
      <div className="d-flex justify-content-center" style={{marginTop: '30px'}}>
        <Link to="/profile" className="btn btn-primary btn-lg mx-2" style={{marginRight: '10px'}}>
          Перейти до Моїх Замовлень
        </Link>
        <Link to="/" className="btn btn-secondary btn-lg mx-2" style={{backgroundColor: '#6c757d', color: 'white'}}>
          Повернутися на Головну
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;