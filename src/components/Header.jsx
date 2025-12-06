// src/components/Header.jsx

import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const { user, logout } = useAuth()
  console.log('Header user:', user)
  const { totalItems } = useCart() // Змінено на totalItems з CartContext

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Логотип */}
        <Link to="/" style={styles.logo}>SmartCarRent</Link>

        {/* Основні посилання */}
        <Link to="/park" style={styles.link}>Автопарк</Link>
        <Link to="/contacts" style={styles.link}>Контакти</Link> {/* 👈 Додано */}

        {/* Посилання, видимі лише авторизованому користувачу */}
        {user && (
          <>
            <Link to="/profile" style={styles.link}>Профіль</Link>
            <Link to="/history" style={styles.link}>Історія</Link> {/* 👈 Додано */}
          </>
        )}

        {/* Права частина: авторизація та кошик */}
        <div style={styles.authContainer}>
          {user ? (
            <button onClick={logout} style={styles.logoutButton}>Вийти</button>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Увійти</Link>
              <Link to="/register" style={{ ...styles.link, ...styles.registerLink }}>Зареєструватися</Link>
            </>
          )}

          {/* Кошик */}
          <Link to="/checkout" style={styles.cartLink}>
            🛒 Кошик ({totalItems || 0})
          </Link>
        </div>
      </nav>
    </header>
  )
}

// Прості inline-стилі для кращого вигляду
const styles = {
    header: { 
        background: '#005bbb', 
        color: '#fff', 
        padding: '1rem', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
    },
    nav: { 
        display: 'flex', 
        gap: '1.5rem', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto' 
    },
    logo: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: '1.2rem', 
        textDecoration: 'none' 
    },
    link: { 
        color: '#fff', 
        textDecoration: 'none', 
        padding: '0.2rem 0' 
    },
    registerLink: {
        border: '1px solid #fff',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
    },
    authContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
},
logoutButton: {
    backgroundColor: '#e94e77', // Акцентний колір
    // ...
},
cartLink: {
    color: '#ffdd00', // Яскравий колір для кошика
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
}
};