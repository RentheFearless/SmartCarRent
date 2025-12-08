import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { cars, categories, fuelTypes, ecoRatings, seatOptions } from '../data/cars';
import '../styles/Catalog.css';
import '../styles/Home.css';

function Catalog() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedFuel, setSelectedFuel] = useState('Всі');
  const [selectedEco, setSelectedEco] = useState('Всі');
  const [selectedSeats, setSelectedSeats] = useState('Всі');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);

  useEffect(() => {
    let filtered = cars;

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(car => car.category === selectedCategory);
    }

    // Фильтр по типу топлива
    if (selectedFuel !== 'Всі') {
      filtered = filtered.filter(car => car.fuelType === selectedFuel);
    }

    // Фильтр по экологичности
    if (selectedEco !== 'Всі') {
      filtered = filtered.filter(car => car.ecoRating === selectedEco);
    }

    // Фильтр по количеству мест
    if (selectedSeats !== 'Всі') {
      filtered = filtered.filter(car => car.seats === parseInt(selectedSeats));
    }

    // Фильтр по цене
    filtered = filtered.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);

    // Поиск по названию
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  }, [selectedCategory, selectedFuel, selectedEco, selectedSeats, priceRange, searchTerm]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleBook = (car) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      alert('Будь ласка, увійдіть або зареєструйтесь для бронювання');
      return;
    }
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const phone = formData.get('phone');

    // Создаем бронирование
    const booking = {
      id: Date.now(),
      carId: selectedCar.id,
      carName: selectedCar.name,
      carImage: selectedCar.image,
      startDate: startDate,
      endDate: endDate,
      phone: phone,
      price: selectedCar.price,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Сохраняем в localStorage
    const existingBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('user_bookings', JSON.stringify(existingBookings));

    alert('Бронювання успішно відправлено!');
    setShowBookingModal(false);
    setSelectedCar(null);
  };

  return (
    <div className="catalog">
      <div className="container">
        <h1>Каталог автомобілів</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Пошук за назвою, маркою або моделлю..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="catalog-filters">
          <div className="filter-section">
            <h3>Категорія:</h3>
            <div className="filter-buttons">
              {Object.entries(categories).map(([key, value]) => (
                <button
                  key={key}
                  className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Тип палива:</h3>
            <select 
              value={selectedFuel} 
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="filter-select"
            >
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Екологічність:</h3>
            <select 
              value={selectedEco} 
              onChange={(e) => setSelectedEco(e.target.value)}
              className="filter-select"
            >
              {ecoRatings.map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Кількість місць:</h3>
            <select 
              value={selectedSeats} 
              onChange={(e) => setSelectedSeats(e.target.value)}
              className="filter-select"
            >
              {seatOptions.map(seats => (
                <option key={seats} value={seats}>{seats}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>Ціна: від {priceRange[0]} $ до {priceRange[1]} $</h3>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="price-range"
            />
          </div>
        </div>
        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} onBook={handleBook} />
          ))}
        </div>
        {filteredCars.length === 0 && (
          <p className="no-cars">Автомобілів в цій категорії не знайдено</p>
        )}
      </div>

      {showBookingModal && selectedCar && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            <h2>Бронювання {selectedCar.name}</h2>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Дата початку оренди:</label>
                <input type="date" name="startDate" required />
              </div>
              <div className="form-group">
                <label>Дата закінчення оренди:</label>
                <input type="date" name="endDate" required />
              </div>
              <div className="form-group">
                <label>Телефон:</label>
                <input type="tel" name="phone" placeholder="+38 (0XX) XXX XX XX" required />
              </div>
              <button type="submit" className="submit-btn">Забронювати</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;

