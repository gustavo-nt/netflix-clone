import { render, within } from "@testing-library/react";
import { Footer } from ".";

jest.mock("./utils/getStaticLinks", () => {
  return {
    staticLinksFooter: [
      {
        id: 1,
        title: "Idioma e legendas",
      },
      {
        id: 2,
        title: "Audiodescrição",
      },
    ],
  };
});

describe("Header component", () => {
  it("should be able to render a footer list", () => {
    const { getByRole } = render(<Footer />);

    const list = getByRole("list");
    const { getAllByRole } = within(list);

    const items = getAllByRole("list-item");
    expect(items.length).toBe(2);
  });

  it("should be able to render a list item", () => {
    const { getByRole } = render(<Footer />);

    const list = getByRole("list");
    const { getByText } = within(list);

    expect(getByText("Idioma e legendas")).toBeInTheDocument();
  });
});
