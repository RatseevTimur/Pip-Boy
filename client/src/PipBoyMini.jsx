import React, {useState} from "react";
import { Environment, Html, PresentationControls, useGLTF, Float, ContactShadows } from "@react-three/drei";
import IframeLoader from "./IframeLoader.jsx"

export default function PipBoy(){
    const pip_boy = useGLTF(
      'src/models/retro-modernized_pip_boy_editable_screen.glb'
    )
    return(
      // <Float floatIntensity={10} rotationIntensity={4}>
      <primitive object={pip_boy.scene} scale={2}
        position={[ 0, 0, 0]} rotation={[1.2,-1.58,0]}>
        <Html wrapperClass="pip_boy"
          style={{
            userSelect: 'none',
            backgroundColor: 'transparent',
            background: 'none',
            borderRadius: '170px !important',
            transformOrigin: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '600px',
            height: '670px',
          }}
          castShadow
          receiveShadow
          occlude="blending"
          position={[.05, .83, 0.17]}
          transform
          distanceFactor={.7}
          rotation={[-Math.PI/2,0.05,Math.PI/2]}
        >
          <IframeLoader src="src/todo-mini.html" radius={0} width={640}/>
        </Html>
      </primitive>
      // </Float>
    )
}