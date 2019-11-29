import React, { useEffect, useState } from "react";
import CanvasJSReact from "../canvasjs/canvasjs.react";
import { Metrics } from "../store/Store";

interface Props {
  metrics: Metrics;
}

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const defaultOptions = {
  theme: "light2",
  animationEnabled: true,
  axisX: {
    labelFormatter: (e: any) => CanvasJS.formatDate(e.value, "MMM YY")
  },
  axisY: {
    title: "Clicks",
    titleFontColor: "#6D78AD",
    lineColor: "#6D78AD",
    labelFontColor: "#6D78AD",
    tickColor: "#6D78AD",
    includeZero: false
  },
  axisY2: {
    title: "Impressions",
    titleFontColor: "#51CDA0",
    lineColor: "#51CDA0",
    labelFontColor: "#51CDA0",
    tickColor: "#51CDA0",
    includeZero: false
  },
  toolTip: {
    shared: true
  },
  data: [
    {
      type: "spline",
      name: "Clicks",
      showInLegend: true,
      xValueFormatString: "DD/MM/YYYY",
      dataPoints: []
    },
    {
      type: "spline",
      name: "Impressions",
      axisYType: "secondary",
      showInLegend: true,
      xValueFormatString: "DD/MM/YYYY",
      dataPoints: []
    }
  ]
};

const Chart: React.FC<Props> = ({ metrics }) => {
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    const { data } = options;
    data[0].dataPoints = metrics.clicks as [];
    data[1].dataPoints = metrics.impressions as [];

    setOptions(o => ({
      ...o,
      data
    }));
  }, [metrics]);

  return <main>{<CanvasJSChart options={options} />}</main>;
};

export default Chart;
