// заглушка для WayForPay / Mono
export async function createPayment(amount, orderId) {
  console.log('Payment request:', amount, orderId)
  return {success:true, url:'#'}
}