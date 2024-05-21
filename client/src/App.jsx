import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Environment, OrbitControls, PresentationControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import PipBoy from './PipBoy.jsx'

function App() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null)

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [clickedIphon, clickIphon] = useState(false)

  // useEffect(()=>{
  //   if(clicked){
  //     ref.current.rotation.y = .1
  //     ref.current.rotation.x = .1
  //   }
  // },[clicked])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.y += delta/10))
  useFrame((state, delta) => {
    if(ref.current != null){
      if(clicked){
        // if(ref.current.rotation.y > -.5) { ref.current.rotation.y -= delta }
        // if(ref.current.rotation.x < .13) { ref.current.rotation.x += delta }
        
        // if( ref.current.position.y < .6) { ref.current.position.y += delta }
        // if(ref.current.position.x > -6.2) { ref.current.position.x -= delta }
        // if(ref.current.position.z < 7) { ref.current.position.z += delta }
        ref.current.rotation.y = -.5
        ref.current.rotation.x = .13
        
        ref.current.position.y = -0.3
        ref.current.position.x = -4.2
        ref.current.position.z = 4
      }else{
        ref.current.rotation.y = -.5
        ref.current.rotation.x = 0

        ref.current.position.y = 0
        ref.current.position.x = 0
        ref.current.position.z = 0
      }
    }
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <Environment preset="warehouse" />

      {/* <OrbitControls /> */}

      <ambientLight intensity={0.5} />

      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <pointLight position={[-10, -10, -10]} />
      <PresentationControls global polar={[-1, 1]} azimuth={[ -1, 1]} >
        <mesh
          ref={ref}
          // scale={clicked ? 1.5 : 1}
          // onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}>
          <PipBoy/>
        </mesh>
        
      </PresentationControls>
      
    </>
  )
}

export default App
