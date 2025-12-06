// src/App.jsx (ПОВНІСТЮ ВИПРАВЛЕНИЙ КОД)
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

// Сторінки, які були імпортовані раніше (вам потрібно мати ці файли)
import Home from './pages/Home' 
import CarPark from './pages/CarPark' // 👈 Додайте цей імпорт, якщо він був
import CarPage from './pages/CarPage' // 👈 Додайте цей імпорт, якщо він був
import Checkout from './pages/Checkout' // 👈 Додайте цей імпорт, якщо він був
import Profile from './pages/Profile' // 👈 Додайте цей імпорт, якщо він був

import Login from './pages/Login'
import Register from './pages/Register'
import Verify from './pages/Verify'
import RentHistory from './pages/RentHistory'
import Contacts from './pages/Contacts'
import NotFound from './pages/NotFound'

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Header />
                <main style={{ padding: '1rem', minHeight: '80vh' }}>
                    <Routes>
                        {/* 1. ПУБЛІЧНІ МАРШРУТИ (ОСНОВНИЙ КОМПЛЕКТ) */}
                        <Route path="/" element={<Home />} /> 
                        <Route path="/park" element={<CarPark />} />
                        <Route path="/car/:id" element={<CarPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/contacts" element={<Contacts />} />

                        {/* 2. МАРШРУТИ АВТЕНТИФІКАЦІЇ */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/verify" element={<Verify />} />

                        {/* 3. ЗАХИЩЕНІ МАРШРУТИ (ВИКОРИСТОВУЮТЬ PrivateRoute) */}
                        <Route element={<PrivateRoute />}>
                            {/* Зверніть увагу: шляхи дочірніх роутів ВІДНОСНІ (без '/') */}
                            <Route path="profile" element={<Profile />} /> 
                            <Route path="history" element={<RentHistory />} />
                        </Route>

                        {/* 4. 404 Not Found (Завжди останнім) */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </CartProvider>
        </AuthProvider>
    )
}