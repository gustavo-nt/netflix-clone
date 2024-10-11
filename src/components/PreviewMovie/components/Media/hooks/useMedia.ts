import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export const useMedia = ({ soundReleased }: { soundReleased: boolean }) => {
  const [isVisibleVideo, setIsVisibleVideo] = useState<boolean>(false);
  const [loadedMain, setLoadedMain] = useState<boolean>(false);

  const soundElement = useRef<YouTube | null>(null);

  useEffect(() => {
    if (isVisibleVideo && soundElement.current) {
      !soundReleased
        ? soundElement.current.getInternalPlayer().mute()
        : soundElement.current.getInternalPlayer().unMute();
    }
  }, [isVisibleVideo, soundReleased]);

  const onPlayerReady: YouTubeProps["onReady"] = () => {
    setIsVisibleVideo(true);
  };

  const onPlayerEnd: YouTubeProps["onEnd"] = (event) => {
    setIsVisibleVideo(false);
    event.target.destroy();
  };

  const onPlayerError: YouTubeProps["onError"] = () => {
    setIsVisibleVideo(false);
  };

  const onHideLoading = () => {
    setLoadedMain(true);
  };

  return {
    onPlayerEnd,
    onPlayerReady,
    onPlayerError,
    isVisibleVideo,
    onHideLoading,
    soundElement,
    loadedMain,
  };
};
