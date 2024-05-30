import { Canvas } from '@react-three/fiber'
import ReactDOM from 'react-dom/client'

import { Suspense, lazy } from 'react';
import Loading from './Loading/Loading.jsx';

const App = lazy(() => delayForDemo(import('./App.jsx')));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <Suspense fallback={<Loading />}>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 14]
      }}
    >
      <color attach="background" args={["#434343"]} />
      <App />
    </Canvas>
  // </Suspense>
)

function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}