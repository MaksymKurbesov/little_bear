import { useGLTF } from "@react-three/drei";

const Stand = (props) => {
  const { nodes, materials } = useGLTF("/stand_model/untitled.gltf");

  return (
    <group {...props} dispose={null}>
      <directionalLight
        castShadow
        intensity={1.5}
        position={[0, 5, 1]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.StandBear.geometry}
        material={materials.Material}
        position={[0, -0.44, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.8}
      />
    </group>
  );
};

export default Stand;

useGLTF.preload("/stand_model//untitled.gltf");
