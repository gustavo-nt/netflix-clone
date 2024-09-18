import { BsPlayFill, BsPlus } from "react-icons/bs";

import { getFullYear } from "../../../../utils/getFullYear";
import { getGenres } from "../../../../utils/getGenres";

import styles from "./styles.module.scss";
import { HomeProps } from "../../types";

export const FeaturedMovie = ({
  id,
  name,
  vote_average,
  number_of_seasons,
  first_air_date,
  backdrop_path,
  overview,
  genres,
}: HomeProps.FeaturedMovie) => {
  return (
    <section
      className={styles.featured}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
      }}
    >
      <div className={styles.featuredVertical}>
        <div className={styles.featuredHorizontal}>
          <div className={styles.featuredName}>{name}</div>

          <div className={styles.featuredInfo}>
            <div className={styles.featuredPoints}>
              {(vote_average * 10).toFixed(2)}% relevante
            </div>

            <div className={styles.featuredYear}>
              {getFullYear(first_air_date)}
            </div>

            <div className={styles.featuredSeasons}>
              {number_of_seasons} temporada{number_of_seasons > 1 ? "s" : ""}
            </div>
          </div>

          <div className={styles.featuredDescription}>{overview}</div>

          <div className={styles.featuredButtons}>
            <a href={`/watch/${id}`} className={styles.featuredWatchButton}>
              <div className={styles.featuredButton}>
                <BsPlayFill />
                <span>Assistir</span>
              </div>
            </a>

            <a href={`/list/${id}`} className={styles.featuredMyListButton}>
              <div className={styles.featuredButton}>
                <BsPlus />
                <span>Minha Lista</span>
              </div>
            </a>
          </div>

          <div className={styles.featuredGenres}>
            <strong>Gêneros:</strong> {getGenres(genres)}
          </div>
        </div>
      </div>
    </section>
  );
};
