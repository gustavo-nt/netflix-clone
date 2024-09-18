import styles from "./styles.module.scss";

export const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.number}>
        <span />
      </div>

      <div className={styles.image} />

      <div className={styles.details}>
        <div className={styles.info}>
          <span />
          <span />
        </div>

        <div className={styles.description}>
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};
