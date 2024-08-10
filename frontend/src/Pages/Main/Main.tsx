import styles from "./Main.module.css";
import { useCallback } from "react";
import { useAppState } from "../../Stores/AppStateContext.tsx";
import Bear from "./Bear/Bear.tsx";
import { POINTS_TO_ADD } from "../../utils/consts.ts";
import Points from "./Points/Points.tsx";

const Main = () => {
  const { state, dispatch } = useAppState();
  // const imagesLoaded = useImagePreloader([BackgroundImage, BearIcon]);

  const handleAnimationEnd = useCallback((id: number) => {
    dispatch({ type: "REMOVE_CLICK", payload: id });
  }, []);

  // if (!imagesLoaded) {
  //   return (
  //     <div className={"suspense"}>
  //       <LoadSpinning />
  //     </div>
  //   );
  // }

  return (
    <div className={styles["main"]}>
      <Points points={state.points} />
      <Bear />

      {state.clicks.map((click) => (
        <div
          key={click.id}
          className={`${styles["earned-points"]} absolute text-5xl font-bold opacity-0 text-white pointer-events-none`}
          style={{
            top: `${click.y - 50}px`,
            left: `${click.x - 50}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{POINTS_TO_ADD[state.level - 1]}
        </div>
      ))}
    </div>
  );
};

export default Main;
