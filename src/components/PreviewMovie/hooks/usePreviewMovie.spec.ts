import React from "react";
import { renderHook } from "@testing-library/react";
import { usePreviewMovie } from "./usePreviewMovie";

const setAttributeMockFn = jest.fn();

describe("usePreviewMovie hook", () => {
  it("should set data-overflow attribute to true when overview text overflows", () => {
    jest.spyOn(React, "useRef").mockReturnValueOnce({
      current: {
        offsetHeight: 150,
        scrollHeight: 200,
        parentNode: {
          setAttribute: setAttributeMockFn,
        },
      },
    });

    renderHook(() => usePreviewMovie({ openedSearch: false }));
    expect(setAttributeMockFn).toHaveBeenCalledWith("data-overflow", "true");
  });

  it("should not able to call setAttributeFn when ref is null", () => {
    jest.spyOn(React, "useRef").mockReturnValueOnce(null as any);

    renderHook(() => usePreviewMovie({ openedSearch: false }));
    expect(setAttributeMockFn).not.toHaveBeenCalled();
  });
});
