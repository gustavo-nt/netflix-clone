import YouTube from "react-youtube";

import { Show } from "../../../../directives/Show";
import { Hide } from "../../../../directives/Hide";

import { CircularProgress } from "../../../Loading/CircularProgress";
import BackError from "../../../../assets/error-back.png";

import { useMedia } from "./hooks/useMedia";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "../../types";

export const Media = ({
  title,
  videoId,
  backdropPath,
  soundReleased,
}: PreviewMovieProps.Media) => {
  const {
    loadedMain,
    onPlayerReady,
    onPlayerError,
    isVisibleVideo,
    onHideLoading,
    soundElement,
    onPlayerEnd,
  } = useMedia({ soundReleased });

  return (
    <div className={styles.media}>
      <Show when={!!videoId}>
        <div role="embed">
          <YouTube
            ref={soundElement}
            className={styles.iframe}
            style={{
              display: isVisibleVideo ? "block" : "none",
            }}
            videoId={videoId}
            opts={{
              height: "495",
              width: "100%",
              playerVars: {
                mute: 1,
                controls: 0,
                autoplay: 1,
                showinfo: 0,
                enablejsapi: 1,
                origin: window.location.href,
              },
            }}
            onReady={onPlayerReady}
            onError={onPlayerError}
            onEnd={onPlayerEnd}
          />
        </div>
      </Show>

      <Show when={!!(!isVisibleVideo && backdropPath)}>
        <Hide when={loadedMain}>
          <div className={styles.onLoad}>
            <CircularProgress />
          </div>
        </Hide>

        <img
          style={loadedMain ? {} : { display: "none" }}
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          onLoad={onHideLoading}
          alt={title}
        />
      </Show>

      <Show when={!!(!isVisibleVideo && !backdropPath)}>
        <img src={BackError} alt={title} aria-label={title} />
      </Show>
    </div>
  );
};
