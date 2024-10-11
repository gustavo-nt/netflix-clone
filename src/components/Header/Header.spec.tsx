import { fireEvent, render, within } from "@testing-library/react";
import { Header } from ".";

jest.mock("./utils/getStaticLinks", () => {
  return {
    staticLinksHeader: [
      {
        id: 1,
        title: "Início",
      },
      {
        id: 2,
        title: "Fim",
      },
    ],
  };
});

describe("Header component", () => {
  it("should be able to render a header list", () => {
    const { getByRole } = render(<Header />);

    const list = getByRole("list");
    const { getAllByRole } = within(list);

    const items = getAllByRole("list-item");
    expect(items.length).toBe(2);
  });

  it("should be able to render a list item", () => {
    const { getByRole } = render(<Header />);

    const list = getByRole("list");
    const { getByText } = within(list);

    expect(getByText("Início")).toBeInTheDocument();
  });

  it("should be able to see header dark mode", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("[role='header']");

    if (header) {
      fireEvent.scroll(window, { target: { scrollY: 40 } });
      const style = window.getComputedStyle(header).backgroundColor;

      expect(style).toEqual("rgb(20, 20, 20)");
    }
  });

  it("should change header background color to transparent when scroll down", () => {
    const { container } = render(<Header />);

    window.scrollY = 0;
    window.dispatchEvent(new Event("scroll"));
    expect(container.firstChild).toHaveStyle("background-color: transparent");
  });
});
