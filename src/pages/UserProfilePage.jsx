// src/pages/UserProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const mockOrdersData = [
  { id: 101, carName: 'Audi A6', startDate: '2025-12-10', endDate: '2025-12-15', totalPrice: 450, status: 'Активне' },
  { id: 102, carName: 'BMW X5', startDate: '2026-01-01', endDate: '2026-01-03', totalPrice: 360, status: 'Завершене' },
];

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchOrders = async () => {
      setLoadingOrders(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userOrders = mockOrdersData.map(order => ({
          ...order,
          id: `${user.id}-${order.id}`, 
      }));

      setOrders(userOrders);
      setLoadingOrders(false);
    };

    fetchOrders();
  }, [user]);


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container container my-5">
      <h2>👤 Профіль клієнта Olimp Rent Car</h2>
      <p><strong>Ім'я:</strong> {user.name || 'Не вказано'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Вийти
      </button>

      <hr className="my-4" />
      
      <h3>📦 Мої замовлення</h3>
      {loadingOrders ? (
        <p>Завантаження замовлень...</p>
      ) : orders.length === 0 ? (
        <p>У вас ще немає активних замовлень. Почніть з нашого <Link to="/fleet">автопарку</Link>.</p>
      ) : (
        <table className="table table-striped order-table" style={{width: '100%', borderCollapse: 'collapse'}}> 
          <thead>
            <tr style={{borderBottom: '1px solid #ccc'}}>
              <th style={{padding: '10px', textAlign: 'left'}}>Авто</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Дати оренди</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Сума</th>
              <th style={{padding: '10px', textAlign: 'left'}}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '10px'}}>{order.carName}</td>
                <td style={{padding: '10px'}}>{order.startDate} – {order.endDate}</td>
                <td style={{padding: '10px', fontWeight: 'bold'}}>${order.totalPrice}</td>
                <td style={{padding: '10px'}}>
                    {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserProfilePage;