// src/components/PrivateRoute.jsx (БЕЗ ЗМІН)
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const { user, isLoading } = useAuth() 
  
  // 1. Пріоритетна обробка: поки завантажується, не робити перенаправлень
  if (isLoading) {
    return <h2>Перевірка авторизації...</h2> 
  }

  // 2. Якщо не авторизований (і завантаження завершено), перенаправляємо
  return user ? <Outlet /> : <Navigate to="/login" replace />
}