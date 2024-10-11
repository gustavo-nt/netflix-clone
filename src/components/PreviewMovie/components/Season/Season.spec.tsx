import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../../../tests/query";

import { Season } from "./Season";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.Season = {
  id: 1,
  episodes: [
    {
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
  ],
  numberOfSeasons: 2,
};

const TestingComponent = () => {
  return <Season {...props} />;
};

describe("Season component", () => {
  it("should be able to render right number of seasons", () => {
    const { getByText } = render(<TestingComponent />);

    expect(getByText("Temporada 1")).toBeInTheDocument();
    expect(getByText("Temporada 2")).toBeInTheDocument();
  });

  it("should call onHandleSeason when select option changes", () => {
    const { getByRole, queryByText } = render(<TestingComponent />);
    const { episodes } = props;

    const selectElement = getByRole("select");
    expect(selectElement).toBeInTheDocument();

    const optionToSelect = selectElement.querySelector(`option[value="2"]`);
    expect(optionToSelect).toBeInTheDocument();

    fireEvent.change(selectElement);
    expect(queryByText(episodes[0].name)).not.toBeInTheDocument();
  });

  it("should be able to render card elements when data is available", async () => {
    const { getAllByRole } = render(<TestingComponent />);

    await waitFor(() => getAllByRole("card"));
    const cards = getAllByRole("card");

    expect(cards.length).toBe(1);
  });

  it("should be able to render message when no episodes are available", async () => {
    props.episodes = [];
    const { getByText } = render(<TestingComponent />);

    expect(
      getByText(
        "Ops...Infelizmente não encontramos episódios para esta temporada.",
      ),
    ).toBeInTheDocument();
  });
});
