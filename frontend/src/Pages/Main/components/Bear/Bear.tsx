import styles from "./Bear.module.css";
import { Canvas } from "@react-three/fiber";
import Model from "../../../../Box.tsx";
import React, { useCallback, useRef } from "react";
import { POINTS_TO_ADD } from "../../../../utils/consts.ts";
import { useAppState } from "../../../../Stores/AppStateContext.tsx";

const Bear = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { state, dispatch } = useAppState();
  const objectRef = useRef();

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${
        -y / 10
      }deg) rotateY(${x / 10}deg)`;

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
        <Canvas>
          <Model ref={objectRef} />
        </Canvas>
      </>
    </div>
  );
};

export default Bear;
