import styles from "./Bear.module.css";
import { Canvas } from "@react-three/fiber";
import Model from "../../../../Bear3D.tsx";
import React, { Suspense, useCallback, useRef } from "react";
import { POINTS_TO_ADD } from "../../../../utils/consts.ts";
import { useAppState } from "../../../../Stores/AppStateContext.tsx";
import { Podium } from "../../../../Podium.tsx";
import LoadSpinning from "../../../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useTelegram } from "../../../../hooks/useTelegram.ts";

const Bear = ({ setIsBouncing }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { dispatch } = useAppState();
  const objectRef = useRef();
  const { tg } = useTelegram();

  const triggerVibration = () => {
    const vibrationEnabled =
      localStorage.getItem("vibrationEnabled") === "true";
    if (vibrationEnabled) {
      tg.HapticFeedback.impactOccurred("rigid");
    }
  };

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

      triggerVibration();
      // const rect = card.getBoundingClientRect();
      // const x = e.clientX - rect.left - rect.width / 2;
      // const y = e.clientY - rect.top - rect.height / 2;
      // card.style.transform = `perspective(1000px) rotateX(${
      //   -y / 10
      // }deg) rotateY(${x / 10}deg)`;

      setTimeout(() => {
        card.style.transform = "";
      }, 100);

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
          <Canvas>
            <Model ref={objectRef} />
          </Canvas>
        </Suspense>
      </>
    </div>
  );
};

export default Bear;
