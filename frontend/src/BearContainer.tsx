import { forwardRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import BearDance1 from "./Bears3D/BearDance1.tsx";
import Bear2 from "./Bears3D/Bear2.tsx";
import StatueStand from "./SharedUI/StatueStand/StatueStand.tsx";

const BearContainer = forwardRef((props, ref) => {
  return (
    <group scale={0.7} position={[0, -0.2, 0]}>
      <BearDance1 />
      <StatueStand />
    </group>
  );
});

export default memo(BearContainer);

useGLTF.preload("/new_bear_model/untitled.gltf");
