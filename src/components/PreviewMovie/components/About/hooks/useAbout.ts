import { PreviewMovieProps } from "../../../types";

export const useAbout = ({ crew }: { crew: PreviewMovieProps.Crew[] }) => {
  const directors = crew.filter(
    ({ job }) => job === "Director" || job === "Producer",
  );

  const writers = crew.filter(({ job }) => job === "Writer");

  return {
    directors,
    writers,
  };
};
