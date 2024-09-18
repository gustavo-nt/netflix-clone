import { PreviewMovieProps } from "../../types";

export namespace SeasonProps {
  export type Card = {
    role?: string;
    item: PreviewMovieProps.Episode;
  };
}
