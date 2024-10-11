import { render } from "../../../../tests/query";

import { About } from ".";
import { PreviewMovieProps } from "../../types";

const props: PreviewMovieProps.About = {
  crew: [
    {
      name: "Shawn Levy",
      job: "Director",
    },
    {
      name: "Rhett Reese",
      job: "Writer",
    },
  ],
  cast: [
    {
      name: "Ryan Reynolds",
    },
    {
      name: "Hugh Jackman",
    },
  ],
  title: "Deadpool & Wolverine",
  genres: [
    {
      id: 28,
      name: "Ação",
    },
    {
      id: 35,
      name: "Comédia",
    },
    {
      id: 878,
      name: "Ficção científica",
    },
  ],
  companies: [
    {
      name: "Marvel Studios",
    },
    {
      name: "Maximum Effort",
    },
  ],
  contentRatings: "18",
};

const TestingComponent = () => {
  return <About {...props} />;
};

describe("About component", () => {
  it("should be able to render a director name", () => {
    const { getByText } = render(<TestingComponent />);

    const { crew } = props;
    const director = crew.find(({ job }) => job === "Director");

    if (director) {
      expect(getByText(director.name)).toBeInTheDocument();
    }
  });

  it("should be able to render a writer name", () => {
    const { getByText } = render(<TestingComponent />);

    const { crew } = props;
    const writer = crew.find(({ job }) => job === "Writer");

    if (writer) {
      expect(getByText(writer.name)).toBeInTheDocument();
    }
  });

  it("should be able to render a list of main cast", () => {
    const { getByText } = render(<TestingComponent />);
    const { cast } = props;

    expect(
      getByText(cast.map(({ name }) => name).join(", ")),
    ).toBeInTheDocument();
  });

  it("should be able to render title movie", () => {
    const { getByText } = render(<TestingComponent />);
    const { title } = props;

    if (title) {
      expect(getByText(title)).toBeInTheDocument();
    }
  });

  it("should be able to render a list of main companies", () => {
    const { getByText } = render(<TestingComponent />);
    const { companies } = props;

    expect(
      getByText(companies.map(({ name }) => name).join(", ")),
    ).toBeInTheDocument();
  });

  it("should be able to render a list of main genres", () => {
    const { getByText } = render(<TestingComponent />);
    const { genres } = props;

    expect(
      getByText(genres.map(({ name }) => name).join(", ")),
    ).toBeInTheDocument();
  });
});
