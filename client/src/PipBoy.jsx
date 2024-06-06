import React, {useState} from "react";
import { Environment, Html, PresentationControls, useGLTF } from "@react-three/drei";
// import IframeLoader from "./IframeLoader.js"

export default function Laptop(){
    const laptop = useGLTF(
      "src/models/pip-boy_fallout_3_concept/scene.gltf"
    )

    const [iframeLoaded, setIframeLoaded] = useState(false);
    // Функция, которая будет вызвана, когда iframe загрузится
    const handleIframeLoad = () => {
      setIframeLoaded(true);
    };
  
    return(
      <primitive object={laptop.scene} position={[ 0, 0, 0]} rotation={[1.2,0,0]}>
        <Html wrapperClass="laptop"
          position={[.28, .1, -1.1]}
          transform 
          distanceFactor={1.28}
          rotation={[-1.58,0,0]}>
          <iframe rel="preload" as="document" 
            src="src/todo.html" style={{borderRadius: 170}}
            // onLoad={handleIframeLoad}
          />
          {/* <IframeLoader src="src/todo.html" /> */}
        </Html>
      </primitive>
    )
}