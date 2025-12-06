// src/components/ui/CarCard.jsx (ОНОВЛЕНА ВЕРСІЯ - Фокус на стилях)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarImage from './CarImage'; // Використовуємо новий компонент

export default function CarCard({ car }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate(`/car/${car.id}`)}>
      
      {/* 1. Зображення */}
      <CarImage 
        src={`/src/assets/images/${car.image}`} 
        alt={car.title} 
        style={styles.image} 
      />

      {/* 2. Контент */}
      <div style={styles.content}>
        <h3 style={styles.title}>{car.title}</h3>
        
        {/* Характеристики */}
        <div style={styles.specs}>
          <p style={styles.specItem}>⚙️ {car.transmission}</p>
          <p style={styles.specItem}>⛽ {car.fuel}</p>
          <p style={styles.specItem}>📅 {car.year}</p>
        </div>
        
        {/* Ціна та CTA */}
        <div style={styles.footer}>
          <span style={styles.price}>
            {car.pricePerDay} $ <small>/ доба</small>
          </span>
          <button 
            onClick={(e) => { 
                e.stopPropagation(); // Запобігаємо переходу на CarPage при кліку на кнопку
                navigate(`/car/${car.id}`); 
            }}
            style={styles.button}
          >
            Орендувати
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
    card: {
        width: '320px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        backgroundColor: '#fff',
        // Імітуємо :hover
        ':hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' },
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderBottom: '1px solid #e0e0e0',
    },
    content: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '1.25rem',
        margin: '0 0 0.5rem 0',
        color: '#005bbb',
        minHeight: '40px',
    },
    specs: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        padding: '0.5rem 0',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
    },
    specItem: {
        fontSize: '0.9rem',
        color: '#555',
        margin: 0,
        fontWeight: 'bold',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.5rem',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: '900',
        color: '#e94e77', // Акцентний колір
    },
    button: {
        backgroundColor: '#005bbb',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        // Імітуємо :hover
        ':hover': { backgroundColor: '#004a99' },
    }
};