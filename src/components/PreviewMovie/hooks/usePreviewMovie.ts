import { enableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef, useState } from "react";

type UsePreviewProps = {
  openedSearch?: boolean;
};

export const usePreviewMovie = ({ openedSearch }: UsePreviewProps) => {
  const overviewEl = useRef<HTMLParagraphElement>(null);

  const [visibleModal, setVisibleModal] = useState<boolean>(true);
  const [soundReleased, setSoundReleased] = useState<boolean>(false);

  const onClose = () => {
    setVisibleModal(false);
    !openedSearch && enableBodyScroll(document.querySelector("body")!);
  };

  const onHandleSound = () => {
    setSoundReleased((prevState) => !prevState);
  };

  useEffect(() => {
    const element = overviewEl?.current;

    if (element) {
      const { offsetHeight, scrollHeight } = element;

      if (offsetHeight < scrollHeight) {
        (element.parentNode as Element).setAttribute("data-overflow", "true");
      }
    }
  }, []);

  return {
    overviewEl,
    visibleModal,
    soundReleased,
    onHandleSound,
    onClose,
  };
};
