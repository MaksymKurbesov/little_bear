import styles from "./Tasks.module.css";

const Tasks = () => {
  return (
    <div className={styles["tasks"]}>
      <h1 className={"page-title"}>Tasks</h1>
      <p className={styles["subtitle"]}>
        Complete Tasks. Earn Points. Level Up.
      </p>
      <p className={styles["no-task"]}>We don't have any tasks for you 😔</p>
    </div>
  );
};

export default Tasks;
