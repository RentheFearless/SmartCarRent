// src/pages/Verify.jsx (НОВИЙ ФАЙЛ)

import { useNavigate } from 'react-router-dom';

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
};

export default function Verify() {
    const navigate = useNavigate();

    const verifyUser = (email) => {
        if (!email) {
            alert("Email не може бути порожнім.");
            return;
        }
        
        let users = getRegisteredUsers();
        const index = users.findIndex(u => u.email === email);

        if (index === -1) {
            alert(`Помилка: Користувача з поштою "${email}" не знайдено.`);
            return;
        }
        
        if (users[index].isVerified) {
            alert(`Користувач ${email} вже був верифікований.`);
            navigate('/login');
            return;
        }

        // Встановлення isVerified у true
        users[index].isVerified = true;
        setRegisteredUsers(users);
        alert(`Користувач ${email} успішно верифікований! Тепер ви можете увійти.`);
        navigate('/login');
    };
    
    const handleVerifyClick = () => {
        const email = prompt("Введіть Email, який потрібно верифікувати (наприклад, test@example.com):");
        if (email) {
            verifyUser(email.trim());
        }
    }
    
    const styles = {
        container: {
            padding: '2.5rem',
            maxWidth: 500,
            margin: '3rem auto',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            textAlign: 'center'
        },
        button: {
            backgroundColor: '#04AA6D',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginTop: '1.5rem'
        }
    };

    return (
        <div style={styles.container}>
            <h2>Імітація Верифікації Облікового Запису</h2>
            <p>
                **УВАГА:** У реальному застосунку ви б потрапили сюди за посиланням з електронного листа, і верифікація відбулася б автоматично.
                Ця сторінка існує лише для тестування логіки `isVerified` у **`localStorage`**.
            </p>
            
            <button onClick={handleVerifyClick} style={styles.button}>
                Верифікувати Користувача Вручну
            </button>
            
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Після натискання, введіть Email користувача, і його статус буде оновлено.
            </p>
        </div>
    );
}