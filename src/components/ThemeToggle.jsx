import { Button } from 'react-bootstrap'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <Button size="sm" variant="outline-light" onClick={toggle}>
      <i className={theme === 'light' ? 'bi bi-moon' : 'bi bi-sun'}></i>
    </Button>
  )
}