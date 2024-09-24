import { renderHook } from "@testing-library/react";
import { useQuery } from "./useQuery";

const props = {
  inView: true,
  openSearchBox: false,
  fetchNextPage: jest.fn(),
};

const enableBodyScrollMock = jest.fn();

jest
  .spyOn(require("body-scroll-lock"), "enableBodyScroll")
  .mockImplementation(enableBodyScrollMock);

describe("usePreviewMovie hook", () => {
  it("should be able to fetch next page", () => {
    renderHook(() => useQuery(props));
    expect(props.fetchNextPage).toHaveBeenCalled();
  });

  it("should be able to enable body scroll", () => {
    renderHook(() => useQuery(props));

    const bodyElement = document.body;
    expect(enableBodyScrollMock).toHaveBeenCalledWith(bodyElement);
  });
});
