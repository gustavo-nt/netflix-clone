import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MovieRow } from ".";
import { MovieRowProps } from "./types";

const props: MovieRowProps.Default = {
  title: "Em Alta",
  onOpenDetails: jest.fn(),
  items: [],
};

const TestingComponent = () => {
  return <MovieRow {...props} />;
};

describe("MovieRow component", () => {
  it("should be able to render title", () => {
    const { getByText } = render(<TestingComponent />);

    const titleElement = getByText("Em Alta");
    expect(titleElement).toBeInTheDocument();
  });

  it("should be able to update scrollX correctly on click icon left", async () => {
    global.innerWidth = 1200;
    const { getByRole, container } = render(<TestingComponent />);

    const buttonLeft = getByRole("left-button");
    await userEvent.click(buttonLeft);

    const list = container.querySelector('[role="list"]');

    if (list) {
      const style = window.getComputedStyle(list).marginLeft;
      expect(style).toEqual("0px");
    }
  });

  it("should be able to update scrollX correctly on click icon right", async () => {
    global.innerWidth = 1200;
    props.items = new Array(10).fill("");

    const { getByRole, container } = render(<TestingComponent />);
    const buttonRight = getByRole("right-button");

    await userEvent.click(buttonRight);
    await userEvent.click(buttonRight);

    const list = container.querySelector('[role="list"]');

    if (list) {
      const style = window.getComputedStyle(list).marginLeft;
      expect(style).toEqual("-860px");
    }
  });

  it("should be able to open details when click", async () => {
    props.items = new Array(1).fill("");
    const { getByRole } = render(<TestingComponent />);

    const cardButton = getByRole("button");
    await userEvent.click(cardButton);

    expect(props.onOpenDetails).toHaveBeenCalled();
  });
});
