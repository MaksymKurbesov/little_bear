import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const BearDance3 = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/new_bear_model/3/untitled.gltf",
  );

  const { actions, mixer } = useAnimations(animations, group);

  console.log(actions, "actions");

  useEffect(() => {
    if (actions && actions["Stand1|CINEMA_4D_Main|Layer0"]) {
      const action = actions["Stand1|CINEMA_4D_Main|Layer0"];

      action.play();
      // action.paused = true;
    }
  }, [mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Stand"
          position={[0.001, 0.336, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.25}
        >
          <skinnedMesh
            name="Bearbrick_Chest"
            geometry={nodes.Bearbrick_Chest.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Bearbrick_Chest.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Bearbrick_Head"
            geometry={nodes.Bearbrick_Head.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Bearbrick_Head.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Hand"
            geometry={nodes.Hand.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Hand.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Hand_1"
            geometry={nodes.Hand_1.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Hand_1.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Leg"
            geometry={nodes.Leg.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Leg.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Object002"
            geometry={nodes.Object002.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Object002.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Pelvis"
            geometry={nodes.Pelvis.geometry}
            material={materials["Mat.006"]}
            skeleton={nodes.Pelvis.skeleton}
            castShadow
          />
          <primitive object={nodes.mixamorig_HipsS} />
        </group>
      </group>
    </group>
  );
};

export default BearDance3;

useGLTF.preload("/new_bear_model/3/untitled.gltf");
