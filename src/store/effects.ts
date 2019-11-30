import {
  Action,
  Actions,
  setErrorAction,
  setMetricsAction,
  setDatasourceOptionsAction,
  setCampaignOptionsAction
} from "./actions";
import webWorker, { createWebWorker } from "../worker/worker";

const worker = createWebWorker(webWorker);

export const effects = (action: Action, dispatch: Function) => {
  switch (action.type) {
    case Actions.GetMetrics:
      worker.onmessage = (e: MessageEvent) => {
        dispatch(setMetricsAction(e.data.metrics));
        dispatch(setDatasourceOptionsAction(e.data.datasources));
        dispatch(setCampaignOptionsAction(e.data.campaigns));
      };

      worker.onerror = (e: ErrorEvent) => {
        e.preventDefault();
        dispatch(setErrorAction("Can't load data"));
      };

      worker.postMessage(action);
      break;

    case Actions.SetDatasources:
      worker.onmessage = (e: MessageEvent) => {
        dispatch(setCampaignOptionsAction(e.data));
      };

      worker.onerror = (e: ErrorEvent) => {
        e.preventDefault();
        dispatch(setErrorAction("Can't filter Campaigns"));
      };

      worker.postMessage(action);
      break;
  }
};
