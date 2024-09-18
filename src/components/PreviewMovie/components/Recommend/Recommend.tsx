import { Show } from "../../../../directives/Show";

import { Card } from "./components/Card";
import { NoResults } from "./components/NoResults";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "../../types";

export const Recommend = ({
  id,
  list,
  label,
  title,
  showNoResults = false,
}: PreviewMovieProps.Recommend) => {
  return (
    <div className={styles.recommend}>
      <div className={styles.recommendContentHead}>
        <p>{label}</p>
      </div>

      <div className={styles.recommendContentList}>
        <Show when={list.length > 0}>
          <div>
            {list.map((value) => (
              <Card key={value.id} idParent={id} item={value} />
            ))}
          </div>
        </Show>

        <Show when={list.length === 0 && showNoResults}>
          <NoResults title={title} />
        </Show>
      </div>
    </div>
  );
};
