import { HTMLAttributes } from "react";

export namespace CircularProgressProps {
  export type Default = HTMLAttributes<HTMLElement> & {
    fullScreen?: boolean;
  };
}
