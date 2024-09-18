import styles from "./styles.module.scss";

export const SkeletonNetflix = () => {
  const arr = new Array(31).fill("");

  return (
    <div className={styles.container}>
      <div className={styles.netflixIntro}>
        <div className={styles.n} data-letter="N">
          <div className={styles.helper1}>
            <div className={styles.effectBrush}>
              {arr.map((_, index) => (
                <span
                  key={index}
                  className={styles.fur}
                  data-fur={arr.length - index}
                />
              ))}
            </div>
            <div className={styles.effectLumieres}>
              {arr.map((_, index) => (
                <span
                  key={index}
                  className={styles.lamp}
                  data-lamp={index + 1}
                />
              ))}
            </div>
          </div>
          <div className={styles.helper2}>
            <div className={styles.effectBrush}>
              {arr.map((_, index) => (
                <span
                  key={index}
                  className={styles.fur}
                  data-fur={arr.length - index}
                />
              ))}
            </div>
          </div>
          <div className={styles.helper3}>
            <div className={styles.effectBrush}>
              {arr.map((_, index) => (
                <span
                  key={index}
                  className={styles.fur}
                  data-fur={arr.length - index}
                />
              ))}
            </div>
          </div>
          <div className={styles.helper4}>
            <div className={styles.effectBrush}>
              {arr.map((_, index) => (
                <span
                  key={index}
                  className={styles.fur}
                  data-fur={arr.length - index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
