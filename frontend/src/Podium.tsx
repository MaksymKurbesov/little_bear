import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Podium(props) {
  const { nodes, materials } = useGLTF("/test-scene.glb");
  const lightRef = useRef();

  useEffect(() => {
    useGLTF.preload("/test-scene.glb");
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time) * 15;
    const y = 3 + Math.cos(time) * 2;
    const z = 3;
    lightRef.current.position.set(x, y, z);
  });

  return (
    <group {...props} dispose={null} scale={0.05} position={[0, -2, -1]}>
      <ambientLight />
      <pointLight ref={lightRef} position={[-10, 0, -0]} intensity={15.5} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.entity_2.geometry}
        material={materials.entity_3}
        position={[0, 49.806, 1.823]}
        rotation={[-Math.PI / 2.3, 0, 0]}
        scale={0.4}
      />
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface2_podium_0.geometry}
          material={materials.podium}
          position={[0, 0, 10560.405]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/test-scene.glb");
