# 1. ЕТАП: node:20-alpine як базовий образ для React
FROM node:20-alpine

# 2. Встановлюємо робочу директорію
WORKDIR /app

# 3. Копіюємо package.json та package-lock.json
# Це дозволяє Docker кешувати встановлення залежностей
COPY package*.json ./

# 4. Встановлюємо залежності.
# Використовуємо 'npm ci' для чистої установки з package-lock.json
RUN npm ci

# 5. Копіюємо весь код проекту
COPY . .

# 6. Порт, на якому працюватиме Vite всередині контейнера
EXPOSE 3000