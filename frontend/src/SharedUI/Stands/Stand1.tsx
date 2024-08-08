import { useGLTF } from "@react-three/drei";

const Stand1 = (props) => {
  const { nodes, materials } = useGLTF("/stand_model1/untitled.gltf");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stand3.geometry}
        material={materials["Mat.1"]}
        position={[0, -3.1, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.0125}
      />
    </group>
  );
};

export default Stand1;

useGLTF.preload("/stand_model1/untitled.gltf");
