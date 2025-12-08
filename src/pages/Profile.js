import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Получаем данные пользователя
    const userStr = localStorage.getItem('user_data');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserData(user);
      } catch (e) {
        setUserData({});
      }
    } else {
      setUserData({});
    }

    // Получаем бронирования
    const savedBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    setBookings(savedBookings);
  }, [navigate]);

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Ви впевнені, що хочете скасувати це бронювання?')) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      localStorage.setItem('user_bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    }
  };

  if (!userData) {
    return <div className="profile-loading">Завантаження...</div>;
  }

  return (
    <div className="profile">
      <div className="container">
        <h1>Мій профіль</h1>
        
        <div className="profile-content">
          <div className="profile-info">
            <h2>Особисті дані</h2>
            <div className="info-card">
              <div className="info-item">
                <span className="info-label">Ім'я:</span>
                <span className="info-value">{userData.name || 'Не вказано'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email || 'Не вказано'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Телефон:</span>
                <span className="info-value">{userData.phone || 'Не вказано'}</span>
              </div>
            </div>
          </div>

          <div className="profile-bookings">
            <h2>Мої бронювання</h2>
            {bookings.length === 0 ? (
              <div className="no-bookings">
                <p>У вас поки немає бронювань</p>
                <a href="/catalog" className="browse-cars-btn">Переглянути каталог</a>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-image">
                      <img src={booking.carImage} alt={booking.carName} />
                    </div>
                    <div className="booking-info">
                      <h3>{booking.carName}</h3>
                      <div className="booking-details">
                        <div className="detail-item">
                          <span className="detail-label">Дата початку:</span>
                          <span className="detail-value">{new Date(booking.startDate).toLocaleDateString('uk-UA')}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Дата закінчення:</span>
                          <span className="detail-value">{new Date(booking.endDate).toLocaleDateString('uk-UA')}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Телефон:</span>
                          <span className="detail-value">{booking.phone}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Ціна:</span>
                          <span className="detail-value price">{booking.price} $</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Статус:</span>
                          <span className={`detail-value status ${booking.status || 'pending'}`}>
                            {booking.status === 'confirmed' ? 'Підтверджено' : 
                             booking.status === 'cancelled' ? 'Скасовано' : 'Очікує підтвердження'}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="cancel-booking-btn"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        Скасувати бронювання
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

