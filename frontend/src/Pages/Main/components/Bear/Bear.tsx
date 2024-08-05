import styles from "./Bear.module.css";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useCallback, useRef } from "react";
import { POINTS_TO_ADD } from "../../../../utils/consts.ts";
import { useAppState } from "../../../../Stores/AppStateContext.tsx";
import { Podium } from "../../../../Podium.tsx";
import LoadSpinning from "../../../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useTelegram } from "../../../../hooks/useTelegram.ts";
import { OrbitControls } from "@react-three/drei";
import BearContainer from "../../../../BearContainer.tsx";
import { triggerVibration } from "../../../../utils/helpers.ts";

const Bear = ({ setIsBouncing }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { dispatch } = useAppState();
  const objectRef = useRef();
  const { tg } = useTelegram();

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsBouncing(false); // Сбрасываем состояние
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsBouncing(true); // Запускаем анимацию
        });
      });

      setTimeout(() => setIsBouncing(false), 350); // Длительность анимации 1 секунда

      const card = cardRef.current;

      if (!card) return;

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
    <div
      ref={cardRef}
      className={styles["main-image-wrapper"]}
      onClick={handleCardClick}
    >
      <>
        <Suspense fallback={<LoadSpinning />}>
          <Canvas shadows>
            <BearContainer ref={objectRef} />
            {/*<OrbitControls />*/}
          </Canvas>
        </Suspense>
      </>
    </div>
  );
};

export default Bear;
