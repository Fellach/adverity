import { Metrics } from "./Store";

export interface Action {
  type: Actions;
  payload?: any;
}

export enum Actions {
  GetMetrics = "GetMetrics",
  SetMetrics = "SetMetrics",
  SetDatasources = "SetDatasources",
  SetCampaigns = "SetCampaigns",
  SetDatasourceOptions = "SetDatasourceOptions",
  SetCampaignOptions = "SetCampaignOptions",
  SetError = "SetError"
}

// action creators

export function getMetricsAction(
  datasources: string[],
  campaigns: string[]
): Action {
  return {
    type: Actions.GetMetrics,
    payload: {
      datasources,
      campaigns
    }
  };
}

export function setMetricsAction(payload: Metrics): Action {
  return {
    type: Actions.SetMetrics,
    payload
  };
}

export function setDatasourcesAction(payload: string[]): Action {
  return {
    type: Actions.SetDatasources,
    payload
  };
}

export function setDatasourceOptionsAction(payload: string[]): Action {
  return {
    type: Actions.SetDatasourceOptions,
    payload
  };
}

export function setCampaignsAction(payload: string[]): Action {
  return {
    type: Actions.SetCampaigns,
    payload
  };
}

export function setCampaignOptionsAction(payload: string[]): Action {
  return {
    type: Actions.SetCampaignOptions,
    payload
  };
}

export function setErrorAction(payload: string): Action {
  return {
    type: Actions.SetError,
    payload
  };
}
