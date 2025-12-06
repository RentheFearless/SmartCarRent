import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export default function CheckoutForm({ onSubmit }) {
  const [data, setData] = useState({ name: '', phone: '', email: '', start: '', end: '', city: '' })

  const handle = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Ім’я</Form.Label>
          <Form.Control name="name" required value={data.name} onChange={handle} />
        </Col>
        <Col md={6}>
          <Form.Label>Телефон</Form.Label>
          <Form.Control type="tel" name="phone" required value={data.phone} onChange={handle} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" required value={data.email} onChange={handle} />
        </Col>
        <Col md={6}>
          <Form.Label>Місто отримання</Form.Label>
          <Form.Control name="city" required value={data.city} onChange={handle} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Початок оренди</Form.Label>
          <Form.Control type="date" name="start" required value={data.start} onChange={handle} />
        </Col>
        <Col md={6}>
          <Form.Label>Кінець оренди</Form.Label>
          <Form.Control type="date" name="end" required value={data.end} onChange={handle} />
        </Col>
      </Row>
      <Button type="submit" variant="olimp">Підтвердити бронювання</Button>
    </Form>
  )
}