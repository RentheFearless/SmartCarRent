// src/pages/Checkout.jsx (ОНОВЛЕНА ВЕРСІЯ)

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  // Отримуємо нову функцію updateItemDates
  const { items, totalAmount, totalDeposit, removeFromCart, clearCart, updateItemDates } = useCart(); 
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const today = getTodayDate();
  

  const handleDateChange = (id, field, value) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    let newStartDate = item.startDate;
    let newEndDate = item.endDate;

    if (field === 'startDate') {
        newStartDate = value;
        // Забезпечуємо, щоб дата кінця була не раніше дати початку
        if (newEndDate <= newStartDate) {
            newEndDate = newStartDate;
        }
    } else {
        newEndDate = value;
    }
    
    // Перевіряємо, що дата кінця пізніша за дату початку
    if (new Date(newEndDate) > new Date(newStartDate)) {
        updateItemDates(id, newStartDate, newEndDate);
    } else if (field === 'startDate' && new Date(newEndDate) < new Date(newStartDate)) {
        // Якщо змінили старт, і він став пізніше кінця, оновлюємо
        updateItemDates(id, newStartDate, newStartDate);
    }
  };


  // ... (handleCheckout залишається без змін) ...
  const handleCheckout = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Будь ласка, увійдіть або зареєструйтесь, щоб завершити замовлення.");
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert("Ваш кошик порожній.");
      navigate('/park');
      return;
    }
    
    // Перевірка: чи всі дати коректні (дні > 0)
    if (items.some(item => item.days <= 0)) {
        alert("У деяких авто некоректно вибрані дати оренди (кількість діб 0). Будь ласка, перевірте.");
        return;
    }


    // 1. Створення об'єкта замовлення
    const newOrder = {
      date: new Date().toLocaleDateString('uk-UA'),
      items: items.map(item => ({
        title: item.title,
        days: item.days,
        startDate: item.startDate, // Додаємо дати в історію
        endDate: item.endDate,     // Додаємо дати в історію
        pricePerDay: item.pricePerDay,
        deposit: item.deposit,
      })),
      total: totalAmount,
      deposit: totalDeposit,
      status: 'Очікує підтвердження',
    };

    // 2. Збереження історії в localStorage
    const historyKey = `history_${user.email}`;
    const raw = localStorage.getItem(historyKey);
    const history = raw ? JSON.parse(raw) : [];
    
    const updatedHistory = [newOrder, ...history]; 
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));

    // 3. Очищення кошика
    clearCart();

    // 4. Сповіщення та перенаправлення
    alert(`Замовлення на суму ${totalAmount} $ успішно оформлено! Очікуйте дзвінка.`);
    navigate('/profile');
  };

  if (items.length === 0) {
    // ... (відображення порожнього кошика залишається без змін) ...
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Кошик порожній</h2>
        <p>Додайте автомобілі до оренди, щоб оформити замовлення.</p>
        <button onClick={() => navigate('/park')} style={styles.button}>
            Перейти до автопарку
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1>Оформлення замовлення</h1>
      
      <div style={styles.main}>
        
        {/* ЛІВА КОЛОНКА: Список товарів */}
        <div style={styles.cartList}>
          <h3>Ваші автомобілі ({items.length})</h3>
          {items.map(item => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemInfo}>
                <p><strong>{item.title}</strong></p>
                <p>{item.pricePerDay} $ × {item.days} діб</p>
                <p style={{ color: '#555', fontSize: '0.9rem' }}>Застава: {item.deposit} $</p>

                {/* 💥 ПОЛЯ ДЛЯ ЗМІНИ ДАТ */}
                <div style={styles.dateInputs}>
                    <label>З:</label>
                    <input
                        type="date"
                        value={item.startDate}
                        name="startDate"
                        min={today}
                        onChange={(e) => handleDateChange(item.id, 'startDate', e.target.value)}
                        style={styles.dateInput}
                    />
                    <label>По:</label>
                    <input
                        type="date"
                        value={item.endDate}
                        name="endDate"
                        min={item.startDate}
                        onChange={(e) => handleDateChange(item.id, 'endDate', e.target.value)}
                        style={styles.dateInput}
                    />
                </div>
                {/* ------------------- */}

              </div>
              <div style={styles.itemActions}>
                <p style={styles.itemTotal}>Всього: {item.total} $</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ПРАВА КОЛОНКА: Підсумок (залишається без змін) */}
        <div style={styles.summary}>
          {/* ... (підсумок та кнопка оформлення) ... */}
          <h3>Підсумок</h3>
          <div style={styles.totals}>
            <p>Вартість оренди: <strong>{totalAmount} $</strong></p>
            <p>Сума депозиту: <strong>{totalDeposit} $</strong></p>
            <hr />
            <p style={styles.grandTotal}>ВСЬОГО ДО СПЛАТИ: <strong>{totalAmount} $</strong></p>
          </div>
          
          <p style={styles.note}>
            * Депозит {totalDeposit} $ буде заблоковано на карті та повернено після оренди.
          </p>

          <form onSubmit={handleCheckout}>
             <p>... Поля для вводу даних клієнта (ПІБ, телефон) ...</p>
            <button type="submit" style={styles.checkoutButton}>
              Підтвердити та оплатити ({totalAmount} $)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
    // ... (стилі залишаються без змін)
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    main: { display: 'flex', gap: '40px', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' },
    cartList: { flex: '2', minWidth: '350px' },
    summary: { flex: '1', minWidth: '300px', padding: '1.5rem', border: '1px solid #005bbb', borderRadius: '8px', backgroundColor: '#f9f9ff' },
    item: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '1rem 0', alignItems: 'center', flexDirection: 'column', gap: '10px' }, // Змінено на column для кращого вигляду дат
    itemInfo: { flex: '2', width: '100%' },
    itemActions: { flex: '1', textAlign: 'right', width: '100%' },
    itemTotal: { fontSize: '1.1rem', color: '#e94e77', marginBottom: '0.5rem' },
    removeButton: { background: 'none', border: '1px solid #ccc', color: '#777', cursor: 'pointer', padding: '0.3rem 0.5rem', borderRadius: '4px', width: '100%' },
    // НОВІ СТИЛІ ДЛЯ ДАТ
    dateInputs: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        marginTop: '0.5rem',
        fontSize: '0.9rem',
        flexWrap: 'wrap',
    },
    dateInput: {
        padding: '0.3rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxWidth: '120px',
    },
    // ... (інші стилі)
    totals: { padding: '1rem 0' },
    grandTotal: { fontSize: '1.3rem', fontWeight: 'bold', color: '#005bbb', marginTop: '1rem' },
    note: { fontSize: '0.85rem', color: '#a00', marginBottom: '1.5rem' },
    checkoutButton: { backgroundColor: '#e94e77', color: 'white', border: 'none', padding: '0.8rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '1rem' },
    button: { backgroundColor: '#005bbb', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' },
};