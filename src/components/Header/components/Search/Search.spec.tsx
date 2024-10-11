import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@testing-library/react";
import { Search } from ".";

const TestingComponent = () => {
  return <Search />;
};

const mock = { dispatch: jest.fn(), openSearchBox: false };

jest.mock("../../../../context/SearchContext", () => ({
  useSearch: () => {
    return mock;
  },
}));

describe("Search component", () => {
  beforeEach(() => {
    mock.openSearchBox = false;
  });

  it("should be able to render a input", () => {
    mock.openSearchBox = true;
    const { getByPlaceholderText } = render(<TestingComponent />);

    expect(
      getByPlaceholderText("Títulos, gente e gêneros"),
    ).toBeInTheDocument();
  });

  it("should be able to show a search box", async () => {
    const { getByRole, findByText } = render(<TestingComponent />);

    const searchIcon = getByRole("icon-search");
    await userEvent.click(searchIcon);

    waitFor(() => expect(findByText("Buscar")).toBeInTheDocument());
  });

  it("should be able to close a search box", async () => {
    mock.openSearchBox = true;
    const { getByRole, findByRole } = render(<TestingComponent />);

    const closeIcon = getByRole("icon-close");

    await userEvent.click(closeIcon);
    waitFor(() => expect(findByRole("icon-search")).toBeInTheDocument());
  });
});
