import { useInView } from "react-intersection-observer";
import { Fragment } from "react";

import { Card } from "../Card";
import { Show } from "../../directives/Show";

import { useSearch } from "../../context/SearchContext";
import { useQuery } from "./hooks/useQuery";

import styles from "./styles.module.scss";
import { QueryResultsProps } from "./types";

export const QueryResults = ({ onOpenDetails }: QueryResultsProps.Default) => {
  const { ref, inView } = useInView();
  const { data, openSearchBox, fetchNextPage, query } = useSearch();

  useQuery({ inView, openSearchBox, fetchNextPage });

  return (
    <Show when={!!data?.pages.length}>
      {() => (
        <div className={styles.queryResults}>
          <p>
            Resultados encontrados para: <span>{query}</span>
          </p>

          <div className={styles.content} role="list">
            {data!.pages.map((page) => (
              <Fragment key={page.page}>
                {page.results.map((item) => (
                  <Card
                    key={item.id}
                    title={item.title}
                    onClick={() => onOpenDetails(item)}
                    poster_path={item.poster_path}
                  />
                ))}
              </Fragment>
            ))}
          </div>

          <div ref={ref} />
        </div>
      )}
    </Show>
  );
};
