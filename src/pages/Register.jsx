// src/pages/Register.jsx (ОНОВЛЕНА ВЕРСІЯ)
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const getRegisteredUsers = () => {
    const raw = localStorage.getItem('registeredUsers');
    return raw ? JSON.parse(raw) : [];
};

const setRegisteredUsers = (users) => {
    try {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    } catch (e) {
        console.error("Помилка запису в localStorage:", e);
    }
}

export default function Register() {
    const { login } = useAuth(); // login тут потрібен лише для дотримання структури, але ми його не викликаємо.
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
    const [error, setError] = useState('');

    // ФУНКЦІЯ ДЛЯ ОНОВЛЕННЯ СТАНУ ФОРМИ
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (form.password.length < 6) {
            setError('Пароль має містити не менше 6 символів.');
            return;
        }

        let users = getRegisteredUsers();

        // 1. Перевірка, чи користувач вже існує
        if (users.some(u => u.email === form.email)) {
            setError('Користувач з цією поштою вже зареєстрований.');
            return;
        }

        // 2. Створення об'єкта користувача (З isVerified: false)
        const newUser = {
            name: form.name,
            email: form.email,
            password: form.password, // У реальному проєкті тут має бути хешування!
            isVerified: false, // 👈 ІМІТАЦІЯ: Користувач не верифікований
        };

        try {
            // 3. Оновлення загального сховища
            users = [...users, newUser];
            setRegisteredUsers(users);

            // 4. Перенаправлення на сторінку входу з повідомленням про верифікацію
            alert('Реєстрація успішна! Перевірте свою пошту для верифікації (це імітація).');
            navigate('/login');
        } catch (e) {
            setError('Помилка реєстрації. Спробуйте пізніше.');
            console.error("Помилка запису в localStorage:", e);
        }
    };
    
    // БЛОК СТИЛІВ (Винесений для коректного рендерингу)
    const styles = {
        container: {
            padding: '2.5rem',
            maxWidth: 400,
            margin: '3rem auto',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
        },
        input: {
            padding: '0.8rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
        },
        button: {
            backgroundColor: '#005bbb', // Змінено на колір, що відрізняється від кнопки входу
            color: 'white',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
        },
        error: {
            color: '#e94e77',
            fontSize: '0.9rem',
            border: '1px solid #f9d8e0',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: '#fff0f5'
        },
        link: {
            color: '#005bbb',
            textDecoration: 'none',
            fontWeight: 'bold'
        }
    };

    // ГЛАВНИЙ RETURN З JSX (Вирішення проблеми "білого екрану")
    return (
        <div style={styles.container}>
            <h2>Зареєструватися</h2>
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ім'я"
                    value={form.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Електронна пошта"
                    value={form.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль (від 6 символів)"
                    value={form.password}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Зареєструватися</button>
            </form>
            
            <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                Вже маєте обліковий запис? <Link to="/login" style={styles.link}>Увійти</Link>
            </p>
        </div>
    );
}