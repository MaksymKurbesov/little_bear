import styles from "./Bear.module.css";
import { Canvas } from "@react-three/fiber";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppState } from "../../../Stores/AppStateContext.tsx";
import LoadSpinning from "../../../SharedUI/LoadSpinning/LoadSpinning.tsx";
import { useTelegram } from "../../../hooks/useTelegram.ts";
import { OrbitControls } from "@react-three/drei";
import {
  debounce,
  getLevelByPoints,
  triggerVibration,
} from "../../../utils/helpers.ts";
import Lights from "../../../SharedUI/Lights/Lights.tsx";
import { userApi } from "../../../main.tsx";
const BearDance1 = lazy(() => import("../../../Bears3D/BearDance1.tsx"));
const BearDance2 = lazy(() => import("../../../Bears3D/BearDance2.tsx"));
const BearDance3 = lazy(() => import("../../../Bears3D/BearDance3.tsx"));
const Stand1 = lazy(() => import("../../../SharedUI/Stands/Stand1.tsx"));
const Stand2 = lazy(() => import("../../../SharedUI/Stands/Stand2.tsx"));
const Stand3 = lazy(() => import("../../../SharedUI/Stands/Stand3.tsx"));
import { v4 as uuidv4 } from "uuid";
import LevelUp from "../../../SharedUI/LevelUp/LevelUp.tsx";
import { useImagePreloader } from "../../../hooks/useImagePreloader.ts";
import LevelUpIcon from "../../../images/level-up.svg";
import { POINTS_TO_ADD } from "../../../utils/consts.ts";

const danceBearComponents = [
  { level: 1, Component: BearDance1, Stand: Stand1, points: 1 },
  { level: 2, Component: BearDance2, Stand: Stand2, points: 5 },
  { level: 3, Component: BearDance3, Stand: Stand3, points: 17 },
];

const Bear = ({}) => {
  const { state, dispatch } = useAppState();
  const { tg, user } = useTelegram();
  const [action, setAction] = useState();
  const [levelUpModal, setLevelUpModal] = useState(false);

  const clickedPointsRef = useRef(0);
  const imagesLoaded = useImagePreloader([LevelUpIcon]);

  const handleActionReady = useCallback((action) => {
    setAction(action);
  }, []);

  const sendPointsToServer = async () => {
    if (clickedPointsRef.current <= 0 || !user) return;

    try {
      action.paused = true;
      const currentUserPoints = await userApi.sendPointsToServer(
        user.id,
        clickedPointsRef.current,
      );

      clickedPointsRef.current = 0;

      if (!currentUserPoints) {
        return;
      }

      const currentLevel = getLevelByPoints(currentUserPoints);

      if (currentLevel > state.level) {
        setLevelUpModal(true);
        console.log(`Congratulations! You've reached Level ${currentLevel}`);
        // Trigger any additional UI updates or notifications here
      }
    } catch (error) {
      console.error("Error sending points to server:", error);
    }
  };

  const debouncedSendPointsToServer = useCallback(
    debounce(() => {
      sendPointsToServer();
    }, 500),
    [action],
  );

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      triggerVibration(tg);

      clickedPointsRef.current += POINTS_TO_ADD[state.level - 1];

      action.play();

      if (action.paused) {
        action.paused = false;
      }

      dispatch({
        type: "HANDLE_CARD_CLICK",
        payload: {
          pointsToAdd: POINTS_TO_ADD[state.level - 1],
          click: { id: uuidv4(), x: e.clientX, y: e.clientY },
        },
      });

      debouncedSendPointsToServer();
    },
    [dispatch, action, tg, debouncedSendPointsToServer],
  );

  return (
    <>
      {levelUpModal && imagesLoaded ? (
        <LevelUp
          onCollectHandler={() => {
            dispatch({
              type: "SET_USER_LEVEL",
              payload: getLevelByPoints(state.points),
            });
            setLevelUpModal(false);
          }}
          level={getLevelByPoints(state.points)}
        />
      ) : null}
      <div className={styles["main-image-wrapper"]} onClick={handleCardClick}>
        <Suspense fallback={<LoadSpinning />}>
          <Canvas shadows camera={{ position: [0, 1.1, 5] }}>
            <Lights>
              <group position={[0, -0.4, 3.2]} scale={0.47}>
                <group position={[0, -0.1, 0]}>
                  {danceBearComponents.map(({ level, Component, Stand }) => {
                    return (
                      state.level === level && (
                        <React.Fragment key={level}>
                          <Component handleActionReady={handleActionReady} />
                          <Stand />
                        </React.Fragment>
                      )
                    );
                  })}
                </group>

                {/*<OrbitControls ref={controlsRef} />*/}
              </group>
            </Lights>
          </Canvas>
        </Suspense>
        {/*<div className={styles["buttons-wrapper"]}>*/}
        {/*  <button*/}
        {/*    onClick={() => {*/}
        {/*      controlsRef.current.reset();*/}
        {/*    }}*/}
        {/*    className={styles["reset-camera"]}*/}
        {/*  >*/}
        {/*    Reset camera*/}
        {/*  </button>*/}
        {/*  <div className={styles["buttons"]}>*/}
        {/*    <button*/}
        {/*      onClick={() => {*/}
        {/*        setDance(1);*/}
        {/*        dispatch({ type: "SET_SKIN_NUMBER", payload: 0 });*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Dance 1*/}
        {/*    </button>*/}
        {/*    <button*/}
        {/*      onClick={() => {*/}
        {/*        setDance(2);*/}
        {/*        dispatch({ type: "SET_SKIN_NUMBER", payload: 1 });*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Dance 2*/}
        {/*    </button>*/}
        {/*    <button*/}
        {/*      onClick={() => {*/}
        {/*        setDance(3);*/}
        {/*        dispatch({ type: "SET_SKIN_NUMBER", payload: 2 });*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Dance 3*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Bear;
