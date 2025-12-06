const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID

export async function sendTelegramMessage(text) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram BOT не налаштовано – повідомлення не надіслано')
    return
  }
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
}