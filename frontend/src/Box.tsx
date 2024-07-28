import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const { nodes, materials } = useGLTF("/scene.gltf");
  const lightRef = useRef();

  const [lightPosition, setLightPosition] = useState([0, 3, 4]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time) * 5;
    const y = 3 + Math.cos(time) * 2;
    const z = 3;
    setLightPosition([x, y, z]);
    lightRef.current.position.set(x, y, z);
  });

  return (
    <group {...props} dispose={null}>
      {/*<ambientLight />*/}
      <pointLight ref={lightRef} position={lightPosition} intensity={5.5} />
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.5}
        position={[0, 0.9, -0.5]}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Head_head_0.geometry}
            material={materials.head}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Ear_ears_0.geometry}
            material={materials.ears}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Body_body_0.geometry}
            material={materials.body}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Arms_arms_0.geometry}
            material={materials.arms}
            position={[176.207, -198.498, 222.708]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[63.186, 59.649, 57.147]}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Hands_hands_0.geometry}
            material={materials.hands}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Waist_mid_0.geometry}
            material={materials.material}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Legs_legs_0.geometry}
            material={materials.legs}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
