import { MovieRow } from "../../../../components/MovieRow";
import { usePreview } from "../../../../context/PreviewContext";

import styles from "./styles.module.scss";
import { HomeProps } from "../../types";

export const ListMovies = ({ list }: HomeProps.ListMovie) => {
  const { onUpdatePreview } = usePreview();

  return (
    <section className={styles.container}>
      {list.map(
        ({ slug, title, items }) =>
          items.length > 0 && (
            <MovieRow
              key={slug}
              title={title}
              onOpenDetails={onUpdatePreview}
              items={items}
            />
          ),
      )}
    </section>
  );
};
