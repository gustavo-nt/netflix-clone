import { render } from "../../../../tests/query";

import { Media } from ".";
import { PreviewMovieProps } from "../../types";
import React from "react";

const props: PreviewMovieProps.Media = {
  soundReleased: true,
  backdropPath: "/aDBRtunw49UF4XmqfyNuD9nlYIu.jpg",
  videoId: "w9bZ7AOT9P0",
  title: "Lucifer",
};

const TestingComponent = () => {
  return <Media {...props} />;
};

describe("Media component", () => {
  it("should be able to render video when videoId is provided", () => {
    const { getByRole } = render(<TestingComponent />);

    expect(getByRole("embed")).toBeInTheDocument();
  });

  it("should be able to render show video", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [true, () => null]);

    const { getByRole } = render(<TestingComponent />);

    expect(getByRole("embed").firstElementChild).toHaveStyle({
      display: "block",
    });
  });

  it("should be to render error image when videoId is not provided", () => {
    props.videoId = null;
    props.backdropPath = null;
    props.soundReleased = false;

    const { getByLabelText } = render(<TestingComponent />);

    expect(getByLabelText(props.title!)).toBeInTheDocument();
  });

  it("should be able to display the component if loadedMain is false", () => {
    const { getByAltText } = render(<TestingComponent />);

    expect(getByAltText("Lucifer")).toBeInTheDocument();
    expect(getByAltText("Lucifer")).not.toHaveStyle({ display: "none" });
  });

  it("shouldn't be able to display the component if loadedMain is true", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => [true, () => null]);

    const { getByAltText } = render(<TestingComponent />);
    const image = getByAltText("Lucifer");

    expect(image.previousSibling).toBeNull();
  });
});
