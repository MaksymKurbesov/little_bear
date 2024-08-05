import { forwardRef, memo, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Model = forwardRef((props, ref) => {
  // const { nodes, materials } = useGLTF("/bear_model/scene.gltf");
  const lightRef = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/new_bear_model/untitled.gltf",
  );
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions, "actions");
    if (actions && actions["stat2|CINEMA_4D_Main|Layer0"]) {
      actions["stat2|CINEMA_4D_Main|Layer0"].play();
    }
  }, [mixer]);

  // useEffect(() => {
  //   useGLTF.preload("/bear_model/scene.gltf");
  // }, []);

  useFrame((state) => {
    // const time = state.clock.getElapsedTime();
    // const x = Math.sin(time) * 25;
    // const y = -10 + Math.cos(time) * 2;
    // const z = 5;
    // lightRef.current.position.set(x, y, z);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <ambientLight />
      <pointLight
        ref={lightRef}
        intensity={2}
        power={500}
        castShadow={true}
        position={[4, 3, 6]}
      />
      <pointLight
        intensity={2}
        power={500}
        castShadow={true}
        position={[-4, 3, 6]}
      />
      <group name="Scene">
        <group
          name="stat2"
          position={[0.001, -0.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.2}
        >
          <skinnedMesh
            name="Bearbrick_Chest"
            geometry={nodes.Bearbrick_Chest.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Bearbrick_Chest.skeleton}
          />
          <skinnedMesh
            name="Bearbrick_Head"
            geometry={nodes.Bearbrick_Head.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Bearbrick_Head.skeleton}
          />
          <skinnedMesh
            name="Hand"
            geometry={nodes.Hand.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Hand.skeleton}
          />
          <skinnedMesh
            name="Hand_1"
            geometry={nodes.Hand_1.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Hand_1.skeleton}
          />
          <skinnedMesh
            name="Leg"
            geometry={nodes.Leg.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Leg.skeleton}
          />
          <skinnedMesh
            name="Object002"
            geometry={nodes.Object002.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Object002.skeleton}
          />
          <skinnedMesh
            name="Pelvis"
            geometry={nodes.Pelvis.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Pelvis.skeleton}
          />
          <primitive object={nodes.mixamorig_Hips} />
        </group>
      </group>
    </group>
  );

  // return (
  //   <group ref={ref} {...props} dispose={null}>
  //     <group
  //       rotation={[-Math.PI / 2, 0, 0]}
  //       scale={0.8}
  //       position={[0, 1.5, -4]}
  //     >
  //       <pointLight ref={lightRef} intensity={15.5} power={2000} />
  //       <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
  //         <mesh
  //           geometry={nodes.Head_head_0.geometry}
  //           material={materials.head}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={100}
  //         />
  //         <mesh
  //           geometry={nodes.Ear_ears_0.geometry}
  //           material={materials.ears}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={100}
  //         />
  //         <mesh
  //           geometry={nodes.Body_body_0.geometry}
  //           material={materials.body}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={100}
  //         />
  //         <mesh
  //           geometry={nodes.Arms_arms_0.geometry}
  //           material={materials.arms}
  //           position={[176.207, -198.498, 222.708]}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={[63.186, 59.649, 57.147]}
  //         />
  //         <mesh
  //           geometry={nodes.Hands_hands_0.geometry}
  //           material={materials.hands}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={100}
  //         />
  //         <mesh
  //           geometry={nodes.Waist_mid_0.geometry}
  //           material={materials.material}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={100}
  //         />
  //         <mesh
  //           geometry={nodes.Legs_legs_0.geometry}
  //           material={materials.legs}
  //           rotation={[-Math.PI / 2, 0, 0]}
  //           scale={100}
  //         />
  //       </group>
  //     </group>
  //   </group>
  // );
});

export default memo(Model);

useGLTF.preload("/new_bear_model/untitled.gltf");
