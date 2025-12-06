// src/pages/CarPage.jsx (Оновлена версія для вибору дат)

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { useCart } from '../contexts/CartContext';

// Допоміжна функція для обчислення кількості діб
const calculateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (endDate <= startDate) return 0;
  
  // 1000 мс * 60 с * 60 хв * 24 год = 86400000 мс в добі
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

// Отримання сьогоднішньої дати у форматі YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function CarPage() {
  const { id } = useParams();
  const carId = parseInt(id, 10);
  const car = cars.find(c => c.id === carId);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const today = getTodayDate();
  
  const [dates, setDates] = useState({ 
    startDate: today, 
    endDate: today 
  });
  const [error, setError] = useState('');

  if (!car) {
    return <div style={{ padding: '2rem' }}><h2>Автомобіль не знайдено 😔</h2></div>;
  }

  const days = calculateDays(dates.startDate, dates.endDate);
  const totalPrice = car.pricePerDay * days;
  
  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleRent = (e) => {
    e.preventDefault();

    if (days <= 0) {
      setError('Необхідно обрати дату повернення, пізнішу за дату початку оренди.');
      return;
    }

    // В реальності, тут має бути перевірка доступності авто на ці дати

    const rentItem = {
      id: car.id,
      title: car.title,
      pricePerDay: car.pricePerDay,
      deposit: car.deposit, // Включіть deposit
      days: days,
      startDate: dates.startDate,
      endDate: dates.endDate,
      total: totalPrice,
    };

    addToCart(rentItem);
    navigate('/checkout');
  };

  return (
    <div style={styles.page}>
      <button onClick={() => navigate('/park')} style={styles.backButton}>
        ← Назад до автопарку
      </button>

      <h2>{car.title} ({car.year})</h2>
      
      <div style={styles.mainContent}>
        
        {/* ЛІВА КОЛОНКА: Деталі... (залишаємо без змін) */}
        <div style={styles.details}>
          <img 
            src={`/src/assets/images/${car.image}`} 
            alt={car.title} 
            style={styles.detailImage} 
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/500x300?text=Car+Image" }}
          />
          <p style={styles.price}>
            Ціна оренди: <strong>{car.pricePerDay} $ / доба</strong>
          </p>
          {/* ... характеристики та опис ... */}
        </div>

        {/* ПРАВА КОЛОНКА: Форма оренди з датами */}
        <div style={styles.formContainer}>
          <h3>Замовити оренду</h3>
          <form onSubmit={handleRent} style={styles.form}>
            
            {/* Поле: Дата початку */}
            <label htmlFor="startDate" style={styles.label}>Дата початку:</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={dates.startDate}
              onChange={handleDateChange}
              min={today}
              required
              style={styles.input}
            />
            
            {/* Поле: Дата повернення */}
            <label htmlFor="endDate" style={styles.label}>Дата повернення:</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={dates.endDate}
              onChange={handleDateChange}
              min={dates.startDate || today} // Дата повернення не може бути раніше дати початку
              required
              style={styles.input}
            />
            
            <p style={styles.total}>
              Кількість діб: <strong>{days}</strong>
            </p>
            <p style={styles.total}>
              Загальна сума оренди: 
              <strong> {totalPrice} $</strong>
            </p>

            {error && <p style={styles.error}>{error}</p>}
            
            <button type="submit" style={styles.submitButton}>
              Додати до кошика
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
    // ... (залишаємо стилі без змін)
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    backButton: { background: 'none', border: 'none', color: '#005bbb', cursor: 'pointer', marginBottom: '1rem' },
    mainContent: { display: 'flex', gap: '40px', marginTop: '2rem', flexWrap: 'wrap' },
    details: { flex: '2', minWidth: '300px' },
    detailImage: { width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' },
    price: { fontSize: '1.2rem', fontWeight: 'bold', color: '#005bbb' },
    formContainer: { flex: '1', minWidth: '300px', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', height: 'fit-content' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontWeight: 'bold' },
    input: { padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' },
    total: { fontSize: '1.1rem', marginTop: '0.5rem' },
    error: { color: 'red', fontSize: '0.9rem' },
    submitButton: { backgroundColor: '#e94e77', color: 'white', border: 'none', padding: '0.8rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }
};