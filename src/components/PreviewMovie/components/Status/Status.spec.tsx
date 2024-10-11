import { render } from "../../../../tests/query";

import { Status } from ".";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.Status = {
  status: "released",
};

const TestingComponent = () => {
  return <Status {...props} />;
};

describe("Status component", () => {
  it("should be able to render a status movie", () => {
    const { getByText } = render(<TestingComponent />);

    expect(getByText("Lançado")).toBeInTheDocument();
  });
});
