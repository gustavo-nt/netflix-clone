import { useState } from "react";

import { Show } from "../../../../../../directives/Show";
import { Hide } from "../../../../../../directives/Hide";

import { CircularProgress } from "../../../../../Loading/CircularProgress";
import { usePreview } from "../../../../../../context/PreviewContext";

import { BsPlus } from "react-icons/bs";
import BackError from "../../../../../../assets/error-back.png";

import { ReactComponent as Player } from "../../../../../../assets/icons/player.svg";
import { getFullYear } from "../../../../../../utils/getFullYear";

import styles from "./styles.module.scss";
import { RecommendProps } from "../../types";

export const Card = ({ item, idParent }: RecommendProps.Card) => {
  const { onUpdatePreview } = usePreview();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onHandlePreview = (item: RecommendProps.HandlePreview) => {
    onUpdatePreview({
      id: item.id,
      title: item.title,
      media_type: item.media_type,
    });
  };

  return (
    <div
      role="card"
      className={styles.simpleCard}
      onClick={() => item.id !== idParent && onHandlePreview(item)}
      style={{
        cursor: item.id === idParent ? "not-allowed" : "pointer",
      }}
    >
      <div className={styles.simpleImageWrapper}>
        <Show when={!!item.backdrop_path}>
          <Hide when={!isLoading}>
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          </Hide>

          <img
            style={!isLoading ? {} : { display: "none" }}
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            onLoad={() => setIsLoading(false)}
            alt={item.title}
          />
        </Show>

        <Hide when={!!item.backdrop_path}>
          <img src={BackError} alt={item.title} className={styles.img} />
        </Hide>

        <div className={styles.icon}>
          <Player />
        </div>

        <Show when={!!item.date}>
          <span>{getFullYear(item.date)}</span>
        </Show>
      </div>

      <div className={styles.simpleInfo}>
        <div className={styles.simpleHeader}>
          <div>
            <div className={styles.relevance}>
              {(item.vote_average * 10).toFixed(2)}% relevante
            </div>

            <div className={styles.title}>{item.title}</div>
          </div>

          <button className={styles.addList}>
            <BsPlus />
            <span>Adicionar à Minha lista</span>
          </button>
        </div>

        <div className={styles.simpleDetails}>
          <Show when={!!item.overview}>
            <p>{item.overview}</p>
          </Show>

          <Hide when={!!item.overview}>
            <p>Ops...O título em questão, não possui uma descrição.</p>
          </Hide>
        </div>
      </div>
    </div>
  );
};
