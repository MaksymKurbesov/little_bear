import { forwardRef, memo, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Model = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/bear_model/scene.gltf");
  const lightRef = useRef();

  useEffect(() => {
    useGLTF.preload("/bear_model/scene.gltf");
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time) * 25;
    const y = -10 + Math.cos(time) * 2;
    const z = 5;
    lightRef.current.position.set(x, y, z);
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.8}
        position={[0, 1.5, -4]}
      >
        <pointLight ref={lightRef} intensity={15.5} power={2000} />
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            geometry={nodes.Head_head_0.geometry}
            material={materials.head}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Ear_ears_0.geometry}
            material={materials.ears}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Body_body_0.geometry}
            material={materials.body}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Arms_arms_0.geometry}
            material={materials.arms}
            position={[176.207, -198.498, 222.708]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[63.186, 59.649, 57.147]}
          />
          <mesh
            geometry={nodes.Hands_hands_0.geometry}
            material={materials.hands}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Waist_mid_0.geometry}
            material={materials.material}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.Legs_legs_0.geometry}
            material={materials.legs}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
});

export default memo(Model);

useGLTF.preload("/bear_model/scene.gltf");
