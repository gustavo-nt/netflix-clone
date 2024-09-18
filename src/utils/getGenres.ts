type GenresProps = {
  id: number;
  name: string;
};

export const getGenres = (genres: GenresProps[]) => {
  return genres.map((genre) => genre.name).join(", ");
};
