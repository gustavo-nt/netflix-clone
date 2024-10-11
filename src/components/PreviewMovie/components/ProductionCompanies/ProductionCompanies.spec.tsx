import { render } from "../../../../tests/query";

import { ProductionCompanies } from ".";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.ProductionCompanies = {
  companies: [
    {
      name: "Marvel Studios",
    },
    {
      name: "Maximum Effort",
    },
  ],
};

const TestingComponent = () => {
  return <ProductionCompanies {...props} />;
};

describe("Genres component", () => {
  it("should be able to render a list of main companies", () => {
    const { getByText } = render(<TestingComponent />);
    const { companies } = props;

    expect(
      getByText(companies.map(({ name }) => name).join(", ")),
    ).toBeInTheDocument();
  });

  it("shouldn't be able to render a list of main companies", () => {
    props.companies = [];
    const { getByText } = render(<TestingComponent />);

    expect(
      getByText("Ops, não foi possível encontrar as produtoras desse título."),
    ).toBeInTheDocument();
  });
});
