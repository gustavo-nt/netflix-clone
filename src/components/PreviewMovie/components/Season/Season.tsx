import { Show } from "../../../../directives/Show";
import { Hide } from "../../../../directives/Hide";

import { Card } from "./components/Card";
import { Skeleton } from "./components/Skeleton";

import { useSeason } from "./hooks/useSeason";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "../../types";

export const Season = ({
  id,
  episodes,
  numberOfSeasons,
}: PreviewMovieProps.Season) => {
  const { episodesSeason, isLoading, numberSeason, handleSeason } = useSeason({
    episodes,
    id,
  });

  return (
    <div className={styles.season}>
      <div className={styles.seasonContentHead}>
        <p>Episódios</p>

        <Show when={!!numberOfSeasons && numberOfSeasons > 1}>
          <select
            role="select"
            onChange={(e) => handleSeason(Number(e.target.value))}
          >
            {new Array(numberOfSeasons).fill("").map((_item, index) => (
              <option key={index} value={index + 1}>
                Temporada {index + 1}
              </option>
            ))}
          </select>
        </Show>
      </div>

      <div className={styles.seasonContentList}>
        <Show when={isLoading && !!numberSeason}>
          {new Array(episodes.length).fill("").map((_, index) => (
            <Skeleton key={index} />
          ))}
        </Show>

        <Hide when={isLoading && !!numberSeason}>
          <Show when={episodesSeason.length > 0}>
            {episodesSeason.map((value) => (
              <Card key={value.id} item={value} />
            ))}
          </Show>

          <Hide when={episodesSeason.length > 0}>
            <span>
              Ops...Infelizmente não encontramos episódios para esta temporada.
            </span>
          </Hide>
        </Hide>
      </div>
    </div>
  );
};
