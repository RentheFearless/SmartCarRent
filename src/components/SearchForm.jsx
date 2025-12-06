import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SearchForm() {
  const [city, setCity] = useState('')
  const nav = useNavigate()

  const handle = (e) => {
    e.preventDefault()
    nav(`/park?city=${city}`)
  }

  return (
    <Form onSubmit={handle} className="d-flex gap-2">
      <Form.Control
        placeholder="Місто отримання"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button type="submit" variant="olimp">Знайти</Button>
    </Form>
  )
}