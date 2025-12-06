// src/pages/Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cars } from '../data/cars'; 
import CarCard from '../components/ui/CarCard';

export default function Home() {
  const navigate = useNavigate();
  
  // Функціонал: пошук
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Перенаправлення на сторінку парку з параметрами пошуку
    navigate(`/park?search=${searchTerm}`);
  };

  // ✅ ФУНКЦІОНАЛ ВИПРАВЛЕНО: Відображення лише перших 3-х "топ" авто
  const topCars = cars.slice(0, 3); 

  return (
    <div style={styles.container}>
      {/* Секція Hero */}
      <div style={styles.hero}>
        <h1>SmartCarRent: Оренда авто без зайвого клопоту</h1>
        <p>Ваш надійний партнер на дорогах Львова та України. Преміум, бізнес та багато іншого.</p>
        
        {/* Форма пошуку */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Яку марку чи модель шукаєте?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Знайти авто</button>
        </form>
      </div>

      {/* Секція "Топ Пропозиції" */}
      <h2 style={styles.sectionTitle}>🔥 Топ-пропозиції місяця</h2>
      <div style={styles.carList}>
        {topCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      
      <div style={styles.cta}>
        <button 
          onClick={() => navigate('/park')} 
          style={styles.ctaButton}
        >
          Переглянути весь автопарк (Всі {cars.length} авто)
        </button>
      </div>

    </div>
  );
}

const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    hero: {
        textAlign: 'center',
        padding: '5rem 1rem', 
        background: 'linear-gradient(135deg, #f4f7fa 0%, #e0eafc 100%)', 
        borderRadius: '15px',
        marginBottom: '3rem',
        boxShadow: '0 10px 30px rgba(0, 91, 187, 0.05)',
    },
    heroText: {
        fontSize: '1.2rem',
        color: '#555',
        marginBottom: '2rem',
    },
    searchForm: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        gap: '10px',
    },
    searchInput: {
        padding: '1rem 1.5rem',
        fontSize: '1.1rem',
        borderRadius: '8px',
        border: '2px solid #005bbb',
        width: '400px',
    },
    searchButton: {
        backgroundColor: '#005bbb',
        color: 'white',
        border: 'none',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontWeight: 'bold',
    },
    sectionTitle: {
        textAlign: 'center',
        margin: '3rem 0 1.5rem 0',
        color: '#e94e77', 
        fontSize: '2rem',
        borderBottom: '3px solid #f9d8e0',
        display: 'inline-block',
        paddingBottom: '0.5rem'
    },
    carList: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '30px',
    },
    cta: {
        textAlign: 'center',
        marginTop: '4rem',
    },
    ctaButton: {
        backgroundColor: '#e94e77', 
        color: 'white',
        border: 'none',
        padding: '1.2rem 3rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
};