import { createContext, useContext, useReducer, Dispatch } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";

import { searchReducer } from "../reducers/search/reducer";
import { setQuerySearch } from "../reducers/search/actions";

import api from "../services/api";

type DataSearch = {
  pages: {
    page: number;
    results: {
      id: number;
      title: string;
      media_type: string;
      poster_path: string;
    }[];
  }[];
  pageParams: unknown[];
};

type SearchContextData = {
  query: string;
  data?: DataSearch;
  openSearchBox: boolean;
  dispatch: Dispatch<any>;
  fetchNextPage: () => void;
  debounceOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type PreviewProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

const SearchProvider = ({ children }: PreviewProviderProps) => {
  const [searchState, dispatch] = useReducer(searchReducer, {
    query: "",
    openSearchBox: false,
  });

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["seasonData", searchState.query],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(
        `search/multi?query=${searchState.query}&page=${pageParam}`,
      );

      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages > lastPage.page) {
        return lastPage.page + 1;
      }
    },
    enabled: !!searchState.query.length,
  });

  const debounceOnChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuerySearch(e?.target?.value));
    },
    500,
  );

  return (
    <SearchContext.Provider
      value={{
        data,
        debounceOnChange,
        query: searchState.query,
        openSearchBox: searchState.openSearchBox,
        fetchNextPage,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

function useSearch(): SearchContextData {
  const context = useContext(SearchContext);
  return context;
}

export { SearchProvider, useSearch };
