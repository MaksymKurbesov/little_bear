import styles from "./Tasks.module.css";

const Tasks = () => {
  return (
    <div className={styles["tasks"]}>
      <h1 className={"page-title"}>Tasks</h1>
      <p className={styles["subtitle"]}>
        Complete Tasks. Earn Points. Level Up.
      </p>
    </div>
  );
};

export default Tasks;
