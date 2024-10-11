import { render } from "../../../../tests/query";

import { MaturityLevel } from ".";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.MaturityLevel = {
  ratings: "18",
};

const TestingComponent = () => {
  return <MaturityLevel {...props} />;
};

describe("MaturityLevel component", () => {
  it("should be able to render a maturity level", () => {
    const { getByText } = render(<TestingComponent />);
    const { ratings } = props;

    expect(getByText(ratings)).toBeInTheDocument();
  });

  it("should able to set maturity level to 'adult' and content ratings to ratings when ratings is not a number", () => {
    props.ratings = "ABC";
    const { getByText } = render(<TestingComponent />);

    expect(getByText(props.ratings)).toBeInTheDocument();
  });

  it("should be able to render a maturity level", () => {
    props.ratings = "";
    const { getByText } = render(<TestingComponent />);

    expect(getByText("?")).toBeInTheDocument();
  });
});
