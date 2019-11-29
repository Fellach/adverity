import { Actions, Action } from "./actions";
import { MetaState } from "./Store";

export const reducer = (state: MetaState, action: Action) => {
  // handle side effects by setting the action
  state = {
    ...state,
    action
  };

  switch (action.type) {
    case Actions.SetMetrics:
      return {
        ...state,
        metrics: action.payload,
        headerLabel: createHeaderLabel(state.datasources, state.campaigns)
      } as MetaState;

    case Actions.SetDatasources:
      return {
        ...state,
        datasources: action.payload,
        campaigns:
          action.payload.length !== state.datasources.length
            ? []
            : state.campaigns
      } as MetaState;

    case Actions.SetCampaigns:
      return { ...state, campaigns: action.payload } as MetaState;

    case Actions.SetDatasourceOptions:
      return { ...state, datasourceOptions: action.payload } as MetaState;

    case Actions.SetCampaignOptions:
      return { ...state, campaignOptions: action.payload } as MetaState;

    case Actions.SetError:
      return {
        ...state,
        headerLabel: action.payload
      } as MetaState;

    default:
      return state;
  }
};

function createHeaderLabel(datasources: string[], campaigns: string[]): string {
  if (datasources.length > 0 || campaigns.length > 0) {
    const label1 =
      datasources.length === 0
        ? "All Datasources"
        : "Datasource " + datasources.join(", ");
    const label2 =
      campaigns.length === 0
        ? "All Campaigns"
        : "Campaign " + campaigns.join(", ");

    return `${label1}; ${label2}`;
  }

  return "Tip: Select Datasource or Campaign to filter the chart";
}
