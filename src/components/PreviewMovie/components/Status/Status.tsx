import { getStatus } from "../../../../utils/getStatus";
import { PreviewMovieProps } from "../../types";

export const Status = ({ status }: PreviewMovieProps.Status) => {
  return (
    <div>
      <span>Status: </span>
      <span>{getStatus(status)}</span>
    </div>
  );
};
