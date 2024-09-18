import { createContext, useState, useContext } from "react";

import { PreviewMovieProps } from "../components/PreviewMovie/types";
import { getDetails } from "../utils/getDetails";

type UpdatePreviewProps = {
  id: number;
  media_type?: string;
  title?: string;
};

type PreviewContextData = {
  isLoading: boolean;
  previewMovie: PreviewMovieProps.Default | null;
  onUpdatePreview(item: UpdatePreviewProps): Promise<void>;
};

type PreviewProviderProps = {
  children: React.ReactNode;
};

const PreviewContext = createContext<PreviewContextData>(
  {} as PreviewContextData,
);

const PreviewProvider = ({ children }: PreviewProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [previewMovie, setPreviewMovie] =
    useState<PreviewMovieProps.Default | null>(null);

  const onUpdatePreview = async ({
    id,
    media_type,
    title,
  }: UpdatePreviewProps) => {
    setIsLoading(true);
    setPreviewMovie(null);

    const type = media_type || (title ? "movie" : "tv");
    const data = await getDetails(type, id);

    setPreviewMovie(data);
    setIsLoading(false);
  };

  return (
    <PreviewContext.Provider
      value={{
        isLoading,
        previewMovie,
        onUpdatePreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

function usePreview(): PreviewContextData {
  const context = useContext(PreviewContext);
  return context;
}

export { PreviewProvider, usePreview };
