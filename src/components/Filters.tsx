import React from "react";
import Filter from "./Filter";

interface Props {
  datasourceOptions: string[];
  campaignOptions: string[];
  datasources: string[];
  campaigns: string[];
  handleDatasources: (datasources: string[]) => void;
  handleCampaigns: (campaigns: string[]) => void;
  handleApply: () => void;
}

const Filters: React.FC<Props> = (props: Props) => {
  const {
    datasources,
    campaigns,
    datasourceOptions,
    campaignOptions,
    handleDatasources,
    handleCampaigns,
    handleApply
  } = props;

  return (
    <aside>
      <Filter
        options={datasourceOptions}
        label="Datasource"
        selected={datasources}
        handleSelected={handleDatasources}
      />
      <Filter
        options={campaignOptions}
        label="Campaign"
        selected={campaigns}
        handleSelected={handleCampaigns}
      />

      <button
        className="apply-button"
        disabled={
          campaignOptions.length === 0 && datasourceOptions.length === 0
        }
        onClick={() => handleApply()}
      >
        Apply
      </button>
    </aside>
  );
};

export default Filters;
