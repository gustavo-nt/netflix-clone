import userEvent from "@testing-library/user-event";
import { render } from "../../tests/query";

import { PreviewMovie } from ".";
import { PreviewMovieProps } from "./types";

const props: PreviewMovieProps.Default = {
  contentRatings: "12",
  cast: [{ name: "Gordon Cormier" }],
  backdrop_path: "/imlTCObfzISogbvcwB1dokoXAIc.jpg",
  crew: [{ job: "Director", name: "Bonnie Benwick" }],
  number_of_seasons: 3,
  date: "2024-02-22",
  id: 82452,
  overview:
    "Água. Terra. Fogo. Ar. As quatro nações viviam em harmonia, com o Avatar, mestre de todos os elementos, mantendo a paz entre eles. Mas tudo mudou quando a Nação do Fogo atacou e exterminou os Nômades do Ar, o primeiro passo dos mestres do fogo para conquistarem o mundo. Com a próxima encarnação do Avatar ainda por vir, o mundo perdeu a esperança. Mas como uma luz na escuridão, a esperança floresce quando Aang, um jovem Nômade do Ar — e o último de seu grupo — desperta para tomar seu lugar por direito como o próximo Avatar. Junto com seus novos amigos Sokka e Katara, irmãos e membros da Tribo da Água do Sul, Aang embarca em uma busca fantástica e cheia de ação para salvar o mundo e lutar contra o terrível ataque do Senhor do Fogo Ozai. Mas com o Príncipe Zuko determinado a capturá-los, não será uma tarefa fácil. Eles vão precisar da ajuda de muitos aliados e personagens coloridos que encontrarem ao longo do caminho.",
  production_companies: [
    {
      name: "Nickelodeon Productions",
    },
  ],
  recommends: [],
  season: {
    id: 109532,
    episodes: [
      {
        id: 1574440,
        name: "Aang",
        air_date: "2024-02-22",
        overview:
          "Um Dobrador de ar enfrenta sua nova realidade quando a guerra começa. Um século depois, dois irmãos da Tribo da Água fazem uma descoberta que muda tudo.",
        still_path: "/3eLPQfIOva0RSAoviRgNqBtqPck.jpg",
        vote_average: 8.299,
        episode_number: 1,
        runtime: 64,
      },
    ],
    numberOfSeasons: 3,
  },
  status: "Returning Series",
  title: "Avatar: o Último Mestre do Ar",
  genres: [{ id: 10765, name: "Sci-Fi & Fantasy" }],
  duration: "1 temporada",
  videoId: "THNsNv_ryyM",
  vote_average: 7.8,
};

const TestingComponent = () => {
  return <PreviewMovie {...props} />;
};

describe("PreviewMovie component", () => {
  it("shouldn't be able to render the component", async () => {
    const { getByRole } = render(<TestingComponent />);

    const previewElement = getByRole("dialog-preview");
    await userEvent.click(previewElement);

    expect(previewElement).not.toBeInTheDocument();
  });

  it("should be able to render a relevance", () => {
    const { getByText } = render(<TestingComponent />);

    const relevanceElement = getByText(
      `${(props.vote_average * 10).toFixed(2)}% relevante`,
    );

    expect(relevanceElement).toBeInTheDocument();
  });

  it("should be able to render the right sound icon", async () => {
    const { getByRole } = render(<TestingComponent />);

    const soundOff = getByRole("sound-off");
    expect(soundOff).toBeInTheDocument();

    const button = getByRole("sound-button");
    await userEvent.click(button);

    const soundOn = getByRole("sound-on");
    expect(soundOn).toBeInTheDocument();
  });

  it("shouldn't be able to render a overview", () => {
    props.overview = "";

    const { getByText } = render(<TestingComponent />);
    const overviewElement = getByText(`${props.title} não possui uma sinopse.`);

    expect(overviewElement).toBeInTheDocument();
  });
});
