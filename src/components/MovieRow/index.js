import React, { useState } from 'react';
import styles from '../MovieRow/styles.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0);

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
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className={styles.movieRow}>
            <h2>{title}</h2>
            <div className={styles.movieRowLeft} onClick={handleLeftArrow}>
                <FiChevronLeft style={{fontSize: 50}}/>
            </div>
            <div className={styles.movieRowRight} onClick={handleRightArrow}>
                <FiChevronRight style={{fontSize: 50}}/>
            </div>
            <div className={styles.movieRowListArea}>
                <div className={styles.movieRowList} style={{
                    marginLeft: scrollX,
                    width: items.results.length * 200
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className={styles.movieRowItem}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}