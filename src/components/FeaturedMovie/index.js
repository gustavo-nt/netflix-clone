import React from 'react';
import { BsPlayFill, BsPlus } from 'react-icons/bs';
import { formatFullYear, formatGenres } from '../../utils/format';
import styles from './styles.module.scss';

export default ({item}) => {
    return (
        <div>
            <section className={styles.featured} style= {{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            }}>
                <div className={styles.featuredVertical}>
                    <div className={styles.featuredHorizontal}>
                        <div className={styles.featuredName}>
                            {item.original_name}
                        </div>
                        <div className={styles.featuredInfo}>
                            <div className={styles.featuredPoints}>
                                {item.vote_average * 10}% relevante
                            </div>
                            <div className={styles.featuredYear}>
                                {formatFullYear(item.first_air_date)}
                            </div>
                            <div className={styles.featuredSeasons}>
                                {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                            </div>
                        </div>
                        <div className={styles.featuredDescription}>
                            {item.overview}
                        </div>
                        <div className={styles.featuredButtons}>
                            <a href={`/watch/${item.id}`} className={styles.featuredWatchButton}>
                                <div className={styles.featuredButton}>
                                    <BsPlayFill />
                                    <span>Assistir</span>
                                </div>
                            </a>
                            <a href={`/list/${item.id}`} className={styles.featuredMyListButton}>
                                <div className={styles.featuredButton}>
                                    <BsPlus />
                                    <span>Minha Lista</span>
                                </div>
                            </a>
                        </div>
                        <div className={styles.featuredGenres}>
                            <strong>Gêneros:</strong> {formatGenres(item.genres).join(', ')}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}