import api from "../services/api";

type GetResultsParamsProps = {
  with_networks?: string;
  with_genres?: string;
};

export const getQueryResults = async (
  endpoint: string,
  params?: GetResultsParamsProps,
) => {
  const { data } = await api.get(endpoint, {
    params: {
      ...params,
    },
  });

  return data.results;
};
