import styles from "./Bear.module.css";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useCallback, useRef, useState } from "react";
import { POINTS_TO_ADD } from "../../../utils/consts.ts";
import { useAppState } from "../../../Stores/AppStateContext.tsx";
import LoadSpinning from "../../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useTelegram } from "../../../hooks/useTelegram.ts";
import { OrbitControls } from "@react-three/drei";
import { triggerVibration } from "../../../utils/helpers.ts";
import BearDance1 from "../../../Bears3D/BearDance1.tsx";
import BearDance2 from "../../../Bears3D/BearDance2.tsx";
import Stand from "../../../SharedUI/Stand/Stand.tsx";

const Bear = ({ setIsBouncing }) => {
  const { dispatch } = useAppState();
  const objectRef = useRef();
  const { tg } = useTelegram();

  const [dance, setDance] = useState(1);

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsBouncing(false); // Сбрасываем состояние
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsBouncing(true); // Запускаем анимацию
        });
      });

      setTimeout(() => setIsBouncing(false), 350); // Длительность анимации 1 секунда

      triggerVibration(tg);

      dispatch({
        type: "HANDLE_CARD_CLICK",
        payload: {
          pointsToAdd: POINTS_TO_ADD,
          click: { id: Date.now(), x: e.pageX, y: e.pageY },
        },
      });
    },
    [dispatch],
  );

  return (
    <div className={styles["main-image-wrapper"]} onClick={handleCardClick}>
      <Suspense fallback={<LoadSpinning />}>
        <Canvas shadows>
          <group scale={0.7} position={[0, -0.2, 0]}>
            <ambientLight intensity={0.4} />
            <directionalLight
              castShadow
              intensity={1.5}
              position={[10, 15, 6]}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight
              castShadow
              intensity={1.5}
              position={[-10, 15, 6]}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            {dance === 1 && <BearDance1 />}
            {dance === 2 && <BearDance2 />}
            <Stand />
          </group>
          <OrbitControls />
        </Canvas>
      </Suspense>
      <div className={styles["buttons"]}>
        <button onClick={() => setDance(1)}>Dance 1</button>
        <button onClick={() => setDance(2)}>Dance 2</button>
      </div>
    </div>
  );
};

export default Bear;
