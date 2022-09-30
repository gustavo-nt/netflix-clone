import React, { useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlinePicture } from 'react-icons/ai';
import { HiChevronRight } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default ({ title, items, onPreview }) => {
    const [scrollX, setScrollX] = useState(0);
    const [bullets, setBullets] = useState(new Array(9).fill(''));

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 200;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className={styles.movieRow}>
            <div className={styles.movieRowHeader}>
                <div className={styles.movieRowTitle}>
                    <h2>{title}</h2>
                    <div className={styles.movieRowMore}>
                        <HiChevronRight />
                        <span>Ver tudo</span>
                    </div>
                </div>
                <div className={styles.movieRowBullets}>
                    <ul>
                        {bullets.map((item, index) => (
                            <li key={index}></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.movieRowLeft} onClick={handleLeftArrow}>
                <FiChevronLeft style={{ fontSize: 50 }} />
            </div>
            <div className={styles.movieRowRight} onClick={handleRightArrow}>
                <FiChevronRight style={{ fontSize: 50 }} />
            </div>
            <div className={styles.movieRowListArea}>
                <div className={styles.movieRowList} style={{
                    marginLeft: scrollX,
                    width: items.results.length * 200
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className={styles.movieRowItem} onClick={() => onPreview(item)}>
                            {
                                item.poster_path != null ? (
                                    <img loading="lazy" src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                                ) : (
                                    <div className={styles.movieRowItemError}>
                                        <div>
                                            <p>{item.original_title}</p>
                                            <AiOutlinePicture />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}