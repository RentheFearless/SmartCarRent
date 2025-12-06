import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // 1. Додаємо стан завантаження
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // Починаємо із Завантаження

  // 2. useEffect для ініціалізації: читання з localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user')
      if (raw) {
        setUser(JSON.parse(raw))
      }
    } catch (error) {
      console.error("Помилка читання 'user' з localStorage:", error)
      // Навіть якщо помилка, ми закінчуємо завантаження
    } finally {
      setIsLoading(false) // Завершуємо завантаження після перевірки
    }
  }, []) // Запускається лише один раз при монтуванні

  const login = (u) => {
    setUser(u)
    // Додаємо блок try/catch для localStorage
    try {
      localStorage.setItem('user', JSON.stringify(u))
    } catch (error) {
      console.error("Помилка запису 'user' в localStorage:", error)
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.error("Помилка видалення 'user' з localStorage:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}