import styles from "./SkinSlide.module.css";

const SkinSlide = ({ skin, currentPoints, level, isActive }) => {
  const progress = (currentPoints / skin.requiredPoints) * 100;
  const isCurrentSkin = skin.id === level + 1;
  const isPreviuosSkin = skin.id < level + 1;
  const isNextSkin = skin.id > level + 1;

  console.log(isActive, "isActive");

  return (
    <div className={`${styles["slide"]} ${styles[skin.colorCN]}`}>
      <img
        src={isPreviuosSkin ? skin.openedImage : skin.image}
        alt={""}
        width={220}
        loading="lazy"
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
      <div className="swiper-lazy-preloader"></div>
    </div>
  );
};

export default SkinSlide;
