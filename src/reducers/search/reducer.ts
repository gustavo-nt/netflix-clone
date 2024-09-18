import { produce } from "immer";
import { ActionTypes } from "./actions";

type SearchState = {
  query: string;
  openSearchBox: boolean;
};

export const searchReducer = (state: SearchState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_CLEAR_SEARCH: {
      return produce(state, (draft) => {
        draft.query = "";
        draft.openSearchBox = false;
      });
    }
    case ActionTypes.SET_QUERY_SEARCH: {
      return produce(state, (draft) => {
        draft.query = action.payload.query;
      });
    }
    case ActionTypes.SET_TOGGLE_SEARCH: {
      return produce(state, (draft) => {
        draft.openSearchBox = action.payload.state;
      });
    }
    default:
      return state;
  }
};
