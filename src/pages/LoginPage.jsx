// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); 
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    
    setIsError(!result.success);
    setMessage(result.message);
    
    if (result.success) {
      setTimeout(() => navigate('/profile'), 1500); 
    }
  };

  return (
    <div className="auth-container">
      <h2>🗝️ Увійти до облікового запису</h2>
      <p className="lead mb-4">Email: **user@test.com**, Пароль: **123456**</p>
      {message && (
        <p className={isError ? "alert alert-danger" : "alert alert-success"}>
          {message}
        </p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email адреса</label>
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
          <label htmlFor="password">Пароль</label>
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
          {loading ? 'Вхід...' : 'Увійти'}
        </button>
      </form>
      <p className="mt-3 text-center">
        Немає облікового запису? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default LoginPage;