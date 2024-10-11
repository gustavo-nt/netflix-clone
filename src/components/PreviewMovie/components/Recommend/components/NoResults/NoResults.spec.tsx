import { render } from "../../../../../../tests/query";
import { NoResults } from ".";

describe("NoResults", () => {
  it("should display the fallback title when the title prop is not provided", () => {
    const { getByAltText } = render(<NoResults />);
    expect(getByAltText("Sem título")).toBeInTheDocument();
  });

  it("should display the title when the title prop is provided", () => {
    const { getByText } = render(<NoResults title="Divertida Mente" />);
    expect(getByText("para: " + "Divertida Mente")).toBeInTheDocument();
  });
});
