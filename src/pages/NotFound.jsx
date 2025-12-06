// src/pages/NotFound.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>404 - Сторінка не знайдена</h2>
      <p style={styles.message}>
        На жаль, за адресою, яку ви шукаєте, нічого не знайдено.
      </p>
      <button 
        onClick={() => navigate('/')} 
        style={styles.button}
      >
        Повернутися на головну
      </button>
      
    </div>
  );
}

const styles = {
    container: { 
        padding: '4rem 2rem', 
        textAlign: 'center', 
        maxWidth: '600px', 
        margin: '0 auto',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: { 
        fontSize: '1.2rem', 
        margin: '1rem 0 2rem 0',
        color: '#555'
    },
    button: {
        backgroundColor: '#005bbb',
        color: 'white',
        border: 'none',
        padding: '0.8rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
};