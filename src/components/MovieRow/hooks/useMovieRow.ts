import { useState } from "react";
import { MovieRowProps } from "../types";

export const useMovieRow = ({
  items,
}: Omit<MovieRowProps.Default, "title" | "onOpenDetails">) => {
  const [scrollX, setScrollX] = useState<number>(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);

    if (x > 0) {
      x = 0;
    }

    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = items.length * 200;

    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }

    setScrollX(x);
  };

  return {
    scrollX,
    handleLeftArrow,
    handleRightArrow,
  };
};
