// src/components/ui/ContactForm.jsx

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // 'success' | 'error' | ''
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    // 1. Імітація надсилання даних
    console.log("Надсилання форми:", formData);

    // 2. Імітація API-запиту з таймаутом (2 секунди)
    setTimeout(() => {
      // Тут була б логіка перевірки на стороні сервера
      if (formData.email.includes('@') && formData.message.length > 5) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Очистити форму
        alert("Дякуємо! Ваше повідомлення успішно надіслано. Ми зв'яжемося з вами.");
      } else {
        setStatus('error');
        alert("Помилка! Будь ласка, перевірте правильність Email та довжину повідомлення.");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      {status === 'success' && (
        <p style={styles.successMessage}>✅ Повідомлення відправлено!</p>
      )}
      {status === 'error' && (
        <p style={styles.errorMessage}>❌ Виникла помилка при відправці. Спробуйте пізніше.</p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Ім'я */}
        <label htmlFor="name" style={styles.label}>Ваше ім'я:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Іван"
        />

        {/* Email */}
        <label htmlFor="email" style={styles.label}>Ваш Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="example@gmail.com"
        />

        {/* Повідомлення */}
        <label htmlFor="message" style={styles.label}>Повідомлення:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={styles.textarea}
          placeholder="Яке у вас запитання щодо оренди..."
        />
        
        <button type="submit" style={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Надсилання...' : 'Надіслати повідомлення'}
        </button>
      </form>
    </div>
  );
}

const styles = {
    container: { maxWidth: '500px', margin: '0 auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.5rem' },
    input: { padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' },
    textarea: { padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', resize: 'vertical' },
    submitButton: { 
        backgroundColor: '#e94e77', 
        color: 'white', 
        border: 'none', 
        padding: '0.8rem 1.5rem', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        fontWeight: 'bold',
        marginTop: '1rem',
        transition: 'background-color 0.3s'
    },
    successMessage: { color: 'green', fontWeight: 'bold', textAlign: 'center', padding: '1rem', border: '1px solid green', borderRadius: '4px', backgroundColor: '#e6ffe6' },
    errorMessage: { color: 'red', fontWeight: 'bold', textAlign: 'center', padding: '1rem', border: '1px solid red', borderRadius: '4px', backgroundColor: '#ffe6e6' },
};