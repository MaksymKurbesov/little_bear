import { useGLTF } from "@react-three/drei";

const Stand2 = (props) => {
  const { nodes, materials } = useGLTF("/stand_model2/untitled.gltf");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.StandBear.geometry}
        material={materials.Material}
        position={[0, -0.3, 0.2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.9}
      />
    </group>
  );
};

export default Stand2;

useGLTF.preload("/stand_model2/untitled.gltf");
