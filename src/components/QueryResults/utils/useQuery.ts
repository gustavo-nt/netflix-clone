import { useCallback, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

type UsePreviewProps = {
  inView?: boolean;
  openSearchBox?: boolean;
  fetchNextPage: () => void;
};

export const useQuery = ({
  inView,
  openSearchBox,
  fetchNextPage,
}: UsePreviewProps) => {
  const inViewScroll = useCallback(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const onViewScroll = useCallback(() => {
    !openSearchBox
      ? enableBodyScroll(document.querySelector("body")!)
      : disableBodyScroll(document.querySelector("body")!);
  }, [openSearchBox]);

  useEffect(() => {
    inViewScroll();
  }, [inViewScroll]);

  useEffect(() => {
    onViewScroll();
  }, [onViewScroll]);
};
