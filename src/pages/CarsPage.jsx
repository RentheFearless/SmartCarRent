// client/src/pages/CarsPage.jsx

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cars } from '../data/carsData.js'; 
import CarCard from '../components/ui/CarCard.jsx'; 

// 1. Список Категорій для кнопок фільтра
const CATEGORIES = [
  'Всі', 
  'Електро', 
  'Кросовер', 
  'Середній', 
  'Бізнес', 
  'Економ', 
  'Преміум'
];

function CarsPage() { 
    // Ігноруємо useSearchParams поки що, але залишаємо для майбутнього використання
    const [searchParams] = useSearchParams();
    
    // 2. НОВИЙ СТАН для відстеження обраної категорії
    const [selectedCategory, setSelectedCategory] = useState('Всі');

    // Функція для зміни категорії
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // 3. Оновлення логіки фільтрації
    const displayedCars = useMemo(() => {
        let currentCars = cars;
        
        // Фільтрація за обраною категорією
        if (selectedCategory !== 'Всі') {
            currentCars = currentCars.filter(car => 
                car.class === selectedCategory
            );
        }
        
        return currentCars;
    }, [selectedCategory]); // Залежність: перераховуємо при зміні selectedCategory

    // ----------------------------------------------------
    // УМОВНИЙ РЕНДЕРИНГ (якщо список порожній)

    if (displayedCars.length === 0) {
        return (
            <div className="container py-5 text-center" style={{ minHeight: '50vh' }}>
                <h2>На жаль, автомобілів категорії "{selectedCategory}" не знайдено. 😔</h2>
                <p>Спробуйте обрати іншу категорію.</p>
            </div>
        );
    }
    
    // ----------------------------------------------------
    // ОСНОВНИЙ РЕНДЕРИНГ СПИСКУ

    return (
        <div className="container py-5">
            <h1 className="mb-4">Автопарк ({displayedCars.length})</h1>

            {/* 4. Блок Фільтрації (Кнопки) */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        // Стилі Bootstrap для активної/неактивної кнопки
                        className={`btn btn-sm ${
                            selectedCategory === category ? 'btn-danger' : 'btn-outline-secondary'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            {/* Сітка Bootstrap для відображення карток */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {displayedCars.map(car => (
                    <div key={car.id} className="col">
                        <CarCard car={car} /> 
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarsPage;