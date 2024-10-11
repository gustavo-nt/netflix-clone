import { render } from "@testing-library/react";

import { FeaturedMovie } from ".";
import { HomeProps } from "../../types";

const props: HomeProps.FeaturedMovie = {
  id: 12345,
  name: "Lucifer",
  genres: [
    {
      id: 35,
      name: "Crime",
    },
  ],
  overview:
    "Entediado com a vida nas trevas, o diabo se muda para Los Angeles, abre um piano-bar e empresta sua sabedoria a uma investigadora de assassinatos.",
  backdrop_path: "/aDBRtunw49UF4XmqfyNuD9nlYIu.jpg",
  first_air_date: "2016-01-25",
  number_of_seasons: 1,
  vote_average: 8.476,
};

const TestingComponent = () => {
  return <FeaturedMovie {...props} />;
};

describe("FeaturedMovie component", () => {
  it("should be able to render a background image url correctly", () => {
    const { container } = render(<TestingComponent />);
    const section = container.querySelector("section");

    if (section) {
      const style = window.getComputedStyle(section).backgroundImage;

      expect(style).toEqual(
        `url(https://image.tmdb.org/t/p/original${props.backdrop_path})`,
      );
    }
  });

  it("should be able to render feature points", () => {
    const { getByText } = render(<TestingComponent />);

    expect(getByText(`84.76% relevante`)).toBeInTheDocument();
  });

  it("should be able to render a list of genres", () => {
    const { getByText } = render(<TestingComponent />);

    expect(getByText("Crime")).toBeInTheDocument();
  });

  it("should be able to render single season correctly", () => {
    const { getByText } = render(<TestingComponent />);
    const seasonsText = getByText("1 temporada");

    expect(seasonsText).toBeInTheDocument();
  });

  it("should render multiple seasons correctly", () => {
    props.number_of_seasons = 3;
    const { getByText } = render(<TestingComponent />);

    const seasonsText = getByText("3 temporadas");
    expect(seasonsText).toBeInTheDocument();
  });
});
