import { Show } from "../../../../directives/Show";
import { Hide } from "../../../../directives/Hide";

import { useMaturityLevel } from "./hooks/useMaturityLevel";

import styles from "./styles.module.scss";
import { PreviewMovieProps } from "../../types";

export const MaturityLevel = ({ ratings }: PreviewMovieProps.MaturityLevel) => {
  const { maturityLevel, contentRatings } = useMaturityLevel({ ratings });

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
