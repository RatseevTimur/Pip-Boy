import React, {useEffect, useState} from "react";
import { Environment, Html, PresentationControls, useGLTF, Float, ContactShadows } from "@react-three/drei";
import IframeLoader from "./IframeLoader.jsx"

export default function PipBoy(){
    const pip_boy = useGLTF(
      // 'src/models/retro-modernized_pip_boy_editable_screen.glb'
      'src/models/pip-boy_fallout_3_concept.glb'
    )

    console.log(pip_boy)

    useEffect(()=>{
      for (let key in pip_boy.nodes) {
        if(key.includes('Screen')){
          delete pip_boy.nodes[key]
        }
      }
      
    },[])

    return(
      // <Float floatIntensity={10} rotationIntensity={4}>
      <primitive object={pip_boy.scene} position={[ 0, 0, 0]} rotation={[1.2,0,0]}>
        <Html wrapperClass="pip_boy"
          style={{
            userSelect: 'none',
            backgroundColor: '#523f4f',
            background: '#523f4f',
            transformOrigin: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1038px', // Adjust width and height as needed
            height: '750px',
          }}
          castShadow
          receiveShadow
          occlude="blending"
          position={[.28, .18, -1.2]}
          transform
          distanceFactor={1.4}
          rotation={[-1.55,0,0]}
        >
          <IframeLoader src="src/todo.html" radius={170} width={1000} height={700}/>
        </Html>
      </primitive>
      // </Float>
    )
}