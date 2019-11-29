import React, { useReducer, useEffect, Reducer } from "react";
import { reducer } from "./reducer";
import { effects } from "./effects";
import { Action } from "./actions";
import { Context } from "./context";

export interface Metrics {
  clicks: {
    x: Date;
    y: number;
  }[];
  impressions: {
    x: Date;
    y: number;
  }[];
}

export interface State {
  headerLabel: string;
  datasourceOptions: string[];
  campaignOptions: string[];
  datasources: string[];
  campaigns: string[];
  metrics: Metrics;
}

export interface MetaState extends State {
  action: Action;
}

const initialState: MetaState = {
  action: {} as Action,
  headerLabel: "",
  datasourceOptions: [],
  campaignOptions: [],
  datasources: [],
  campaigns: [],
  metrics: {
    clicks: [],
    impressions: []
  }
};

const Store: React.FC = ({ children }) => {
  const [metaState, dispatch] = useReducer<Reducer<MetaState, Action>>(
    reducer,
    initialState
  );
  const { action, ...state } = metaState;

  useEffect(() => {
    effects(action, dispatch);
  }, [action]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Store;
