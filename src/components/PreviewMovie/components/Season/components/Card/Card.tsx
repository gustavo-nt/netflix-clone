import { CircularProgress } from "../../../../../Loading/CircularProgress";

import { Hide } from "../../../../../../directives/Hide";
import { Show } from "../../../../../../directives/Show";

import { useCard } from "./hooks/useCard";

import BackError from "../../../../../../assets/error-back.png";
import { ReactComponent as Player } from "../../../../../../assets/icons/player.svg";

import { SeasonProps } from "../../types";
import styles from "./styles.module.scss";

export const Card = ({ item }: SeasonProps.Card) => {
  const { isLoading, onHideLoading } = useCard();

  return (
    <div className={styles.episodeCard} role="card">
      <div className={styles.episodeNumber}>
        <span>{item.episode_number}</span>
      </div>

      <div className={styles.episodeImage}>
        <Show when={!!item.still_path}>
          <Hide when={!isLoading}>
            <div className={styles.loading}>
              <CircularProgress
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
            </div>
          </Hide>

          <img
            src={`https://image.tmdb.org/t/p/original${item.still_path}`}
            style={!isLoading ? {} : { display: "none" }}
            onLoad={onHideLoading}
            alt={item.name}
          />
        </Show>

        <Hide when={!!item.still_path}>
          <img
            src={BackError}
            alt={`${item.name + " não possui imagem de capa"}`}
            className={styles.img}
          />
        </Hide>

        <div className={styles.episodeIconPlay}>
          <Player />
        </div>
      </div>

      <div className={styles.episodeDetails}>
        <div className={styles.title}>
          <span>{item.name}</span>
          <span>{item.runtime || 0} min</span>
        </div>

        <Show when={!!item.overview}>
          <p className={styles.info}>{item.overview}</p>
        </Show>

        <Hide when={!!item.overview}>
          <p className={styles.info}>
            Ops...este episódio não possui uma sinopse.
          </p>
        </Hide>
      </div>
    </div>
  );
};
