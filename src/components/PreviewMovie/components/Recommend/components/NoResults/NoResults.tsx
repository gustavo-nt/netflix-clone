import { Show } from "../../../../../../directives/Show";
import BackError from "../../../../../../assets/error-back.png";

import styles from "./styles.module.scss";
import { RecommendProps } from "../../types";

export const NoResults = ({ title }: RecommendProps.NoResults) => {
  return (
    <div className={styles.noRecommend}>
      <img src={BackError} alt={title ?? "Sem título"} />

      <div>
        <strong>Ops...Infelizmente não encontramos títulos relacionados</strong>

        <Show when={!!title}>
          <span>para: {title}</span>
        </Show>
      </div>
    </div>
  );
};
