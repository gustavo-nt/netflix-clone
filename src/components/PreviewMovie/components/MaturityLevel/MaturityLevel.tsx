import { useEffect, useState } from "react";

import { Show } from "../../../../directives/Show";
import { Hide } from "../../../../directives/Hide";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "../../types";

const maturity = {
  10: "child",
  12: "preteen",
  14: "teenager",
  16: "preadult",
  18: "adult",
} as {
  [key: number]: string;
};

export const MaturityLevel = ({ ratings }: PreviewMovieProps.MaturityLevel) => {
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

  return (
    <>
      <Show when={!!contentRatings}>
        <div className={`${styles.maturity} ${styles[maturityLevel]}`}>
          <strong>{contentRatings}</strong>
        </div>
      </Show>

      <Hide when={!!contentRatings}>
        <div className={`${styles.maturity} ${styles.undefined}`}>
          <strong>?</strong>
        </div>
      </Hide>
    </>
  );
};
