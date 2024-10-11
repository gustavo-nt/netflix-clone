import { Card } from "../Card";

import { HiChevronRight } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useMovieRow } from "./hooks/useMovieRow";

import styles from "./styles.module.scss";
import { MovieRowProps } from "./types";

export const MovieRow = ({
  title,
  onOpenDetails,
  items,
}: MovieRowProps.Default) => {
  const { scrollX, handleLeftArrow, handleRightArrow } = useMovieRow({ items });

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
