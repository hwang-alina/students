import { createStore } from "redux";
import { initialState, rootReducer } from "../reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools()
);
