import { HideProps } from "./types";

export const Hide = ({ when, children }: HideProps.Default) => {
  return when ? (
    <></>
  ) : (
    <>{typeof children === "function" ? children() : children}</>
  );
};
