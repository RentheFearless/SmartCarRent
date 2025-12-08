// src/pages/CarListPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const cars = [
    { id: '1', name: 'Audi A6', price: 60, description: 'Елегантний седан для ділових поїздок.' },
    { id: '2', name: 'BMW X5', price: 120, description: 'Потужний преміум-позашляховик.' },
    { id: '3', name: 'Tesla Model 3', price: 90, description: 'Екологічний спорт-седан.' },
];

const CarListPage = () => {
    return (
        <div className="car-list-page container my-5">
            <h1 className="mb-4">Автопарк Olimp Rent Car в Києві</h1>
            <p className="lead">Оберіть свій ідеальний автомобіль серед широкого вибору.</p>

            <div className="row car-grid mt-4">
                {cars.map((car) => (
                    <div key={car.id} className="col-md-4 mb-4" style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
                        <div className="card car-card">
                            <div className="card-body">
                                <h5 className="card-title">{car.name}</h5>
                                <p className="card-text">{car.description}</p>
                                <p className="card-price">**Ціна: ${car.price} / день**</p>
                                <Link to={`/car/${car.id}`} className="btn btn-primary">
                                    Деталі та Замовлення
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarListPage;