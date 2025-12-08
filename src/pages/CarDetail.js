import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { cars } from '../data/cars';
import '../styles/CarDetail.css';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const token = localStorage.getItem('jwt_token');

  useEffect(() => {
    const foundCar = cars.find(c => c.id === parseInt(id));
    if (foundCar) {
      setCar(foundCar);
    } else {
      navigate('/catalog');
    }
  }, [id, navigate]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const phone = formData.get('phone');

    const booking = {
      id: Date.now(),
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      startDate: startDate,
      endDate: endDate,
      phone: phone,
      price: car.price,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('user_bookings', JSON.stringify(existingBookings));

    alert('Бронювання успішно відправлено!');
    setShowBookingModal(false);
  };

  if (!car) {
    return <div className="car-detail-loading">Завантаження...</div>;
  }

  return (
    <div className="car-detail">
      <div className="container">
        <Link to="/catalog" className="back-link">← Назад до каталогу</Link>
        
        <div className="car-detail-content">
          <div className="car-detail-image">
            <img src={car.image} alt={car.name} />
            {car.new && <div className="car-badge new">НОВИНКА</div>}
            {car.discount && (
              <div className="car-badge discount">Акція -{car.discount}%</div>
            )}
            {car.available && (
              <div className="availability-badge available">Доступний</div>
            )}
          </div>

          <div className="car-detail-info">
            <div className="car-header">
              <h1>{car.name}</h1>
              <div className="car-price-section">
                {car.originalPrice && (
                  <span className="original-price">від {car.originalPrice} $</span>
                )}
                <span className="current-price">від {car.price} $ / добу</span>
              </div>
            </div>

            <div className="car-specs">
              <h2>Характеристики</h2>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Марка:</span>
                  <span className="spec-value">{car.brand}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Модель:</span>
                  <span className="spec-value">{car.model}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Клас:</span>
                  <span className="spec-value">{car.class}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Тип палива:</span>
                  <span className="spec-value">{car.fuelType}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Екологічність:</span>
                  <span className="spec-value">{car.ecoRating}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Кількість місць:</span>
                  <span className="spec-value">{car.seats}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Двигун:</span>
                  <span className="spec-value">{car.engine}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Потужність:</span>
                  <span className="spec-value">{car.power}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Коробка передач:</span>
                  <span className="spec-value">{car.transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Привід:</span>
                  <span className="spec-value">{car.drive}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Рік:</span>
                  <span className="spec-value">{car.year}</span>
                </div>
                {car.batteryRange && (
                  <div className="spec-item">
                    <span className="spec-label">Запас ходу:</span>
                    <span className="spec-value">{car.batteryRange}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="car-options">
              <h2>Додаткові опції</h2>
              <div className="options-list">
                {car.options.map((option, index) => (
                  <span key={index} className="option-badge">{option}</span>
                ))}
              </div>
            </div>

            <div className="car-description">
              <h2>Опис</h2>
              <p>{car.description}</p>
            </div>

            <div className="car-actions">
              <button 
                className="book-btn"
                onClick={() => {
                  if (!token) {
                    alert('Будь ласка, увійдіть або зареєструйтесь для бронювання');
                    return;
                  }
                  setShowBookingModal(true);
                }}
              >
                Забронювати
              </button>
              {car.available && (
                <button 
                  className="track-btn"
                  onClick={() => setShowTracking(true)}
                >
                  Відстежити авто
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            <h2>Бронювання {car.name}</h2>
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

      {showTracking && (
        <div className="modal-overlay" onClick={() => setShowTracking(false)}>
          <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTracking(false)}>×</button>
            <h2>Відстеження {car.name}</h2>
            <TrackingMap car={car} />
          </div>
        </div>
      )}
    </div>
  );
}

function TrackingMap({ car }) {
  const [position, setPosition] = useState([50.4501, 30.5234]); // Киев [lat, lng]
  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState('На парковці');

  useEffect(() => {
    // Имитация GPS отслеживания
    const interval = setInterval(() => {
      // Случайное изменение позиции (имитация движения)
      setPosition(prev => [
        prev[0] + (Math.random() - 0.5) * 0.001,
        prev[1] + (Math.random() - 0.5) * 0.001
      ]);
      
      const newSpeed = Math.floor(Math.random() * 60);
      setSpeed(newSpeed);
      setStatus(newSpeed > 0 ? 'В русі' : 'На парковці');
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Создаем кастомную иконку для автомобиля
  const carIcon = L.divIcon({
    className: 'custom-car-icon',
    html: `<div style="
      background: #007bff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">🚗</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <div className="tracking-content">
      <div className="tracking-info">
        <div className="tracking-item">
          <span className="tracking-label">Статус:</span>
          <span className={`tracking-value status ${status === 'В русі' ? 'moving' : 'parked'}`}>
            {status}
          </span>
        </div>
        <div className="tracking-item">
          <span className="tracking-label">Швидкість:</span>
          <span className="tracking-value">{speed} км/год</span>
        </div>
        <div className="tracking-item">
          <span className="tracking-label">Координати:</span>
          <span className="tracking-value">{position[0].toFixed(6)}, {position[1].toFixed(6)}</span>
        </div>
      </div>
      <div className="tracking-map-container">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '400px', width: '100%', borderRadius: '8px' }}
          key={`${position[0]}-${position[1]}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={carIcon}>
            <Popup>
              <strong>{car.name}</strong><br />
              Статус: {status}<br />
              Швидкість: {speed} км/год
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <p className="tracking-note">* Імітація GPS-відстеження в реальному часі</p>
    </div>
  );
}

export default CarDetail;

