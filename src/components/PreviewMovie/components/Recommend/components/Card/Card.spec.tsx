import { fireEvent } from "@testing-library/react";
import { render } from "../../../../../../tests/query";

import { Card } from "./Card";
import { RecommendProps } from "../../types";

const props: RecommendProps.Card = {
  idParent: 5519182,
  item: {
    id: 533535,
    vote_average: 7.742,
    title: "Deadpool & Wolverine",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    media_type: "movie",
    date: "2024-07-24",
    overview:
      "Um apático Wade Wilson trabalha duro na vida civil. Seus dias como mercenário moralmente flexível, Deadpool, ficou para trás. Quando seu planeta enfrenta uma ameaça, Wade deve relutantemente vestir-se novamente com um ainda mais relutante... relutante? Mais relutante? Ele deve convencer um Wolverine relutante em... Porra. As sinopses são tão estúpidas.",
  },
};

const TestingComponent = () => {
  return <Card {...props} />;
};

const mock = { onUpdatePreview: jest.fn() };

jest.mock("../../../../../../context/PreviewContext", () => ({
  usePreview: () => {
    return mock;
  },
}));

describe("Card component", () => {
  it("should be able to render the card with the correct title", () => {
    const { getByText } = render(<TestingComponent />);
    const { title } = props.item;

    expect(getByText(title)).toBeInTheDocument();
  });

  it("should be able to call onUpdatePreview when the card is clicked", () => {
    const { getByRole } = render(<TestingComponent />);
    const { title, id, media_type } = props.item;

    fireEvent.click(getByRole("card"));
    expect(mock.onUpdatePreview).toHaveBeenCalledWith({
      id,
      title,
      media_type,
    });
  });

  it("should be able to renders the relevance percentage correctly", () => {
    const { getByText } = render(<TestingComponent />);
    const { vote_average } = props.item;

    expect(
      getByText(
        (_, element) =>
          element?.textContent ===
          `${(vote_average * 10).toFixed(2)}% relevante`,
      ),
    ).toBeInTheDocument();
  });

  it("should be able to render the overview if it exists", () => {
    const { getByText } = render(<TestingComponent />);
    const { overview } = props.item;

    expect(getByText(overview!)).toBeInTheDocument();
  });

  it("should be able to call setIsLoading(false) when image loads", () => {
    const { getByAltText } = render(<TestingComponent />);
    const { title } = props.item;

    const image = getByAltText(title);
    fireEvent.load(image);

    expect(image.previousSibling).toBeNull();
  });

  it("should be able to render a default message if the overview does not exist", () => {
    props.item.overview = null;
    const { getByText } = render(<TestingComponent />);

    expect(
      getByText("Ops...O título em questão, não possui uma descrição."),
    ).toBeInTheDocument();
  });
});
