import { Hide } from "../../directives/Hide";
import { Show } from "../../directives/Show";

import { About } from "./components/About";
import { Media } from "./components/Media";
import { Season } from "./components/Season";

import { Genres } from "./components/Genres";
import { Status } from "./components/Status";
import { Recommend } from "./components/Recommend";

import { MaturityLevel } from "./components/MaturityLevel";
import { ProductionCompanies } from "./components/ProductionCompanies";

import { CgClose } from "react-icons/cg";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsPlayFill, BsPlus } from "react-icons/bs";

import { ReactComponent as SoundOn } from "../../assets/icons/sound-on.svg";
import { ReactComponent as SoundOff } from "../../assets/icons/sound-off.svg";

import { usePreviewMovie } from "./hooks/usePreviewMovie";
import { getFullYear } from "../../utils/getFullYear";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "./types";

export const PreviewMovie = (item: PreviewMovieProps.Default) => {
  const {
    id,
    cast,
    date,
    title,
    season,
    status,
    duration,
    recommends,
    backdrop_path,
    contentRatings,
    number_of_seasons,
    production_companies,
    vote_average,
    openedSearch,
    collection,
    overview,
    videoId,
    genres,
    crew,
  } = item;

  const { visibleModal, onClose, soundReleased, onHandleSound, overviewEl } =
    usePreviewMovie({ openedSearch });

  return (
    <Show when={visibleModal}>
      <div
        className={styles.previewMovie}
        role="dialog-preview"
        onClick={onClose}
      >
        <div
          className={styles.previewMovieModal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.previewMovieHeader}>
            <div className={styles.previewMovieBackdrop}>
              <Media
                title={title}
                videoId={videoId}
                backdropPath={backdrop_path}
                soundReleased={soundReleased}
              />

              <div className={styles.background}>
                <div className={styles.previewMovieGeneral}>
                  <div className={styles.previewMovieTitle}>
                    <div>{title}</div>
                    <span>{title}</span>
                  </div>

                  <div className={styles.previewMovieOptions}>
                    <a className={styles.previewMovieWatch}>
                      <div className={styles.previewMovieWhatchButton}>
                        <BsPlayFill />
                        <span>Assistir</span>
                      </div>
                    </a>

                    <button className={styles.previewMovieAddList}>
                      <BsPlus />
                      <span>Adicionar à Minha lista</span>
                    </button>

                    <button className={styles.previewMovieLike}>
                      <BiLike />
                      <span>Gostei</span>
                    </button>

                    <button className={styles.previewMovieDislike}>
                      <BiDislike />
                      <span>Não é para mim</span>
                    </button>
                  </div>
                </div>

                <div className={styles.previewMovieClose}>
                  <button onClick={onClose}>
                    <CgClose />
                  </button>
                </div>

                <div className={styles.previewMovieSound}>
                  <button onClick={onHandleSound} role="sound-button">
                    <Show when={soundReleased}>
                      <SoundOn role="sound-on" />
                    </Show>

                    <Hide when={soundReleased}>
                      <SoundOff role="sound-off" />
                    </Hide>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.previewMovieBody}>
            <div className={styles.previewMovieBodyContent}>
              <div className={styles.previewMovieBodyDetails}>
                <div className={styles.previewMovieBodyDetailsLeft}>
                  <div>
                    <div className={styles.tagsRelevance}>
                      {(vote_average * 10).toFixed(2)}% relevante
                    </div>

                    <Show when={!!date}>
                      <div className={styles.tagsYear}>
                        {getFullYear(date!)}
                      </div>
                    </Show>

                    <MaturityLevel ratings={contentRatings} />
                    <div className={styles.tagsDuration}>{duration}</div>
                  </div>

                  <Show when={!!overview}>
                    <div className={styles.overview}>
                      <input type="checkbox" id="show-less" name="show-less" />
                      <label htmlFor="show-less" />

                      <p ref={overviewEl}>{overview}</p>
                    </div>
                  </Show>

                  <Hide when={!!overview}>
                    <p>{title} não possui uma sinopse.</p>
                  </Hide>
                </div>

                <div className={styles.previewMovieBodyDetailsRight}>
                  <ProductionCompanies companies={production_companies} />
                  <Genres list={genres} />
                  <Status status={status} />
                </div>
              </div>

              <Show when={!!season}>
                {() => (
                  <Season
                    id={id}
                    episodes={season.episodes}
                    numberOfSeasons={number_of_seasons}
                  />
                )}
              </Show>

              <Show when={!!collection}>
                {() => (
                  <Recommend
                    id={id}
                    label={collection!.name}
                    list={collection!.parts}
                  />
                )}
              </Show>

              <Show when={!!recommends}>
                {() => (
                  <Recommend
                    id={id}
                    list={recommends}
                    label="Títulos Semelhantes"
                    showNoResults={true}
                    title={title}
                  />
                )}
              </Show>

              <About
                crew={crew}
                cast={cast}
                title={title}
                genres={genres}
                contentRatings={contentRatings}
                companies={production_companies}
              />
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
