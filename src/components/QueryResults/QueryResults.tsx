import { useInView } from "react-intersection-observer";
import { useEffect, Fragment, useCallback } from "react";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

import { Card } from "../Card";
import { Show } from "../../directives/Show";
import { useSearch } from "../../context/SearchContext";

import styles from "./styles.module.scss";
import { QueryResultsProps } from "./types";

export const QueryResults = ({ onOpenDetails }: QueryResultsProps.Default) => {
  const { ref, inView } = useInView();
  const { data, openSearchBox, fetchNextPage, query } = useSearch();

  const inViewScroll = useCallback(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const onViewScroll = useCallback(() => {
    !openSearchBox
      ? enableBodyScroll(document.querySelector("body")!)
      : disableBodyScroll(document.querySelector("body")!);
  }, [openSearchBox]);

  useEffect(() => {
    inViewScroll();
  }, [inViewScroll]);

  useEffect(() => {
    onViewScroll();
  }, [onViewScroll]);

  return (
    <Show when={!!data?.pages.length}>
      <div className={styles.queryResults}>
        <p>
          Resultados encontrados para: <span>{query}</span>
        </p>

        <div className={styles.content} role="list">
          {data?.pages.map((page) => (
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
    </Show>
  );
};
