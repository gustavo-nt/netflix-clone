import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import { render } from "../../tests/query";

import { QueryResults } from ".";
import { QueryResultsProps } from "./types";

const props: QueryResultsProps.Default = {
  onOpenDetails: jest.fn(),
};

const TestingComponent = () => {
  return <QueryResults {...props} />;
};

const mock: QueryResultsProps.SearchData = {
  data: {
    pages: [
      {
        page: 1,
        results: [
          {
            id: 136797,
            title: "Need for Speed: O Filme",
            poster_path: "/yJh2piyBmY5BvfNBl8EsDNxaFh4.jpg",
            media_type: "movie",
          },
        ],
      },
    ],
    pageParams: [],
  },
  openSearchBox: true,
  fetchNextPage: jest.fn(),
  query: "Need for Speed",
};

jest.mock("../../context/SearchContext", () => ({
  useSearch: jest.fn(() => ({
    ...mock,
  })),
}));

describe("QueryResults component", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();

    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("should be able to render with data", () => {
    const { getByText } = render(<TestingComponent />);
    const { query } = mock;

    expect(getByText(query)).toBeInTheDocument();
  });

  it("should be able to render with data", () => {
    const { getByText } = render(<TestingComponent />);
    const { query } = mock;

    expect(getByText(query)).toBeInTheDocument();
  });

  it("should be able to render a right quantity of items", () => {
    const { getByRole } = render(<TestingComponent />);

    const list = getByRole("list");
    const { getAllByRole } = within(list);

    const items = getAllByRole("button");
    expect(items.length).toBe(1);
  });

  it("should be able to open details when click", async () => {
    const { getByRole } = render(<TestingComponent />);

    const cardButton = getByRole("button");
    await userEvent.click(cardButton);

    expect(props.onOpenDetails).toHaveBeenCalled();
  });

  it("shouldn't be able to render component without data", () => {
    mock.data = undefined;

    const { queryByText } = render(<TestingComponent />);
    const { query } = mock;

    expect(queryByText(query)).not.toBeInTheDocument();
  });
});
