import { renderHook } from "../../../../../tests/query";
import { act, waitFor } from "@testing-library/react";

import { useSeason } from "./useSeason";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const props = {
  episodes: [
    {
      air_date: "2016-07-15",
      episode_number: 1,
      id: 1198665,
      name: "Capítulo um: O desaparecimento de Will Byers",
      overview:
        "No caminho de volta para casa, Will é aterrorizado por alguma coisa. Não longe dali, um laboratório secreto guarda um segredo sinistro.",
      runtime: 48,
      still_path: "/uLES7sRpy7Ih6Kr6XCaYj1GyfTw.jpg",
      vote_average: 8.441,
    },
  ],
  id: 1,
};

const seasonRequest = http.get(`*/tv/*/season/*`, () => {
  return HttpResponse.json({
    episodes: [
      {
        air_date: "2016-07-15",
        episode_number: 2,
        id: 1203677,
        name: "Capítulo dois: A estranha da Maple Street",
        overview:
          "Lucas, Mike e Dustin tentam conversar com a menina que encontram. Hopper tem perguntas para uma Joyce extremamente ansiosa.",
        runtime: 55,
        still_path: "/8iA56ugQyHZmX81wSsNqwXjCE6F.jpg",
        vote_average: 8.2,
      },
      {
        air_date: "2016-07-15",
        episode_number: 3,
        id: 1203679,
        name: "Capítulo três: Caramba",
        overview:
          "Cada vez mais preocupada, Nancy procura Barb e acaba descobrindo o que Jonathan anda fazendo. Joyce está convencida de que Will está tentando se comunicar com ela.",
        runtime: 51,
        still_path: "/5snULpWQWp7aqFto7UbRcEkEyyS.jpg",
        vote_average: 8.584,
      },
    ],
  });
});

const server = setupServer();

type UseSeasonReturnType = ReturnType<typeof useSeason>;

describe("usePreview hook", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("should be able to call handleSeason when select option changes", async () => {
    server.use(seasonRequest);
    const { result } = renderHook<UseSeasonReturnType>(() => useSeason(props));

    act(() => {
      result.current.handleSeason(2);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.episodesSeason.length).toBe(2);
  });
});
