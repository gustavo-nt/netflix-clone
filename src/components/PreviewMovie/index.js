import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { BsPlayFill, BsPlus } from 'react-icons/bs';
import { BiDislike, BiLike } from 'react-icons/bi';
import { CgClose, CgChevronDoubleRight } from "react-icons/cg";
import Player from '../../../public/player.svg';
import SoundOn from '../../../public/sound-on.svg';
import SoundOff from '../../../public/sound-off.svg';
import BackError from '../../../public/error-back.png';
import { formatTime, formatGenres, formatComanies, formatFullYear, formatStatus } from '../../utils/format';
import Loading from '../Loading';

export default ({item}) => {
    const [soundReleased, setsoundReleased] = useState(false);
    const [visibleModal, setVisibleModal] = useState(true);
    const [runtime, setRuntime] = useState('0h 00m');
    const [genres, setGenres] = useState([]);
    const [companies, setCompanies] = useState(false);
    const [loadedMain, setLoadedMain] = useState(false);
    const [loadedRest, setLoadedRest] = useState(false);

    useEffect(() => {
        if (item.runtime) {
            setRuntime(formatTime(item.runtime));
        }    

        if (item.genres) {
            setGenres(formatGenres(item.genres));        
        }

        if (item.production_companies) {
            setCompanies(formatComanies(item.production_companies));
        }
    }, []);

    const onClose = () => {
        document.querySelector('body').style.overflow = 'auto';
        setVisibleModal(false);
    }

    return (
        <>
            {visibleModal && 
                <div className={styles.previewMovie}>
                    <div className={styles.previewMovieModal}>
                        <div className={styles.previewMovieHeader}>
                            <div className={styles.previewMovieBackdrop}>
                                { 
                                    item.backdrop_path != null ? (
                                        <>
                                            {loadedMain ? null : ( 
                                                <div className={styles.onLoad}>
                                                    <Loading 
                                                        style={{
                                                            top: '33%'
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <img
                                                style={loadedMain ? {} : { display: 'none' }}
                                                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} 
                                                alt={item.original_title ? item.original_title : item.original_name}
                                                onLoad={() => setLoadedMain(true)}
                                            />
                                        </>
                                    ) : (
                                        <img src={BackError} alt={item.original_title ? item.original_title : item.original_name}/>
                                    )
                                }
                                <div>
                                    <div className={styles.previewMovieGeneral}>
                                        <div className={styles.previewMovieTitle}>
                                            { 
                                                item.original_title != null ? (
                                                    <>
                                                        {item.original_title}
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.original_name}
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div className={styles.previewMovieOptions}>
                                            <a href={`/watch/${item.id}`} className={styles.previewMovieWatch}>
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
                                        <button onClick={() => {
                                            setsoundReleased(!soundReleased);
                                        }}>
                                            {soundReleased ? (
                                                <SoundOn />
                                            ): (
                                                <SoundOff />
                                            )}
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
                                            <div className={styles.tagsRelevance}>{item.vote_average * 10}% relevante</div>
                                            <div className={styles.tagsYear}>
                                                { 
                                                    item.release_date ? (
                                                        <>
                                                            {formatFullYear(item.release_date)}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {formatFullYear(item.first_air_date)}
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <CgChevronDoubleRight />
                                            <div className={styles.tagsDuration}>
                                                { 
                                                    item.runtime ? (
                                                        <>
                                                            {runtime}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <p>
                                            { 
                                                item.overview === '' ? (
                                                    <>
                                                        {item.original_title ? item.original_title : item.original_name} não possui uma descrição. 
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.overview}
                                                    </>
                                                )
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.previewMovieBodyDetailsRight}>
                                        <div className={styles.tagsCompanies}>
                                            <span>Produtoras: </span>
                                            <span>
                                                { 
                                                    companies === '' ? (
                                                        <>
                                                            Ops, não foi possível encontrar as produtoras desse título. 
                                                        </>
                                                    ) : (
                                                        <>
                                                            {companies}
                                                        </>
                                                    )
                                                }
                                            </span>
                                        </div>
                                        <div className={styles.tagsGenres}>
                                            <span>Gêneros: </span>
                                            <span>
                                                {genres.join(', ')}
                                            </span>
                                        </div>
                                        <div className={styles.tagsStatus}>
                                            <span>Status: </span>
                                            <span>
                                                {formatStatus(item.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.previewMovieTrack}>
                                    <p>Títulos Semelhantes</p>
                                    <div className={styles.previewMovieTrackContent}>
                                        <div>
                                            {item.similar_titles.results.map((value, key) => (
                                                <div className={styles.previewMovieTrackCard} key={key}>
                                                    <div className={styles.previewMovieTrackMain}>
                                                        <div className={styles.previewMovieTrackImage}>
                                                            { 
                                                                value.backdrop_path != null ? (
                                                                    <>
                                                                        {loadedRest ? null : (
                                                                            <div
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: '160px'
                                                                                }}
                                                                            >
                                                                                <Loading 
                                                                                    style={{
                                                                                        top: '33%'
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <img
                                                                            style={loadedRest ? {} : { display: 'none' }}
                                                                            src={`https://image.tmdb.org/t/p/original${value.backdrop_path}`} 
                                                                            alt={value.original_title ? value.original_title : value.original_name}
                                                                            onLoad={() => setLoadedRest(true)}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <img src={BackError} alt={value.original_title ? value.original_title : value.original_name}/>
                                                                )
                                                            }
                                                        </div>
                                                        <div className={styles.previewMovieTrackPlayer}>
                                                            <Player />
                                                            {/* Oi */}
                                                        </div>
                                                        <span>{formatFullYear(value.release_date)}</span>
                                                    </div>
                                                    <div className={styles.previewMovieTrackDetails}>
                                                        <div className={styles.previewMovieTrackHeader}>
                                                            <div>
                                                                <div className={styles.tagsRelevance}>{value.vote_average * 10}% relevante</div>
                                                                <div className={styles.tagsTitle}>{value.original_title.substring(0, 15) + '...'}</div>
                                                            </div>
                                                            <button className={styles.previewMovieAddList}>
                                                                <BsPlus />
                                                                <span>Adicionar à Minha lista</span>
                                                            </button>
                                                        </div>
                                                        <div className={styles.previewMovieTrackDetailsBody}>
                                                            <p>
                                                                { 
                                                                    value.overview === '' ? (
                                                                        <>
                                                                            Ops...O título em questão, não possui uma descrição. 
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {value.overview}
                                                                        </>
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}