import { DefaultLayout } from "../../layout/DefaultLayout";
import { Show } from "../../directives/Show";

import { PreviewMovie } from "../../components/PreviewMovie";
import { CircularProgress } from "../../components/Loading/CircularProgress";

import { ListMovies } from "./components/ListMovies";
import { QueryResults } from "../../components/QueryResults";

import { FeaturedMovie } from "./components/FeaturedMovie";
import { SkeletonNetflix } from "../../components/Loading/SkeletonNetflix";

import { usePreview } from "../../context/PreviewContext";
import { useSearch } from "../../context/SearchContext";
import { useMovies } from "./hooks/useMovies";

export const Home = () => {
  const {
    previewMovie,
    isLoading: previewIsLoading,
    onUpdatePreview,
  } = usePreview();

  const { openSearchBox } = useSearch();

  const { isEntryLoading, isLoading, featuredData, movieList } = useMovies({
    previewMovie,
  });

  return (
    <>
      <Show when={isEntryLoading}>
        <SkeletonNetflix />
      </Show>

      <Show when={!isLoading && !isEntryLoading}>
        <DefaultLayout>
          <Show when={!!featuredData}>
            <FeaturedMovie {...featuredData!} />
          </Show>

          <Show when={movieList.length > 0}>
            <ListMovies list={movieList} />
          </Show>

          <Show when={!!previewMovie}>
            <PreviewMovie {...previewMovie!} openedSearch={openSearchBox} />
          </Show>

          <QueryResults onOpenDetails={onUpdatePreview} />
        </DefaultLayout>
      </Show>

      <Show when={previewIsLoading || isLoading}>
        <CircularProgress fullScreen={true} />
      </Show>
    </>
  );
};
