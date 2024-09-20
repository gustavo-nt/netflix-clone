import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Card } from ".";
import { CardProps } from "./types";

const props: CardProps.Default = {
  title: "Wonka",
  onClick: jest.fn(),
  poster_path: "/wonka.jpg",
};

const TestingComponent = () => {
  return <Card {...props} />;
};

describe("Card component", () => {
  it("should be able to render a image", () => {
    const { getByAltText } = render(<TestingComponent />);
    const { title } = props;

    if (title) {
      expect(getByAltText(title)).toBeInTheDocument();
    }
  });

  it("should be able to load a image", () => {
    const { container } = render(<TestingComponent />);
    const image = container.querySelector("img");

    if (image) {
      fireEvent.load(image);
      const style = window.getComputedStyle(image).display;

      expect(style).toEqual("block");
    }
  });

  it("should be able to open details when click", async () => {
    const { getByRole } = render(<TestingComponent />);
    await userEvent.click(getByRole("button"));

    expect(props.onClick).toHaveBeenCalled();
  });

  it("shouldn't be able to render a image", () => {
    props.poster_path = undefined;
    const { getByText } = render(<TestingComponent />);
    const { title } = props;

    if (title) {
      expect(getByText("Wonka")).toBeInTheDocument();
    }
  });

  it("shouldn't be able to render a title of a movie", () => {
    props.title = undefined;
    const { getByText } = render(<TestingComponent />);

    expect(getByText("Título não encontrado...")).toBeInTheDocument();
  });
});
