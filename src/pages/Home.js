import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { cars } from '../data/cars';
import '../styles/Home.css';

function Home() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const token = localStorage.getItem('jwt_token');

  const featuredCars = cars.filter(car => car.featured);
  const newCars = cars.filter(car => car.new);

  const handleBook = (car) => {
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
    <div className="home">
      <section className="hero">
        <div className="container">
          <h2>НОВИНКИ СЕЗОНУ 2025</h2>
          <div className="cars-grid">
            {newCars.map(car => (
              <CarCard key={car.id} car={car} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-cars">
        <div className="container">
          <h2>Популярні авто</h2>
          <div className="cars-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Категорії</h2>
          <div className="categories-grid">
            <Link to="/catalog?category=sport" className="category-card">
              <h3>Спорткари</h3>
            </Link>
            <Link to="/catalog?category=business" className="category-card">
              <h3>Бізнес клас</h3>
            </Link>
            <Link to="/catalog?category=premium" className="category-card">
              <h3>Преміум клас</h3>
            </Link>
            <Link to="/catalog?category=suv" className="category-card">
              <h3>Позашляховики</h3>
            </Link>
            <Link to="/catalog?category=minibus" className="category-card">
              <h3>Мікроавтобуси</h3>
            </Link>
            <Link to="/catalog?category=armored" className="category-card">
              <h3>Броньовані авто</h3>
            </Link>
          </div>
        </div>
      </section>

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

export default Home;

