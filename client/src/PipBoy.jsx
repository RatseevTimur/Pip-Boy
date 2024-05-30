import { Environment, Html, PresentationControls, useGLTF } from "@react-three/drei";

export default function Laptop(){
    const laptop = useGLTF(
      "src/models/pip-boy_fallout_3_concept/scene.gltf"
    )
    
    return(
      <primitive object={laptop.scene} position={[ 0, 0, 0]} rotation={[1.2,0,0]}>
        <Html wrapperClass="laptop"
          position={[.28, .1, -1.1]}
          transform distanceFactor={1.3}
          rotation={[-1.58,0,0]}>
          <iframe src="src/todo.html" style={{borderRadius: 200}}/>
        </Html>
      </primitive>
    )
}