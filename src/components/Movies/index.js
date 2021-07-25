import React, { useState } from 'react';
import { titleSimilar, typeRequest } from '../../utils/request';
import Loading from '../Loading';
import MovieRow from '../MovieRow';
import PreviewMovie from '../PreviewMovie';
import styles from './styles.module.scss';

export default ({ items }) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleLoading, setVisibleLoading] = useState(false);
    const [previewMovie, setPreviewMovie] = useState({});

    const changePreview = async (item) => {
        const similarMovies = {};

        setVisibleModal(false);
        setVisibleLoading(true);

        similarMovies.similar_titles = await titleSimilar(item);
        document.querySelector('body').style.overflow = 'hidden';

        if (item.media_type) {
            switch (item.media_type) {
                case 'movie':
                    setPreviewMovie(Object.assign(similarMovies, await typeRequest('movie', item.id)));
                    break;
                default:
                    setPreviewMovie(Object.assign(similarMovies, await typeRequest('season', item.id)));
            }
        } else {
            const json = await typeRequest('movie', item.id);

            switch (item.original_title ? item.original_title : item.original_name) {
                case json.original_title:
                    setPreviewMovie(Object.assign(similarMovies, json));
                    break;
                default:
                    setPreviewMovie(Object.assign(similarMovies, await typeRequest('season', item.id)));
            }
        }

        setVisibleLoading(false);
        setVisibleModal(true);
    }

    return (
        <>
            {items.map((item, key) => (
                <MovieRow key={key} title={item.title} items={item.items} onPreview={changePreview} />
            ))}

            {visibleModal && 
                <PreviewMovie item={previewMovie}/>
            }

            {visibleLoading && 
                <div className={styles.loadingPreview}>
                    <Loading />    
                </div>
            }
        </>
    )
}