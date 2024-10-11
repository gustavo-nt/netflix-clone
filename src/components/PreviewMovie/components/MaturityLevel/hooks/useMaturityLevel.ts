import { useEffect, useState } from "react";
import { PreviewMovieProps } from "../../../types";

const maturity = {
  10: "child",
  12: "preteen",
  14: "teenager",
  16: "preadult",
  18: "adult",
} as {
  [key: number]: string;
};

export const useMaturityLevel = ({
  ratings,
}: PreviewMovieProps.MaturityLevel) => {
  const [maturityLevel, setMaturityLevel] = useState<string>("");
  const [contentRatings, setContentRatings] = useState<string>(ratings);

  useEffect(() => {
    if (ratings) {
      if (!isNaN(Number(ratings))) {
        const closest = Object.keys(maturity).reduce(
          (prev: string, curr: string) => {
            return Math.abs(Number(curr) - Number(ratings)) <
              Math.abs(Number(prev) - Number(ratings))
              ? curr
              : prev;
          },
        );

        setMaturityLevel(maturity[Number(closest)]);
        setContentRatings(closest);

        return;
      }

      setMaturityLevel(maturity[18]);
      setContentRatings(ratings);
    }
  }, [ratings]);

  return {
    maturityLevel,
    contentRatings,
  };
};
