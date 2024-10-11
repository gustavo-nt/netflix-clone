import { render } from "@testing-library/react";
import { ListMovies } from ".";

describe("ListMovies component", () => {
  it("should be able to render a list of movies", () => {
    const { getByText } = render(
      <ListMovies
        list={[
          {
            title: "Originais do Netflix",
            slug: "originals",
            items: [
              {
                id: 82452,
                name: "Avatar: O Último Mestre do Ar",
                overview:
                  "Um garoto conhecido como o Avatar precisa dominar os quatro poderes elementares para salvar um mundo em guerra e enfrentar um inimigo implacável.",
                poster_path: "/zCz483fU94RxRt1gdGW1rxQkcID.jpg",
              },
            ],
          },
        ]}
      />,
    );

    const titleElement = getByText("Originais do Netflix");
    expect(titleElement).toBeInTheDocument();
  });
});
