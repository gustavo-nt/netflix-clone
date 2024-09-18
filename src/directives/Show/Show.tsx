import { ShowProps } from "./types";

export const Show = ({ when, children }: ShowProps.Default) => {
  return when ? (
    <>{typeof children === "function" ? children() : children}</>
  ) : (
    <></>
  );
};
