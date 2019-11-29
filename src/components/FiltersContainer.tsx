import React, { useContext } from "react";
import { Context } from "../store/context";
import {
  setDatasourcesAction,
  setCampaignsAction,
  getMetricsAction
} from "../store/actions";
import Filters from "./Filters";

const FiltersContainer: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { datasourceOptions, campaignOptions, datasources, campaigns } = state;

  const handleDatasources = (selected: string[]) => {
    dispatch(setDatasourcesAction(selected));
  };

  const handleCampaigns = (selected: string[]) => {
    dispatch(setCampaignsAction(selected));
  };

  const handleApply = () => {
    dispatch(getMetricsAction(datasources, campaigns));
  };

  return (
    <Filters
      datasourceOptions={datasourceOptions}
      campaignOptions={campaignOptions}
      datasources={datasources}
      campaigns={campaigns}
      handleDatasources={handleDatasources}
      handleCampaigns={handleCampaigns}
      handleApply={handleApply}
    />
  );
};

export default FiltersContainer;
