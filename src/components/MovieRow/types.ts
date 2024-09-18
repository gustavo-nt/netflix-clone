export namespace MovieRowProps {
  type Item = {
    id: number;
    name?: string;
    title?: string;
    overview: string;
    media_type?: string;
    poster_path: string;
  };

  type onOpenDetails = {
    id: number;
    media_type?: string;
    title?: string;
  };

  export type Default = {
    title: string;
    onOpenDetails: (data: onOpenDetails) => void;
    items: Item[];
  };
}
