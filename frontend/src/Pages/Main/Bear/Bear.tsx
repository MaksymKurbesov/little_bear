import styles from "./Bear.module.css";
import { Canvas } from "@react-three/fiber";
import React, { lazy, Suspense, useCallback, useRef, useState } from "react";
import { POINTS_TO_ADD } from "../../../utils/consts.ts";
import { useAppState } from "../../../Stores/AppStateContext.tsx";
import LoadSpinning from "../../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useTelegram } from "../../../hooks/useTelegram.ts";
import { OrbitControls } from "@react-three/drei";
import { triggerVibration } from "../../../utils/helpers.ts";
import Lights from "../../../SharedUI/Lights/Lights.tsx";

const BearDance1 = lazy(() => import("../../../Bears3D/BearDance1.tsx"));
const BearDance2 = lazy(() => import("../../../Bears3D/BearDance2.tsx"));
const BearDance3 = lazy(() => import("../../../Bears3D/BearDance3.tsx"));
const Stand1 = lazy(() => import("../../../SharedUI/Stands/Stand1.tsx"));
const Stand2 = lazy(() => import("../../../SharedUI/Stands/Stand2.tsx"));
const Stand3 = lazy(() => import("../../../SharedUI/Stands/Stand3.tsx"));

const Bear = ({ setIsBouncing }) => {
  const { dispatch } = useAppState();
  const { tg } = useTelegram();

  const [action, setAction] = useState();
  const [dance, setDance] = useState(1);

  const controlsRef = useRef();

  const handleActionReady = (action) => {
    console.log(action, "handleActionReady");
    setAction(action);
  };

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsBouncing(false); // Сбрасываем состояние
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsBouncing(true); // Запускаем анимацию
        });
      });

      console.log(action, "action before inside bear");

      if (action) {
        console.log(action, "action inside bear");
        action.paused = false;
        setTimeout(() => {
          action.paused = true;
          action.reset().paused = true;
        }, 5000);
      }

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
    [dispatch, action],
  );

  return (
    <div className={styles["main-image-wrapper"]} onClick={handleCardClick}>
      <Suspense fallback={<LoadSpinning />}>
        <Canvas shadows camera={{ position: [0, 1.1, 5] }}>
          <Lights>
            <group position={[0, -0.4, 3.2]} scale={0.47}>
              <group position={[0, -0.1, 0]}>
                {dance === 1 && (
                  <>
                    <BearDance1 handleActionReady={handleActionReady} />
                    <Stand1 />
                  </>
                )}
                {dance === 2 && (
                  <>
                    <BearDance2 handleActionReady={handleActionReady} />
                    <Stand2 />
                  </>
                )}
                {dance === 3 && (
                  <>
                    <BearDance3 handleActionReady={handleActionReady} />
                    <Stand3 />
                  </>
                )}
              </group>

              <OrbitControls ref={controlsRef} />
            </group>
          </Lights>
        </Canvas>
      </Suspense>
      <div className={styles["buttons-wrapper"]}>
        <button
          onClick={() => {
            console.log(controlsRef, "controlsRef");
            controlsRef.current.reset();
          }}
          className={styles["reset-camera"]}
        >
          Reset camera
        </button>
        <div className={styles["buttons"]}>
          <button
            onClick={() => {
              setDance(1);
              dispatch({ type: "SET_SKIN_NUMBER", payload: 0 });
            }}
          >
            Dance 1
          </button>
          <button
            onClick={() => {
              setDance(2);
              dispatch({ type: "SET_SKIN_NUMBER", payload: 1 });
            }}
          >
            Dance 2
          </button>
          <button
            onClick={() => {
              setDance(3);
              dispatch({ type: "SET_SKIN_NUMBER", payload: 2 });
            }}
          >
            Dance 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bear;
