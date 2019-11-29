import { createContext } from "react";
import { State } from "./Store";

export const Context = createContext({
  state: {} as State,
  dispatch: (action: any) => {}
});
