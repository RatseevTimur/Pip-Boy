import { useRef, useState } from 'react'
import './App.css'
import { Environment, OrbitControls, PresentationControls } from '@react-three/drei'

import PipBoy from './PipBoy.jsx'

function App() {
  const ref = useRef(null)
  const [hovered, hover] = useState(false)

  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls 
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={20}
        enablePan={true}
        panSpeed={0.5}
      />
      {/* <PresentationControls 
        global
        config={{ mass: 1, tension: 500 }}
        snap={{ mass: 1, tension: 1500 }}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        // polar={[-1, 1]} azimuth={[-1, 1.5]}
      > */}
        <mesh
          position={[1,-1.4,0]}
          ref={ref}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <PipBoy/>
        </mesh>
      {/* </PresentationControls> */}
    </>
  )
}

export default App
