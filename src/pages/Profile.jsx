// src/pages/Profile.jsx (НОВИЙ ФАЙЛ)

import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
    // Отримуємо поточні дані користувача та функцію виходу
    const { user, logout } = useAuth(); 

    // Якщо раптом користувач null (хоча PrivateRoute має це відловити)
    if (!user) {
        return <h1>Будь ласка, увійдіть, щоб переглянути профіль.</h1>;
    }

    const styles = {
        container: {
            padding: '2rem',
            maxWidth: 600,
            margin: '3rem auto',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
        },
        info: {
            fontSize: '1.1rem',
            marginBottom: '0.8rem',
            paddingLeft: '1rem',
            borderLeft: '4px solid #005bbb',
        },
        button: {
            backgroundColor: '#e94e77',
            color: 'white',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            marginTop: '1.5rem'
        },
        link: {
            display: 'block',
            marginTop: '1rem',
            color: '#005bbb',
            textDecoration: 'none',
            fontWeight: 'bold'
        }
    };
    
    return (
        <div style={styles.container}>
            <h2>👋 Мій Профіль</h2>
            
            <div style={{ marginTop: '2rem' }}>
                <p style={styles.info}>**Ім'я:** {user.name}</p>
                <p style={styles.info}>**Прізвище:** {user.surname}</p>
                <p style={styles.info}>**Стать:** {user.gender}</p>
                <p style={styles.info}>**Дата народження:** {user.birthdate}</p>
                <p style={styles.info}>**Телефон:** {user.phone}</p>
                <p style={styles.info}>**Адреса:** {user.address}</p>
                <p style={styles.info}>**Місто:** {user.city}</p>
                <p style={styles.info}>**Індекс:** {user.postalCode}</p>
                <p style={styles.info}>**Країна:** {user.country}</p>
                <p style={styles.info}>**Місто:** {user.city}</p>
                <p style={styles.info}>**Email:** {user.email}</p>
            </div>
            
            <Link to="/history" style={styles.link}>
                Переглянути Історію Оренд
            </Link>

            <button onClick={logout} style={styles.button}>
                Вийти з Облікового Запису
            </button>
        </div>
    );
}