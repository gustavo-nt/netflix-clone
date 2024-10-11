import { useState } from "react";
import { usePreview } from "../../../../../../../context/PreviewContext";

import { RecommendProps } from "../../../types";

export const useCard = () => {
  const { onUpdatePreview } = usePreview();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onHandlePreview = (item: RecommendProps.HandlePreview) => {
    onUpdatePreview({
      id: item.id,
      title: item.title,
      media_type: item.media_type,
    });
  };

  const onHideLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    onHideLoading,
    onHandlePreview,
  };
};
