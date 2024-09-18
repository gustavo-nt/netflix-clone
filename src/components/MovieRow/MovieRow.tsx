import { useState } from "react";
import { Card } from "../Card";

import { HiChevronRight } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import styles from "./styles.module.scss";
import { MovieRowProps } from "./types";

export const MovieRow = ({
  title,
  onOpenDetails,
  items,
}: MovieRowProps.Default) => {
  const [scrollX, setScrollX] = useState<number>(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);

    if (x > 0) {
      x = 0;
    }

    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = items.length * 200;

    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }

    setScrollX(x);
  };

  return (
    <div className={styles.movieRow}>
      <div className={styles.movieRowHeader}>
        <div className={styles.movieRowTitle}>
          <h2>{title}</h2>

          <div className={styles.movieRowMore}>
            <HiChevronRight />
            <span>Ver tudo</span>
          </div>
        </div>
      </div>

      <div
        className={styles.movieRowLeft}
        onClick={handleLeftArrow}
        role="left-button"
      >
        <FiChevronLeft style={{ fontSize: 50 }} />
      </div>

      <div
        className={styles.movieRowRight}
        onClick={handleRightArrow}
        role="right-button"
      >
        <FiChevronRight style={{ fontSize: 50 }} />
      </div>

      <div className={styles.movieRowListArea}>
        <div
          className={styles.movieRowList}
          style={{
            marginLeft: scrollX,
            width: items.length * 200,
          }}
        >
          {items.map((item, index) => (
            <Card
              key={`${item.id}_${index}`}
              poster_path={item.poster_path}
              onClick={() => onOpenDetails(item)}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
