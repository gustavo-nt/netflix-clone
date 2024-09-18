import { useQuery } from "@tanstack/react-query";
import { useState, useLayoutEffect } from "react";

import { Show } from "../../../../directives/Show";
import { Hide } from "../../../../directives/Hide";

import { Card } from "./components/Card";
import { Skeleton } from "./components/Skeleton";

import api from "../../../../services/api";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "../../types";

export const Season = ({
  id,
  episodes,
  numberOfSeasons,
}: PreviewMovieProps.Season) => {
  const [episodesSeason, setEpisodesSeason] =
    useState<PreviewMovieProps.Episode[]>(episodes);

  const [numberSeason, setNumberSeason] = useState<number>(0);

  const { isLoading, data } = useQuery({
    queryKey: ["seasonData", numberSeason, id],
    queryFn: async () => {
      const { data } = await api.get(`tv/${id}/season/${numberSeason}`);

      return data;
    },
    enabled: !!numberSeason,
  });

  const onHandleSeason = (value: number) => {
    setNumberSeason(value);
  };

  useLayoutEffect(() => {
    if (data) {
      setEpisodesSeason(data.episodes);
    }
  }, [data]);

  return (
    <div className={styles.season}>
      <div className={styles.seasonContentHead}>
        <p>Episódios</p>

        <Show when={!!numberOfSeasons && numberOfSeasons > 1}>
          <select
            role="select"
            onChange={(e) => onHandleSeason(Number(e.target.value))}
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
              <Card key={value.id} item={value} role="card" />
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
