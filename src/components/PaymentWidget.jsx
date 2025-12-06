import { useEffect } from 'react'
import { createPayment } from '../api/payment'

export default function PaymentWidget({ amount, orderId, onApprove }) {
  useEffect(() => {
    // заглушка
    createPayment(amount, orderId).then(onApprove)
  }, [amount, orderId, onApprove])

  return (
    <div className="border rounded p-3 text-center">
      <p>Імітація оплати</p>
      <button className="btn btn-olimp" onClick={() => onApprove({ success: true })}>
        Сплатити
      </button>
    </div>
  )
}