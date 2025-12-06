// src/pages/CarPark.jsx (Виправлена версія)

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/ui/CarCard';
import CarFilter from '../components/ui/CarFilter'; 
import { cars } from '../data/cars';

export default function CarPark() {
  const [activeFilters, setActiveFilters] = useState({});
  const [searchParams] = useSearchParams();
  
  const urlSearchTerm = searchParams.get('search') || '';

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };
  
  const filteredCars = useMemo(() => {
    let currentCars = cars;

    // 1. Фільтрація за пошуковим терміном (з URL)
    if (urlSearchTerm) {
        const lowerSearch = urlSearchTerm.toLowerCase();
        currentCars = currentCars.filter(car => 
            car.title.toLowerCase().includes(lowerSearch) ||
            car.description.toLowerCase().includes(lowerSearch)
        );
    }
    
    // 2. Фільтрація за активними фільтрами (з CarFilter.jsx)
    return currentCars.filter(car => {
      
      // Фільтр: Клас авто
      if (activeFilters.class && car.class !== activeFilters.class) {
        return false;
      }
      
      // Фільтр: Трансмісія
      if (activeFilters.transmission && car.transmission !== activeFilters.transmission) {
        return false;
      }
      
      // Фільтр: Пальне
      if (activeFilters.fuel && car.fuel !== activeFilters.fuel) {
        return false;
      }

      // Фільтр: Мінімальна ціна
      const minPrice = parseInt(activeFilters.minPrice, 10);
      if (minPrice && car.pricePerDay < minPrice) {
        return false;
      }

      // Фільтр: Максимальна ціна
      const maxPrice = parseInt(activeFilters.maxPrice, 10);
      if (maxPrice && car.pricePerDay > maxPrice) {
        return false;
      }

      return true;
    });
  }, [activeFilters, urlSearchTerm]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Автопарк SmartCarRent</h1>
      {urlSearchTerm && (
        <p style={styles.searchResults}>
          Результати пошуку для: <strong>"{urlSearchTerm}"</strong>. Знайдено {filteredCars.length} авто.
        </p>
      )}
      <p>Оберіть ідеальний автомобіль для вашої поїздки.</p>
      
      <CarFilter onApplyFilters={handleApplyFilters} /> 

      <div style={styles.container}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p style={styles.noResults}>
            На жаль, за вашими критеріями **не знайдено** автомобілів. Спробуйте змінити пошук або фільтри.
          </p>
        )}
      </div>
    </div>
  );
}

// 💥 ОБ'ЄКТ STYLES, ЯКОГО БРАКУВАЛО
const styles = {
    searchResults: {
        fontSize: '1.1rem',
        color: '#e94e77',
        fontWeight: 'bold',
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#fff0f5', // Легкий рожевий фон
        borderRadius: '8px',
        borderLeft: '5px solid #e94e77',
    },
    container: {
        display: 'grid',
        // ✅ Використовуємо адаптивну сітку для карток
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginTop: '2rem',
        paddingBottom: '2rem',
    },
    noResults: {
        textAlign: 'center',
        fontSize: '1.4rem', // Збільшений шрифт
        color: '#005bbb',
        padding: '3rem',
        border: '2px dashed #005bbb', // Приваблива рамка
        borderRadius: '12px',
        width: '100%',
        gridColumn: '1 / -1', // Щоб займало всю ширину сітки
        backgroundColor: '#f4f7fa',
    }
};