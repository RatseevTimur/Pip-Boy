import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Environment, OrbitControls, PresentationControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import PipBoy from './PipBoy.jsx'

function App() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null)
  
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const { camera } = useThree() // Access the camera
  
  //! useEffect(() => {
  //   const handleMessage = (event) => {
  //     console.log(event.origin)
  //     // Проверка источника сообщения и данных
  //     if (event.origin !== 'http://localhost:3000') {
  //       return;
  //     }

  //     click(!clicked)
  //     console.log("clicked1", clicked)
  //   };

  //   window.addEventListener('message', handleMessage);

  //   return () => {
  //     window.removeEventListener('message', handleMessage);
  //   };
  //! }, []);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {
  //   if (ref.current != null) {
  //     // let clicked = true
  //     if (clicked) {
  //       ref.current.rotation.y = -1.3
  //       ref.current.rotation.x = 0.23
  //       ref.current.rotation.z = 0.23
        
  //       ref.current.position.y = 1.58
  //       ref.current.position.x = 3.58
  //       ref.current.position.z = -1

  //       // Move camera towards the model
  //       // camera.position.lerp(
  //       //   {
  //       //     x: ref.current.position.x,
  //       //     y: ref.current.position.y,
  //       //     z: ref.current.position.z + 5, // Adjust distance from model as needed
  //       //   },
  //       //   delta * 2 // Adjust the speed of camera movement
  //       // );
  //       camera.lookAt(ref.current.position); // Ensure camera looks at the model
  //     } else {
  //       ref.current.rotation.y = 0
  //       ref.current.rotation.x = 0
  //       ref.current.position.y = 0
  //       ref.current.position.x = 0
  //       ref.current.position.z = 0

  //       // Reset camera position
  //       camera.position.lerp({ x: 0, y: 0, z: 10 }, delta * 2) // Adjust original position as needed
  //       camera.lookAt(0, 0, 0) // Ensure camera looks at the center
  //     }
  //   }
  // })

  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls 
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={20}
        enablePan={true} // Панорамирование включено по умолчанию
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
          ref={ref}
          // scale={clicked ? 1.5 : 1}
          // onClick={(event) => click(!clicked)}
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
