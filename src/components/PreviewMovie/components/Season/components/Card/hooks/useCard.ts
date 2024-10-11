import { useState } from "react";

export const useCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onHideLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    onHideLoading,
  };
};
