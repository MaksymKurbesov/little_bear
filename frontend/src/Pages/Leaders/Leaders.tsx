import styles from "./Leaders.module.css";

const Leaders = () => {
  return (
    <div className={`${styles.leaders} main`}>
      <h1 className={"page-title"}>Leaders</h1>
      <p className={styles["subtitle"]}>Top Performers: Leading the Game</p>
      <ul className={styles["leaders-list"]}>
        <li className={styles["headers"]}>
          <span>№</span> <p>Nickname</p> <p>Dance time</p>
        </li>
        <li>
          <span>1</span> <p>BerryNew9057</p> <p>543s</p>
        </li>
        <li>
          <span>2</span> <p>to_control_yourself</p> <p>412s</p>
        </li>
        <li>
          <span>3</span> <p>stillish</p> <p>411s</p>
        </li>
        <li>
          <span>4</span> <p>firmament42</p> <p>387s</p>
        </li>
        <li>
          <span>5</span> <p>TheTrollinator777</p> <p>341s</p>
        </li>
        <li>
          <span>6</span> <p>Dave-C</p> <p>301s</p>
        </li>
        <li>
          <span>7</span> <p>AlphaOwn</p> <p>259s</p>
        </li>
        <li>
          <span>8</span> <p>PostNutRagrets</p> <p>222s</p>
        </li>
        <li>
          <span>9</span> <p>Drostan_</p> <p>195s</p>
        </li>
        <li>
          <span>10</span> <p>Argon288</p> <p>100s</p>
        </li>
      </ul>
    </div>
  );
};

export default Leaders;
