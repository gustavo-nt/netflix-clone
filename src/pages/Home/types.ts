export namespace HomeProps {
  type Genres = {
    id: number;
    name: string;
  };

  type Item = {
    id: number;
    name?: string;
    title?: string;
    overview: string;
    media_type?: string;
    poster_path: string;
  };

  export type MovieList = {
    slug: string;
    items: Item[];
    title: string;
  };

  export type FeaturedMovie = {
    id: number;
    genres: Genres[];
    backdrop_path: string;
    first_air_date: string;
    number_of_seasons: number;
    vote_average: number;
    overview: string;
    name?: string;
  };

  export type ListMovie = {
    list: {
      slug: string;
      items: Item[];
      title: string;
    }[];
  };
}
