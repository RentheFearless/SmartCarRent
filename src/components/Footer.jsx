// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Блок 1: Інформація */}
        <div style={styles.col}>
          <h3>SmartCarRent</h3>
          <p style={styles.text}>Ваш надійний партнер в оренді авто у Львові.</p>
          <p style={styles.text}>© {new Date().getFullYear()} SmartCarRent.</p>
        </div>

        {/* Блок 2: Швидкі посилання */}
        <div style={styles.col}>
          <h3>Навігація</h3>
          <Link to="/park" style={styles.link}>Автопарк</Link>
          <Link to="/contacts" style={styles.link}>Контакти</Link>
          <Link to="/profile" style={styles.link}>Профіль</Link>
          <Link to="/checkout" style={styles.link}>Кошик</Link>
        </div>

        {/* Блок 3: Контакти */}
        <div style={styles.col}>
          <h3>Зв'язок</h3>
          <p style={styles.text}>📞 +38 (097) 123-45-67</p>
          <p style={styles.text}>📧 rent@smartcarrent.com.ua</p>
          <p style={styles.text}>📍 Львів, вул. Героїв УПА, 10</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
    footer: {
        background: '#333',
        color: '#fff',
        padding: '2rem 1rem',
        marginTop: '2rem',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
    },
    col: {
        flex: '1',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    text: {
        fontSize: '0.9rem',
        margin: 0,
    },
    link: {
        color: '#ccc',
        textDecoration: 'none',
        fontSize: '0.9rem',
    }
};