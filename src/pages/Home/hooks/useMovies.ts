import { useCallback, useEffect, useState } from "react";
import { disableBodyScroll } from "body-scroll-lock";

import { getHomeList } from "../utils/getHomeList";
import { getFeaturedDetails } from "../utils/getFeaturedDetails";

import { HomeProps } from "../types";
import { PreviewMovieProps } from "../../../components/PreviewMovie/types";

type UseMoviesProps = {
  previewMovie: PreviewMovieProps.Default | null;
};

export const useMovies = ({ previewMovie }: UseMoviesProps) => {
  const [movieList, setMovieList] = useState<HomeProps.MovieList[]>([]);

  const [featuredData, setFeatureData] =
    useState<HomeProps.FeaturedMovie | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isEntryLoading, setIsEntryLoading] = useState(false);

  const onLoadAll = useCallback(async () => {
    const list = await getHomeList();
    const originals = list.find((item) => item.slug === "originals")?.items;

    const randomIndex = Math.floor(Math.random() * originals?.length);
    const chosen = originals?.[randomIndex];

    const { data } = await getFeaturedDetails(chosen?.id ?? "", "tv");

    setMovieList(list);
    setFeatureData(data);

    setIsLoading(false);
    setIsEntryLoading(true);

    setTimeout(() => {
      setIsEntryLoading(false);
    }, 4000);
  }, []);

  const onViewScroll = useCallback(() => {
    previewMovie && disableBodyScroll(document.querySelector("body")!);
  }, [previewMovie]);

  useEffect(() => {
    onLoadAll();
  }, [onLoadAll]);

  useEffect(() => {
    onViewScroll();
  }, [onViewScroll]);

  return {
    isLoading,
    isEntryLoading,
    featuredData,
    movieList,
  };
};
