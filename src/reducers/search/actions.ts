export enum ActionTypes {
  SET_CLEAR_SEARCH = "SET_CLEAR_SEARCH",
  SET_QUERY_SEARCH = "SET_QUERY_SEARCH",
  SET_TOGGLE_SEARCH = "SET_TOGGLE_SEARCH",
}

export const setClearSearch = () => ({
  type: ActionTypes.SET_CLEAR_SEARCH,
});

export const setQuerySearch = (query: string) => ({
  type: ActionTypes.SET_QUERY_SEARCH,
  payload: {
    query,
  },
});

export const setToggleSearch = (state: boolean) => ({
  type: ActionTypes.SET_TOGGLE_SEARCH,
  payload: {
    state,
  },
});
