import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

const BearDance1 = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/new_bear_model/1/untitled.gltf",
  );

  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions, "actions");

    if (actions && actions["Dance|CINEMA_4D_Main|Layer0"]) {
      const action = actions["Dance|CINEMA_4D_Main|Layer0"];
      action.play();
      action.paused = true;
      action.time = 0;
      // setTimeout(() => {
      //   actions["Dance|CINEMA_4D_Main|Layer0"]?.stop().play();
      // }, 500);
    }
  }, [mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Dance"
          position={[0, 0.17, 0.005]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.25}
        >
          <skinnedMesh
            name="Bearbrick_Chest"
            geometry={nodes.Bearbrick_Chest.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Bearbrick_Chest.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Bearbrick_Head"
            geometry={nodes.Bearbrick_Head.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Bearbrick_Head.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Hand"
            geometry={nodes.Hand.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Hand.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Hand_1"
            geometry={nodes.Hand_1.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Hand_1.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Leg"
            geometry={nodes.Leg.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Leg.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Object002"
            geometry={nodes.Object002.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Object002.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Pelvis"
            geometry={nodes.Pelvis.geometry}
            material={materials["Mat.001"]}
            skeleton={nodes.Pelvis.skeleton}
            castShadow
          />
          <primitive object={nodes.mixamorig_HipsD} />
        </group>
      </group>
    </group>
  );
};

export default BearDance1;

useGLTF.preload("/new_bear_model/1/untitled.gltf");
