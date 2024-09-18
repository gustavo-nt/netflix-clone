import { isPast } from "date-fns";
import { getQueryResults } from "./getQueryResults";

import api from "../services/api";

import {
  RecommendProps,
  getSerializeDetails,
  getSerializeRecommend,
} from "./getSerializeData";

interface VideosProps {
  type: string;
}

interface ContentRatingsProps {
  iso_3166_1: string;
}

interface RecomendSerializeProps {
  id: number;
  date: string;
  overview: string | null;
  backdrop_path: string | null;
  vote_average: number;
  title: string;
}

export const getDetails = async (type: string, id: number) => {
  if (type === "movie") {
    const { data: details } = await api.get(`movie/${id}`);
    const videos = await getQueryResults(`movie/${id}/videos`);

    const recommendations = await getQueryResults(
      `movie/${id}/recommendations`,
    );

    const collection =
      details.belongs_to_collection?.id &&
      (await api.get(`collection/${details.belongs_to_collection.id}`));

    const contentRatings = await getQueryResults(`movie/${id}/release_dates`);

    const contentRatingsBR = contentRatings
      .find((item: ContentRatingsProps) => item.iso_3166_1 === "BR")
      ?.release_dates.at(-1).certification;

    const contentRatingsUS = contentRatings
      .find((item: ContentRatingsProps) => item.iso_3166_1 === "US")
      ?.release_dates.at(-1).certification;

    const {
      data: { cast, crew },
    } = await api.get(`movie/${id}/credits`);

    return {
      ...getSerializeDetails(details),
      recommends: recommendations.map((recommedation: RecommendProps) =>
        getSerializeRecommend(recommedation),
      ),
      collection: collection?.data.parts.length && {
        id: collection?.data.id,
        name: collection?.data.name,
        parts: collection?.data.parts
          .reduce(function (
            res: RecomendSerializeProps[],
            option: RecommendProps,
          ) {
            const data = getSerializeRecommend(option);

            if (data.date && isPast(new Date(data.date))) {
              res.push(data);
            }

            return res;
          },
          [])
          .sort(
            (prev: RecomendSerializeProps, next: RecomendSerializeProps) =>
              Number(new Date(prev.date)) - Number(new Date(next.date)),
          ),
      },
      videoId: videos.length
        ? videos.find(
            (item: VideosProps) =>
              item.type === "Trailer" || item.type === "Teaser",
          ).key
        : null,
      contentRatings: contentRatingsBR?.length
        ? contentRatingsBR
        : contentRatingsUS,
      crew: crew.filter(
        ({ job }: { job: string }) => job === "Writer" || job === "Director",
      ),
      cast: cast.slice(0, 8),
    };
  }

  const { data: details } = await api.get(`tv/${id}`);
  const { data: season } = await api.get(`tv/${id}/season/1`);

  const videos = await getQueryResults(`tv/${id}/videos`);

  const recommendations = await getQueryResults(`tv/${id}/recommendations`);
  const contentRatings = await getQueryResults(`tv/${id}/content_ratings`);

  const contentRatingsBR = contentRatings.find(
    (item: ContentRatingsProps) => item.iso_3166_1 === "BR",
  )?.rating;

  const contentRatingsUS = contentRatings.find(
    (item: ContentRatingsProps) => item.iso_3166_1 === "US",
  )?.rating;

  const {
    data: { cast, crew },
  } = await api.get(`tv/${id}/credits`);

  return {
    ...getSerializeDetails(details),
    recommends: recommendations.map((recommedation: RecommendProps) =>
      getSerializeRecommend(recommedation),
    ),
    videoId: videos.length
      ? videos.find(
          (item: VideosProps) =>
            item.type === "Trailer" || item.type === "Teaser",
        )?.key
      : null,
    contentRatings: contentRatingsBR?.length
      ? contentRatingsBR
      : contentRatingsUS,
    season: {
      id: season.id,
      episodes: season.episodes,
      numberOfSeasons: season.number_of_seasons,
    },
    crew: crew.filter(({ job }: { job: string }) => job === "Producer"),
    cast: cast.slice(0, 8),
  };
};
