export namespace QueryResultsProps {
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

  type onOpenDetails = {
    id: number;
    media_type?: string;
    title?: string;
  };

  export type SearchData = {
    query: string;
    data?: DataSearch;
    openSearchBox: boolean;
    fetchNextPage: () => void;
  };

  export type Default = {
    onOpenDetails: (data: onOpenDetails) => void;
  };
}
