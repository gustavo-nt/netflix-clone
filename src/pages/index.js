import { React, useEffect, useState } from 'react';
import Tmdb from '../database/Tmdb';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';
import StartNetflix from '../components/StartNetflix';
import Loading from '../components/Loading';
import Movies from '../components/Movies';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [startNetflix, setStartNetflix] = useState(false);
  const [releasedMovies, setReleasedMovies] = useState(false);
 
  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(value => value.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);

      // Set Loader Start Netflix
      if(list.length > 0) {
        setStartNetflix(true);
    
        setTimeout(function() {
          setStartNetflix(false); 
          setReleasedMovies(true); 
        }, 4000);
      }
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      <Head>
        <title>Netflix Brasil - assistir a séries online, assistir a filmes online</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {releasedMovies &&
        <>
          <Header black={blackHeader}/>

          {featuredData &&
            <FeaturedMovie item={featuredData}/>
          }

          <section className="lists">
            <Movies items={movieList}/>
          </section>

          <Footer />
        </>
      }

      {startNetflix && 
        <div className="loading"> 
          <StartNetflix />
        </div> 
      }    

      {movieList.length <= 0 && 
        <div className="loading">
          <Loading />
        </div>
      }
    </div>
  )
}
