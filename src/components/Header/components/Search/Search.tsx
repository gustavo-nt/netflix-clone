import { useSearch } from "../../../../context/SearchContext";

import { Show } from "../../../../directives/Show";
import { Hide } from "../../../../directives/Hide";

import { BsX } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";

import {
  setClearSearch,
  setToggleSearch,
} from "../../../../reducers/search/actions";

import styles from "./styles.module.scss";

export const Search = () => {
  const { debounceOnChange, dispatch, openSearchBox } = useSearch();

  return (
    <>
      <Show when={openSearchBox}>
        <div className={styles.searchInput}>
          <CgSearch size={24} className={styles.searchIcon} />

          <label>Buscar</label>
          <input
            type="text"
            onChange={debounceOnChange}
            placeholder="Títulos, gente e gêneros"
          />

          <BsX
            size={28}
            role="icon-close"
            className={styles.closeIcon}
            onClick={() => dispatch(setClearSearch())}
          />
        </div>
      </Show>

      <Hide when={openSearchBox}>
        <CgSearch
          onClick={() => dispatch(setToggleSearch(true))}
          role="icon-search"
        />
      </Hide>
    </>
  );
};
