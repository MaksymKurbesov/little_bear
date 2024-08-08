import { useHelper, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import React, { forwardRef, useMemo, useRef } from "react";

const Lights = ({ children }) => {
  // const lightRef1 = useRef<THREE.AmbientLight>();
  const lightRef1 = useRef<THREE.DirectionalLight>();
  const lightRef2 = useRef<THREE.DirectionalLight>();
  const lightRef3 = useRef<THREE.SpotLight>();
  const lightRef4 = useRef<THREE.SpotLight>();

  // useHelper(lightRef1, THREE.DirectionalLightHelper);
  useHelper(lightRef1, THREE.DirectionalLightHelper);
  useHelper(lightRef2, THREE.DirectionalLightHelper);
  useHelper(lightRef3, THREE.SpotLightHelper);
  useHelper(lightRef4, THREE.SpotLightHelper);

  const spotlight = useMemo(() => new THREE.SpotLight("#fff"), []);

  return (
    <group scale={1.5} position={[0, -0.5, -5]} rotation={[-0.1, 0, 0]}>
      <ambientLight intensity={0.7} />
      <spotLight
        angle={Math.PI / 30}
        position={[-3, 16, 4]}
        power={1300}
        decay={1.5}
        castShadow
        // ref={lightRef3}
      />
      <spotLight
        angle={Math.PI / 30}
        position={[3, 16, 4]}
        power={1300}
        decay={1.5}
        castShadow
        // ref={lightRef4}
      />

      {/*<directionalLight*/}
      {/*  castShadow*/}
      {/*  intensity={1.5}*/}
      {/*  position={[0, 3, 4]}*/}
      {/*  shadow-mapSize-width={1024}*/}
      {/*  shadow-mapSize-height={1024}*/}
      {/*  ref={lightRef1}*/}
      {/*/>*/}
      <directionalLight
        castShadow
        intensity={1}
        position={[0, -1, 6]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        // ref={lightRef2}
      />

      {children}
    </group>
  );
};

export default Lights;
