// src/components/ui/CarImage.jsx

import React, { useState } from 'react';

// URL для заглушки (якщо зображення не знайдено)
const PLACEHOLDER_URL = "https://via.placeholder.com/500x300?text=Image+Not+Found";

export default function CarImage({ src, alt, style }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Обробка помилки завантаження зображення
  const handleError = () => {
    if (!hasError) {
      setImageSrc(PLACEHOLDER_URL);
      setHasError(true);
    }
  };

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      style={style} 
      onError={handleError}
    />
  );
}