import { Hide } from "../../../directives/Hide";
import { Show } from "../../../directives/Show";

import styles from "./styles.module.scss";
import { CircularProgressProps } from "./types";

export const CircularProgress = ({
  fullScreen = false,
  ...rest
}: CircularProgressProps.Default) => {
  return (
    <>
      <Show when={fullScreen}>
        <div className={styles.container} {...rest}>
          <div className={styles.nfLoader} />
        </div>
      </Show>

      <Hide when={fullScreen}>
        <div className={styles.nfLoader} {...rest} />
      </Hide>
    </>
  );
};
