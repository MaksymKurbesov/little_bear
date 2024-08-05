import { useGLTF } from "@react-three/drei";

const StatueStand = (props) => {
  const { nodes, materials } = useGLTF("/tahla_statue_stand.glb");
  return (
    <group
      {...props}
      dispose={null}
      position={[-3, -3.65, -2.5]}
      scale={0.08}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
    >
      <group>
        <group>
          <lineSegments
            geometry={nodes.Material3.geometry}
            material={nodes.Material3.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Material2.geometry}
            material={nodes.Material2.material}
          />
          <lineSegments
            geometry={nodes.Material3_1.geometry}
            material={nodes.Material3_1.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Material2_1.geometry}
            material={nodes.Material2_1.material}
          />
          <lineSegments
            geometry={nodes.Material3_2.geometry}
            material={nodes.Material3_2.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Material2_2.geometry}
            material={nodes.Material2_2.material}
          />
        </group>
      </group>
    </group>
  );
};

export default StatueStand;

useGLTF.preload("/tahla_statue_stand.glb");
