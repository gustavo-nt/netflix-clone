import { render } from "../../../../tests/query";

import { Genres } from ".";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.Genres = {
  list: [
    {
      id: 1,
      name: "Ação",
    },
    {
      id: 2,
      name: "Drama",
    },
  ],
};

const TestingComponent = () => {
  return <Genres {...props} />;
};

describe("Genres component", () => {
  it("should be able to render a genres list", () => {
    const { getByText } = render(<TestingComponent />);
    const { list } = props;

    expect(
      getByText(list.map(({ name }) => name).join(", ")),
    ).toBeInTheDocument();
  });
});
