import { useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../../../../../services/api";
import { PreviewMovieProps } from "../../../types";

type UseSeasonProps = {
  episodes: PreviewMovieProps.Episode[];
  id: number;
};

export const useSeason = ({ episodes, id }: UseSeasonProps) => {
  const [numberSeason, setNumberSeason] = useState<number>(0);

  const [episodesSeason, setEpisodesSeason] =
    useState<PreviewMovieProps.Episode[]>(episodes);

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["seasonData", numberSeason, id],
    queryFn: async () => {
      const { data } = await api.get(`tv/${id}/season/${numberSeason}`);
      return data;
    },
    enabled: !!numberSeason,
  });

  const handleSeason = (numberSeason: number) => {
    setNumberSeason(numberSeason);
  };

  useLayoutEffect(() => {
    if (data) {
      setEpisodesSeason(data.episodes);
    }
  }, [data]);

  return {
    isSuccess,
    isLoading,
    handleSeason,
    numberSeason,
    episodesSeason,
  };
};
