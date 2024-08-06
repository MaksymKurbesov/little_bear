import styles from "./SkinSlide.module.css";

const SkinSlide = ({ skin, currentPoints, level }) => {
  const progress = (currentPoints / skin.requiredPoints) * 100;
  const isCurrentSkin = skin.id === level + 1;
  const isPreviuosSkin = skin.id < level + 1;
  const isNextSkin = skin.id > level + 1;

  return (
    <div
      className={`${styles["slide"]} ${isPreviuosSkin || isCurrentSkin ? styles[skin.colorCN] : ""}`}
    >
      <img
        src={isPreviuosSkin ? skin.openedImage : skin.image}
        alt={""}
        width={220}
      />
      <div className={styles["info"]}>
        {isCurrentSkin && (
          <>
            <p className={styles["experience"]}>
              {currentPoints} / {skin.requiredPoints}
            </p>
            <div className={`${styles["progress-bar"]}`}>
              <div style={{ width: `${progress}%` }}></div>
            </div>
          </>
        )}
      </div>
      {isPreviuosSkin && <p className={styles["unpacked"]}>Unpacked!</p>}
      {isNextSkin && (
        <p className={styles["experience"]}>from {skin.requiredPoints}</p>
      )}
    </div>
  );
};

export default SkinSlide;
