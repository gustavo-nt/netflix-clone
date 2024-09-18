export namespace QueryResultsProps {
  type onOpenDetails = {
    id: number;
    media_type?: string;
    title?: string;
  };

  export type Default = {
    onOpenDetails: (data: onOpenDetails) => void;
  };
}
