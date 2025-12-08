// client/src/pages/ContactsPage.jsx

import React, { useState } from 'react';
// Імпортуємо іконки, які ми використовували у Footer
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

function ContactsPage() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        message: '' 
    });
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Імітація відправки даних
        console.log("Імітація відправки повідомлення:", formData);
        
        // 🟢 ТУТ БУДЕ ЛОГІКА ВЗАЄМОДІЇ З БЕКЕНД API для відправки email
        
        setIsSent(true);
        // Можна скинути форму, якщо потрібно: setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container py-5">
            <h1 className="text-center display-4 fw-bold mb-4 text-primary">Зв'яжіться з нами</h1>
            <p className="lead text-center mb-5 text-muted">
                Ми готові відповісти на всі ваші запитання щодо оренди автомобілів.
            </p>

            <div className="row">
                
                {/* === ЛІВА СЕКЦІЯ: КОНТАКТНА ІНФОРМАЦІЯ === */}
                <div className="col-lg-5 mb-4">
                    <h3 className="mb-3 text-danger">Наші дані</h3>
                    
                    <ul className="list-unstyled contact-list mb-5">
                        <li className="d-flex align-items-start mb-3">
                            <FaMapMarkerAlt className="me-3 text-warning mt-1" size={24} />
                            <div>
                                <h6 className="fw-bold">Адреса офісу</h6>
                                <p className="text-muted mb-0">м. Львів, вул. Підвальна, 17/А</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-3">
                            <FaPhoneAlt className="me-3 text-warning mt-1" size={24} />
                            <div>
                                <h6 className="fw-bold">Телефон</h6>
                                <p className="text-muted mb-0">+38 (123) 456-78-90</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-3">
                            <FaEnvelope className="me-3 text-warning mt-1" size={24} />
                            <div>
                                <h6 className="fw-bold">Електронна пошта</h6>
                                <p className="text-muted mb-0">info@drivelviv.ua</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-3">
                            <FaClock className="me-3 text-warning mt-1" size={24} />
                            <div>
                                <h6 className="fw-bold">Графік роботи</h6>
                                <p className="text-muted mb-0">Пн - Пт: 9:00 - 18:00, Сб: 10:00 - 15:00</p>
                            </div>
                        </li>
                    </ul>

                    {/* Карта (просто заглушка) */}
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <img 
                                src="https://via.placeholder.com/600x300/343a40/f8f9fa?text=Map+Placeholder" 
                                alt="Location Map"
                                className="img-fluid w-100 rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* === ПРАВА СЕКЦІЯ: ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ === */}
                <div className="col-lg-7">
                    <div className="card shadow-lg p-4 bg-light">
                        <h3 className="mb-4 text-primary">Надіслати нам повідомлення</h3>

                        {isSent ? (
                            <div className="alert alert-success text-center">
                                <FaCheckCircle size={50} className="mb-3" />
                                <h4 className="alert-heading">Дякуємо!</h4>
                                <p>Ваше повідомлення успішно надіслано. Ми зв'яжемося з вами найближчим часом.</p>
                                <button className="btn btn-success mt-2" onClick={() => setIsSent(false)}>Надіслати ще одне</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Ваше ім'я</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email для відповіді</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label">Ваше повідомлення</label>
                                    <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-danger btn-lg">Надіслати</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsPage;