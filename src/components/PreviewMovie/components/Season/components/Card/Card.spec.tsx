import { render } from "../../../../../../tests/query";

import { Card } from "./Card";
import { SeasonProps } from "../../types";
import { fireEvent } from "@testing-library/react";

const props: SeasonProps.Card = {
  item: {
    air_date: "2022-09-01",
    episode_number: 1,
    id: 1865375,
    name: "A Sombra do Passado",
    overview:
      "Galadriel é perturbada por sinais do retorno de um antigo mal; Arondir faz uma descoberta inquietante; Elrond é apresentado a um novo empreendimento intrigante; Nori quebra a regra mais arraigada da comunidade Harfoot.",
    runtime: 66,
    still_path: "/15UCiKw7ujYq0W7nQ4u06l6oENn.jpg",
    vote_average: 6.868,
  },
};

const TestingComponent = () => {
  return <Card {...props} />;
};

describe("Card component", () => {
  it("should be able to render episode number", () => {
    const { getByText } = render(<TestingComponent />);
    const { episode_number } = props.item;

    expect(getByText(episode_number)).toBeInTheDocument();
  });

  it("should be able to render episode name and runtime", () => {
    const { getByText } = render(<TestingComponent />);
    const { name, runtime } = props.item;

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(`${runtime} min`)).toBeInTheDocument();
  });

  it("should be able to render runtime as 0 if item.runtime is null or undefined", () => {
    delete (props.item as { runtime?: number }).runtime;
    const { getByText } = render(<TestingComponent />);

    expect(getByText("0 min")).toBeInTheDocument();
  });

  it("should be able torender episode overview", () => {
    const { getByText } = render(<TestingComponent />);
    const { overview } = props.item;

    expect(getByText(overview)).toBeInTheDocument();
  });

  it("should be able to render default message when overview is not available", () => {
    props.item.overview = "";
    const { getByText } = render(<TestingComponent />);

    expect(
      getByText("Ops...este episódio não possui uma sinopse."),
    ).toBeInTheDocument();
  });

  it("should be able torender still path image when available", () => {
    const { getByAltText } = render(<TestingComponent />);
    const { name } = props.item;

    expect(getByAltText(name)).toBeInTheDocument();
  });

  it("should be able to call setIsLoading(false) when image loads", () => {
    const { getByAltText } = render(<TestingComponent />);
    const { name } = props.item;

    const image = getByAltText(name);
    fireEvent.load(image);

    expect(image.previousSibling).toBeNull();
  });

  it("should be able to render error image when still path is not available", () => {
    props.item.still_path = "";
    const { getByAltText } = render(<TestingComponent />);
    const { name } = props.item;

    expect(
      getByAltText(`${name} não possui imagem de capa`),
    ).toBeInTheDocument();
  });
});
