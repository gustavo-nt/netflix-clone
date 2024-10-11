import { renderHook } from "../../../../../tests/query";
import { act } from "@testing-library/react";

import YouTube from "react-youtube";
import { useMedia } from "./useMedia";

type UseSeasonReturnType = ReturnType<typeof useMedia>;

describe("useMedia hook", () => {
  it("initializes with default values", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: false }),
    );

    expect(result.current.isVisibleVideo).toBe(false);
    expect(result.current.loadedMain).toBe(false);
  });

  it("sets isVisibleVideo to true when onPlayerReady is called", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: false }),
    );

    act(() => {
      result.current.onPlayerReady({
        data: null,
        target: null,
      });
    });

    expect(result.current.isVisibleVideo).toBe(true);
  });

  it("sets isVisibleVideo to false when onPlayerEnd is called", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: false }),
    );

    act(() => {
      result.current.onPlayerReady({
        data: null,
        target: null,
      });

      result.current.onPlayerEnd({
        data: 0,
        target: { destroy: jest.fn() },
      });
    });

    expect(result.current.isVisibleVideo).toBe(false);
  });

  it("sets isVisibleVideo to false when onPlayerError is called", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: false }),
    );

    act(() => {
      result.current.onPlayerReady({
        data: null,
        target: null,
      });

      result.current.onPlayerError({
        data: 0,
        target: { destroy: jest.fn() },
      });
    });

    expect(result.current.isVisibleVideo).toBe(false);
  });

  it("calls getInternalPlayer().mute() when soundReleased is false and isVisibleVideo is true", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: false }),
    );

    const getInternalPlayerMock = jest.fn();
    const muteMock = jest.fn();

    result.current.soundElement.current = {
      getInternalPlayer: getInternalPlayerMock,
    } as unknown as YouTube;

    getInternalPlayerMock.mockReturnValue({ mute: muteMock });

    act(() => {
      result.current.onPlayerReady({
        data: null,
        target: null,
      });
    });

    expect(muteMock).toHaveBeenCalledTimes(1);
  });

  it("calls getInternalPlayer().unMute() when soundReleased is true and isVisibleVideo is true", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: true }),
    );

    const getInternalPlayerMock = jest.fn();
    const unMuteMock = jest.fn();

    result.current.soundElement.current = {
      getInternalPlayer: getInternalPlayerMock,
    } as unknown as YouTube;

    getInternalPlayerMock.mockReturnValue({ unMute: unMuteMock });

    act(() => {
      result.current.onPlayerReady({
        data: null,
        target: null,
      });
    });

    expect(unMuteMock).toHaveBeenCalledTimes(1);
  });

  it("sets loadedMain to true when onHideLoading is called", () => {
    const { result } = renderHook<UseSeasonReturnType>(() =>
      useMedia({ soundReleased: false }),
    );

    act(() => {
      result.current.onHideLoading();
    });

    expect(result.current.loadedMain).toBe(true);
  });
});
