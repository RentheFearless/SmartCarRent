// src/pages/RentHistory.jsx (НОВИЙ ФАЙЛ)

import { useAuth } from '../contexts/AuthContext';

export default function RentHistory() {
    const { user } = useAuth(); 

    const styles = {
        container: {
            padding: '2rem',
            maxWidth: 800,
            margin: '3rem auto',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2>⌛ Історія Оренд {user ? `користувача ${user.name}` : ''}</h2>
            <p>Ця сторінка зараз містить лише заглушку для демонстрації роутингу.</p>
            
            <div style={{ padding: '2rem', border: '1px dashed #ccc', marginTop: '1rem' }}>
                <p>**Тут буде список ваших попередніх замовлень.**</p>
            </div>
        </div>
    );
}