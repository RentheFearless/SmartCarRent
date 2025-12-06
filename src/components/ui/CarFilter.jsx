// src/components/ui/CarFilter.jsx (ВИПРАВЛЕНА ВЕРСІЯ)

import React, { useState } from 'react';

const CAR_CLASSES = [
    "Економ", "Середній", "Бізнес", "Преміум", "Кросовер", 
    "Преміум SUV", "Позашляховик", "Електро", "Люкс", "Міні"
]; 

export default function CarFilter({ onApplyFilters }) {
  const [transmissionFilter, setTransmissionFilter] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [classFilter, setClassFilter] = useState(''); 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // ✅ ФУНКЦІЇ-ОБРОБНИКИ ТЕПЕР ВИЗНАЧЕНІ ВСЕРЕДИНІ КОМПОНЕНТА
  const handleApply = () => {
    const filters = {
      transmission: transmissionFilter,
      fuel: fuelFilter,
      class: classFilter, 
      minPrice,
      maxPrice,
    };
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setTransmissionFilter('');
    setFuelFilter('');
    setClassFilter(''); 
    setMinPrice('');
    setMaxPrice('');
    onApplyFilters({});
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Фільтри</h3>

      <div style={styles.filtersGrid}>
        
        {/* Фільтр Класу */}
        <select 
            value={classFilter} 
            onChange={(e) => setClassFilter(e.target.value)} 
            style={styles.select}
        >
            <option value="">Клас авто (Усі)</option>
            {CAR_CLASSES.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
            ))}
        </select>

        {/* Фільтр Трансмісії */}
        <select 
          value={transmissionFilter} 
          onChange={(e) => setTransmissionFilter(e.target.value)} 
          style={styles.select}
        >
          <option value="">Трансмісія</option>
          <option value="Автомат">Автомат</option>
          <option value="Механіка">Механіка</option>
        </select>

        {/* Фільтр Пального */}
        <select 
          value={fuelFilter} 
          onChange={(e) => setFuelFilter(e.target.value)} 
          style={styles.select}
        >
          <option value="">Пальне</option>
          <option value="Бензин">Бензин</option>
          <option value="Дизель">Дизель</option>
          <option value="Електро">Електро</option>
        </select>

        {/* Фільтр Ціни (Min) */}
        <input
          type="number"
          placeholder="Min $ / доба"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={styles.input}
        />

        {/* Фільтр Ціни (Max) */}
        <input
          type="number"
          placeholder="Max $ / доба"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.input}
        />
      </div>
      
      <div style={styles.buttonGroup}>
        {/* ✅ handleApply і handleClear тепер доступні */}
        <button onClick={handleApply} style={styles.applyButton}>
          Застосувати
        </button>
        <button onClick={handleClear} style={styles.clearButton}>
          Скинути
        </button>
      </div>
    </div>
  );
}

// ... (Блок const styles = { ... } залишається без змін)
const styles = {
    container: { 
        padding: '1.5rem', 
        marginBottom: '2rem', 
        backgroundColor: '#fff', 
        borderRadius: '10px', 
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e0e0e0'
    },
    title: { 
        fontSize: '1.25rem', 
        color: '#005bbb', 
        borderBottom: '2px solid #f0f0f0', 
        paddingBottom: '0.5rem', 
        marginBottom: '1rem' 
    },
    filtersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '15px',
        marginBottom: '1rem',
    },
    select: { 
        padding: '0.7rem 1rem', 
        border: '1px solid #ccc', 
        borderRadius: '6px', 
        fontSize: '1rem',
        backgroundColor: '#f9f9f9'
    },
    input: { 
        padding: '0.7rem 1rem', 
        border: '1px solid #ccc', 
        borderRadius: '6px', 
        fontSize: '1rem'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        paddingTop: '0.5rem'
    },
    applyButton: { 
        backgroundColor: '#005bbb', 
        color: 'white', 
        border: 'none', 
        padding: '0.7rem 1.5rem', 
        borderRadius: '6px', 
        cursor: 'pointer', 
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
    },
    clearButton: { 
        backgroundColor: '#f0f0f0', 
        color: '#333', 
        border: '1px solid #ccc', 
        padding: '0.7rem 1.5rem', 
        borderRadius: '6px', 
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    }
};