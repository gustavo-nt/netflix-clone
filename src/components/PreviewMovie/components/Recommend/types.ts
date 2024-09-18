import { PreviewMovieProps } from "../../types";

export namespace RecommendProps {
  export type Card = {
    idParent: number;
    item: PreviewMovieProps.Movie;
  };

  export type HandlePreview = {
    id: number;
    title?: string;
    media_type?: string;
  };

  export type NoResults = {
    title?: string;
  };
}
