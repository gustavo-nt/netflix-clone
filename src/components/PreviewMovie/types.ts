export namespace PreviewMovieProps {
  export type Cast = {
    name: string;
  };

  export type Crew = {
    job: string;
    name: string;
  };

  export type Companies = {
    name: string;
  };

  export type Episode = {
    id: number;
    name: string;
    runtime?: number;
    air_date: string;
    overview: string;
    still_path: string;
    vote_average: number;
    episode_number: number;
  };

  export type Movie = {
    id: number;
    date: string;
    title: string;
    media_type?: string;
    vote_average: number;
    overview: string | null;
    backdrop_path: string | null;
  };

  export type Genres = {
    list: {
      id: number;
      name: string;
    }[];
  };

  export type About = {
    crew: Crew[];
    cast: Cast[];
    title?: string;
    genres: Genres["list"];
    contentRatings: string;
    companies: Companies[];
  };

  export type Collection = {
    id: number;
    name: string;
    parts: Movie[];
  };

  export type MaturityLevel = {
    ratings: string;
  };

  export type Media = {
    title?: string;
    soundReleased: boolean;
    videoId?: string | null;
    backdropPath: string | null;
  };

  export type ProductionCompanies = {
    companies: Companies[];
  };

  export type Recommend = {
    id: number;
    label: string;
    list: Movie[];
    title?: string;
    showNoResults?: boolean;
  };

  export type Season = {
    id: number;
    episodes: Episode[];
    numberOfSeasons?: number;
  };

  export type Status = {
    status: string;
  };

  export type Default = {
    id: number;
    cast: Cast[];
    crew: Crew[];
    date?: string;
    season: Season;
    status: string;
    title?: string;
    duration: string;
    recommends: Movie[];
    vote_average: number;
    openedSearch?: boolean;
    genres: Genres["list"];
    contentRatings: string;
    collection?: Collection;
    overview: string | null;
    videoId?: string | null;
    number_of_seasons?: number;
    backdrop_path: string | null;
    production_companies: Companies[];
  };
}
