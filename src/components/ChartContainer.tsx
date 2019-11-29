import React, { useContext, useEffect } from "react";
import { Context } from "../store/context";
import { getMetricsAction } from "../store/actions";
import Chart from "./Chart";

const ChartContainer: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { metrics, datasources, campaigns } = state;

  useEffect(() => {
    dispatch(getMetricsAction(datasources, campaigns));
  }, []);

  return <Chart metrics={metrics} />;
};

export default ChartContainer;
