// src/pages/Login.jsx (ОНОВЛЕНА ВЕРСІЯ)
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const getRegisteredUsers = () => {
    const raw = localStorage.getItem('registeredUsers');
    return raw ? JSON.parse(raw) : [];
};

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
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

        const users = getRegisteredUsers();

        // 1. Пошук користувача
        const foundUser = users.find(u => u.email === form.email);

        if (!foundUser) {
            setError('Пошта не зареєстрована.');
            return;
        }

        // 2. Перевірка пароля (УВАГА: в реальному проєкті потрібно порівнювати хеші)
        if (foundUser.password !== form.password) {
            setError('Неправильний пароль.');
            return;
        }

        // 3. ПЕРЕВІРКА ВЕРИФІКАЦІЇ (Імітація)
        if (!foundUser.isVerified) {
            setError('Ваш обліковий запис не верифіковано. Будь ласка, перевірте свою пошту (або перейдіть на /verify).');
            return;
        }

        // 4. Авторизація (зберігаємо лише об'єкт без пароля для сесії)
        const sessionUser = { name: foundUser.name, email: foundUser.email };
        login(sessionUser);

        // 5. Перенаправлення
        navigate('/profile');
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
            backgroundColor: '#e94e77',
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
            <h2>Увійти</h2>
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Електронна пошта"
                    value={form.email}
                    onChange={handleInputChange} // 👈 Додано обробник
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleInputChange} // 👈 Додано обробник
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Увійти</button>
            </form>

            <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                Немає облікового запису? <Link to="/register" style={styles.link}>Зареєструватися</Link>
            </p>
            {/* Додаємо посилання для тестування імітації верифікації */}
            <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.8rem' }}>
                <Link to="/verify" style={styles.link}>Перейти до Верифікації (Тест)</Link>
            </p>
        </div>
    );
}