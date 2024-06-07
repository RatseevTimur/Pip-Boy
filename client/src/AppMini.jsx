import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import { Environment, OrbitControls, PresentationControls, Html, 
  MeshTransmissionMaterial, ContactShadows, Float, Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import PipBoy from './PipBoy.jsx'
import PipBoyMini from './PipBoyMini.jsx'
import { useControls } from 'leva';
import { MathUtils } from 'three'
import * as THREE from 'three'

import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

const material = new THREE.MeshStandardMaterial()
const geometries = [
  { geometry: new THREE.TetrahedronBufferGeometry(2) },
  { geometry: new THREE.CylinderBufferGeometry(0.8, 0.8, 2, 32) },
  { geometry: new THREE.ConeGeometry(1.1, 1.7, 32) },
  { geometry: new THREE.SphereBufferGeometry(1.5, 32, 32) },
  { geometry: new THREE.IcosahedronBufferGeometry(2) },
  { geometry: new THREE.TorusBufferGeometry(1.1, 0.35, 16, 32) },
  { geometry: new THREE.OctahedronGeometry(2) },
  { geometry: new THREE.SphereBufferGeometry(1.5, 32, 32) },
  { geometry: new THREE.BoxBufferGeometry(2.5, 2.5, 2.5) }
]

export function Model() {
  const { viewport } = useThree()
  const torus = useRef(null);

    // const materialProps = useControls({
    //     thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.02, min: 0, max: 1},
    //     backside: { value: true},
    // })

    const materialProps = {
      transparent: true,
      opacity: 0.5,
      transmission: 0.95,
      thickness: 0.2,
      roughness: 0.1,
      ior: 1.2,
      chromaticAberration: 1,
      anisotropy: 0.1,
      clearcoat: 0.1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 0.2,
      attenuationDistance: .5,
      attenuationColor: '#ffffff',
      depthWrite: false, // Important for transparency
    };
    
    return (
        // <group scale={viewport.width / 3} position={[0,0,2]}>
            <mesh ref={torus} position={[-0.16,0.16,0.8]} rotation={[-.3,0,0]}>
                <boxGeometry attach="geometry" args={[ 1., 1.1, .05]} 
                  amount={10 * 2}
                  bevelEnabled={true}
                  bevelSegments={10 * 2}
                  steps={1}
                  bevelSize={10}
                  bevelThickness={10}
                  curveSegments={10}
                /> 
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        // </group>
    )
}

export function Geometries() {
  const n = 40
  const randProps = useMemo(() => Array.from({ length: n }, () => geometries[Math.floor(Math.random() * geometries.length)]), [])
  return randProps.map((prop) => {
    return (
      <Float>
        <mesh
          scale={MathUtils.randFloat(0.25, 0.5)}
          position={[MathUtils.randFloat(-8, 8), MathUtils.randFloat(-8, 8), MathUtils.randFloat(-8, 8)]}
          geometry={prop.geometry}
          material={material}
        />
      </Float>
    )
  })
}

function App() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [mini, setMini] = useState(true)

  const pipBoyRef = useRef();
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 5));

  const { cameraPosition } = useSpring({
    cameraPosition: targetPosition,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handlePipBoyClick = () => {
    const newTargetPosition = new THREE.Vector3(0, 0, 1.5); // Позиция камеры после наезда
    setTargetPosition(newTargetPosition);
  };

  return (
    <Canvas>
      <animated.perspectiveCamera
        position={cameraPosition.to((x, y, z) => [x, y, z])}
        fov={75}
        near={0.1}
        far={1000}
      />
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      {/* <color attach="background" args={["#434343"]} /> */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minDistance={5}
        maxDistance={20}
        enablePan={true}
        panSpeed={0.5}
      />
      <Center>
       
        
        
          <mesh ref={pipBoyRef} onClick={handlePipBoyClick}>
          {/* {mini ?  */}
            <PipBoyMini/>
          {/* :  */}
            {/* <PipBoy/> */}
          {/* } */}
          </mesh>
        
        

        
          <Html 
          castShadow
          receiveShadow
          occlude="blending"
          position={[-3, 0, 0]}
          transform
          distanceFactor={1.4}
          >
            <button onClick={()=>navigate('/')}>Click Me</button>
          </Html>
        

      </Center>
      <Environment background preset="dawn" blur={0.8} />
      <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1} />
    </Canvas>
  )
}

export default App;