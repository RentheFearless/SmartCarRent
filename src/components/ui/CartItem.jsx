import { Button, Form } from 'react-bootstrap'

export default function CartItem({ id, title, price, days, setDays, remove }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{title}</strong> × {days} діб<br />
        <span className="text-muted">{parseInt(price).toLocaleString('uk-UA')} грн/добу</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Form.Control
          type="number"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(id, Number(e.target.value))}
          size="sm"
          style={{ width: 70 }}
        />
        <Button size="sm" variant="outline-danger" onClick={() => remove(id)}>
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </li>
  )
}