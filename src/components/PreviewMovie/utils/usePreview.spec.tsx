import React from "react";
import { renderHook } from "@testing-library/react";
import { usePreview } from "./usePreview";

const setAttributeMockFn = jest.fn();

describe("usePreview hook", () => {
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

    renderHook(() => usePreview({ openedSearch: false }));
    expect(setAttributeMockFn).toHaveBeenCalledWith("data-overflow", "true");
  });
});
