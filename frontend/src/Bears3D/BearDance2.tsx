import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

const BearDance2 = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/new_bear_model/2/untitled.gltf",
  );

  const { actions, mixer } = useAnimations(animations, group);

  console.log(actions, "actions");
  useEffect(() => {
    if (actions && actions["Sta|CINEMA_4D_Main|Layer0"]) {
      actions["Sta|CINEMA_4D_Main|Layer0"].play();
    }
  }, [mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Bear2"
          position={[0.001, 0.106, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.25}
        >
          <skinnedMesh
            name="Bearbrick_Chest001"
            geometry={nodes.Bearbrick_Chest001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Bearbrick_Chest001.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Bearbrick_Head001"
            geometry={nodes.Bearbrick_Head001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Bearbrick_Head001.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Hand001"
            geometry={nodes.Hand001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Hand001.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Hand_1001"
            geometry={nodes.Hand_1001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Hand_1001.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Leg001"
            geometry={nodes.Leg001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Leg001.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Object002001"
            geometry={nodes.Object002001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Object002001.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Pelvis001"
            geometry={nodes.Pelvis001.geometry}
            material={materials["dark bear"]}
            skeleton={nodes.Pelvis001.skeleton}
            castShadow
          />
          <primitive object={nodes.mixamorig_HipsS} />
        </group>
      </group>
    </group>
  );
};

export default BearDance2;

useGLTF.preload("/new_bear_model/2/untitled.gltf");
