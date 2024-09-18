import { getTime } from "./getTime";

type GenresProps = {
  id: number;
  name: string;
};

type CompaniesProps = {
  id: number;
  logo_path: string;
  origin_country: string;
  name: string;
};

type DetailsProps = {
  id: number;
  title: string;
  runtime: number;
  backdrop_path: string;
  genres: GenresProps[];
  first_air_date: string;
  number_of_seasons: number;
  production_companies: CompaniesProps[];
  release_date: string;
  vote_average: number;
  overview: string;
  status: string;
  name: string;
};

export type RecommendProps = Omit<
  DetailsProps,
  "runtime" | "genres" | "number_of_seasons" | "production_companies" | "status"
>;

export const getSerializeDetails = (details: DetailsProps) => {
  const { runtime, number_of_seasons } = details;

  const auxDetails: any = {
    duration: runtime
      ? getTime(runtime)
      : number_of_seasons === 1
      ? `${number_of_seasons} temporada`
      : `${number_of_seasons} temporadas`,
    number_of_seasons,
  };

  return {
    ...auxDetails,
    id: details.id,
    genres: details.genres,
    status: details.status,
    overview: details.overview ?? null,
    vote_average: details.vote_average,
    title: details.title ?? details.name,
    backdrop_path: details.backdrop_path ?? null,
    production_companies: details.production_companies,
    date: details.release_date ? details.release_date : details.first_air_date,
  };
};

export const getSerializeRecommend = (info: RecommendProps) => {
  const {
    id,
    name,
    title,
    overview,
    vote_average,
    release_date,
    backdrop_path,
    first_air_date,
  } = info;

  const media_type = title ? "movie" : "tv";
  const date = release_date ?? first_air_date;

  return {
    id,
    vote_average,
    title: title ?? name,
    backdrop_path: backdrop_path ?? null,
    overview: overview ?? null,
    media_type,
    date,
  };
};
