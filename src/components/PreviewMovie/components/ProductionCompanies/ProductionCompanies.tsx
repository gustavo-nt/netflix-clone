import { Hide } from "../../../../directives/Hide";
import { Show } from "../../../../directives/Show";

import { getCompanies } from "../../../../utils/getCompanies";
import { PreviewMovieProps } from "../../types";

export const ProductionCompanies = ({
  companies,
}: PreviewMovieProps.ProductionCompanies) => {
  return (
    <div>
      <span>Produtoras: </span>
      <span>
        <Show when={companies.length > 0}>{getCompanies(companies)}</Show>

        <Hide when={companies.length > 0}>
          Ops, não foi possível encontrar as produtoras desse título.
        </Hide>
      </span>
    </div>
  );
};
