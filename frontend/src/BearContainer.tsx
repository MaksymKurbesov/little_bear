import { forwardRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import Bear1 from "./Bears3D/Bear1.tsx";
import Bear2 from "./Bears3D/Bear2.tsx";
import StatueStand from "./SharedUI/StatueStand/StatueStand.tsx";

const BearContainer = forwardRef((props, ref) => {
  return (
    <group scale={0.7} position={[0, -0.2, 0]}>
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        intensity={1}
        position={[10, 15, 6]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        castShadow
        intensity={1}
        position={[-10, 15, 6]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Bear1 />
      <StatueStand />
    </group>
  );
});

export default memo(BearContainer);

useGLTF.preload("/new_bear_model/untitled.gltf");
