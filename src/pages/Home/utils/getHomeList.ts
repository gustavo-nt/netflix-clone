import { getQueryResults } from "../../../utils/getQueryResults";

export const getHomeList = async () => {
  return [
    {
      slug: "originals",
      title: "Originais do Netflix",
      items: await getQueryResults("/discover/tv", {
        with_networks: "213",
      }),
    },
    {
      slug: "trending",
      title: "Recomendados para Você",
      items: await getQueryResults("/trending/all/week"),
    },
    {
      slug: "toprated",
      title: "Em Alta",
      items: await getQueryResults("/movie/top_rated"),
    },
    {
      slug: "action",
      title: "Ação",
      items: await getQueryResults("/discover/movie", {
        with_genres: "28",
      }),
    },
    {
      slug: "commedy",
      title: "Comédia",
      items: await getQueryResults("/discover/movie", {
        with_genres: "35",
      }),
    },
    {
      slug: "horror",
      title: "Terror",
      items: await getQueryResults("/discover/movie", {
        with_genres: "27",
      }),
    },
    {
      slug: "romance",
      title: "Romance",
      items: await getQueryResults("/discover/movie", {
        with_genres: "10749",
      }),
    },
    {
      slug: "documentary",
      title: "Documentários",
      items: await getQueryResults("/discover/movie", {
        with_genres: "99",
      }),
    },
  ];
};
