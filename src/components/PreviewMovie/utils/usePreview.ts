import { enableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef, useState } from "react";

type UsePreviewProps = {
  openedSearch?: boolean;
};

type UsePreviewReturn = {
  visibleModal: boolean;
  soundReleased: boolean;
  overviewEl: React.RefObject<HTMLParagraphElement>;
  onHandleSound: () => void;
  onClose: () => void;
};

export const usePreview = ({
  openedSearch,
}: UsePreviewProps): UsePreviewReturn => {
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
    if (
      overviewEl?.current &&
      overviewEl?.current.offsetHeight < overviewEl?.current.scrollHeight
    ) {
      (overviewEl.current.parentNode as Element).setAttribute(
        "data-overflow",
        "true",
      );
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
