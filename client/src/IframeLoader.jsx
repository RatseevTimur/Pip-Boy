import React, { useState, useEffect } from 'react';

import Loading from './Loading/Loading.jsx';

export default function IframeLoader({ src, radius, width, height }) {
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
        <Loading />
      ) : (
        <iframe
          src={src}
          onLoad={() => setLoaded(true)}
          style={{ 
            display: loaded ? 'block' : 'none',
            borderRadius: `${radius}px`,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      )}
    </div>
  );
}

// export default function IframeLoader(){
//   return ( <iframe src="src/todo.html"/>)
// }