// src/pages/RegistrationPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); 
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    
    setIsError(!result.success);
    setMessage(result.message);
    
    if (result.success) {
      setTimeout(() => navigate('/profile'), 1500); 
    }
  };

  return (
    <div className="auth-container">
      <h2>📝 Реєстрація</h2>
      {message && (
        <p className={isError ? "alert alert-danger" : "alert alert-success"}>
          {message}
        </p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ім'я:</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            disabled={loading} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            disabled={loading} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input 
            type="password" 
            id="password"
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            disabled={loading} 
            className="form-control" 
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-block">
          {loading ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
      </form>
      <p className="mt-3 text-center">
        Вже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;