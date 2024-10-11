import { render } from "../../../../tests/query";

import { Recommend } from ".";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.Recommend = {
  id: 1022789,
  list: [
    {
      id: 150540,
      date: "2015-06-17",
      title: "Divertida Mente",
      vote_average: 7.914,
      overview:
        "Baseadas na Sala de Comando, o centro de controle dentro da mente de Riley de 11 anos, cinco emoções trabalham sem parar, lideradas pela otimista Alegria. Ela se esforça muito para garantir que Riley esteja sempre feliz, e trabalha ao lado do Medo, Raiva, Nojinho e Tristeza.",
      backdrop_path: "/j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg",
    },
    {
      id: 1022789,
      date: "2024-06-11",
      title: "Divertida Mente 2",
      vote_average: 7.677,
      overview:
        "Divertida Mente 2, da Disney e da Pixar, retorna à mente da adolescente Riley, e o faz no momento em que a sala de comando está passando por uma demolição repentina para dar lugar a algo totalmente inesperado: novas emoções! Alegria, Tristeza, Raiva, Medo e Nojinho não sabem bem como reagir quando Ansiedade aparece, e tudo indica que ela não está sozinha.",
      backdrop_path: "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
    },
  ],
  label: "Divertida Mente: Coleção",
};

const TestingComponent = () => {
  return <Recommend {...props} />;
};

describe("Recommend component", () => {
  it("should be able to render with a non-empty list", () => {
    const { getByText } = render(<TestingComponent />);
    const { label, list } = props;

    expect(getByText(label)).toBeInTheDocument();

    expect(getByText(list[0].title)).toBeInTheDocument();
    expect(getByText(list[1].title)).toBeInTheDocument();
  });

  it("should be able to render with an empty list and showNoResults set to false", () => {
    props.list = [];
    const { queryByText } = render(<TestingComponent />);

    expect(
      queryByText("Ops...Infelizmente não encontramos títulos relacionados"),
    ).not.toBeInTheDocument();
  });

  it("should be able to render with an empty list and showNoResults set to true", () => {
    props.list = [];
    props.showNoResults = true;

    const { getByText } = render(<TestingComponent />);

    expect(
      getByText("Ops...Infelizmente não encontramos títulos relacionados"),
    ).toBeInTheDocument();
  });
});
