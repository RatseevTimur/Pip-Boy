import React, { useState, useEffect } from 'react';

function IframeLoader({ src }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000); // предполагаемое время загрузки iframe

    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div>
      {!loaded ? (
        <div>Загрузка...</div> // Здесь может быть ваш компонент загрузки
      ) : (
        <iframe
          src={src}
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      )}
    </div>
  );
}
