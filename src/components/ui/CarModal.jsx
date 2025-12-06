import { Modal, Button, ListGroup } from 'react-bootstrap'
import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'

export default function CartModal({ show, onHide }) {
  const { items, setDays, remove, total, clear } = useCart()

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Кошик ({items.length})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.length === 0 ? (
          <p className="mb-0">Кошик порожній</p>
        ) : (
          <ListGroup>
            {items.map((i) => (
              <CartItem key={i.id} {...i} setDays={setDays} remove={remove} />
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <strong>Разом: {total.toLocaleString('uk-UA')} грн</strong>
        <Button variant="secondary" onClick={clear} disabled={!items.length}>
          Очистити
        </Button>
        <Button
          variant="olimp"
          onClick={() => {
            onHide()
            window.location.href = '/checkout'
          }}
          disabled={!items.length}
        >
          Оформити
        </Button>
      </Modal.Footer>
    </Modal>
  )
}