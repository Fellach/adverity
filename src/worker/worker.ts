import { Metrics } from "../store/Store";

interface Data {
  date: string;
  datasource: string;
  campaign: string;
  clicks: number;
  impressions: number;
}

interface Cache {
  data: Data[];
  datasources: string[];
  campaigns: string[];
  filled: boolean;
}

interface Filters {
  datasources: string[];
  campaigns: string[];
}

interface Sums {
  clicks: { [date: string]: number };
  impressions: { [date: string]: number };
}

export function createWebWorker(worker: Function): Worker {
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);

  return new Worker(URL.createObjectURL(blob));
}

export default function() {
  const url = "https://fellach.github.io/adverity/DAMKBAoDBwoDBAkOBAYFCw.csv";
  const cache: Cache = {
    data: [],
    datasources: [],
    campaigns: [],
    filled: false
  };

  // eslint-disable-next-line no-restricted-globals
  addEventListener("message", e => {
    if (!e) {
      return;
    }

    switch (e.data.type) {
      case "GetMetrics":
        getDataFromApiOrCache()
          .then(filterAndSumBy(e.data.payload))
          .then(createMetrics)
          .then(appendCollectionsFrom(cache))
          .then(postMessage)
          .catch(err => {
            setTimeout(() => {
              throw err;
            });
          });
        break;

      case "SetDatasources":
        const options = filterCampaignsFromCacheByDatasources(
          cache,
          e.data.payload
        );
        postMessage(options);
        break;

      default:
        console.log("There is no action", e);
    }
  });

  function filterCampaignsFromCacheByDatasources(
    cache: Cache,
    datasources: string[]
  ): string[] {
    if (datasources.length === 0) {
      return cache.campaigns;
    }
    const campaigns = Object.create(null);

    for (let d of cache.data) {
      if (datasources.includes(d.datasource)) {
        campaigns[d.campaign] = undefined;
      }
    }

    return Object.keys(campaigns).filter(k => k !== "undefined");
  }

  function getDataFromApiOrCache(): Promise<Data[]> {
    if (!cache.filled) {
      return fetch(url, {
        mode: "cors"
      })
        .then(response => {
          if (!response.ok || response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response;
        })
        .then(response => response.text())
        .then(csv => csvToCollections(csv))
        .then(collections => fillCache(collections))
        .then(() => cache.data);
    } else {
      return Promise.resolve(cache.data);
    }
  }

  function filterAndSumBy(filters: Filters) {
    return function(data: Data[]) {
      return sumBy(filters, data);
    };
  }

  function sumBy(filters: Filters, data: Data[]): Sums {
    const clicks = Object.create(null);
    const impressions = Object.create(null);
    const hasSourcesLength = filters.datasources.length === 0;
    const hasCampaignsLength = filters.campaigns.length === 0;

    for (const line of data) {
      if (
        (hasSourcesLength || filters.datasources.includes(line.datasource)) &&
        (hasCampaignsLength || filters.campaigns.includes(line.campaign))
      ) {
        clicks[line.date] = (clicks[line.date] || 0) + line.clicks;
        impressions[line.date] =
          (impressions[line.date] || 0) + line.impressions;
      }
    }

    return { clicks, impressions };
  }

  function createMetrics(sums: Sums): Metrics {
    const { clicks, impressions } = sums;
    const metrics: Metrics = {
      clicks: [],
      impressions: []
    };

    for (const date in clicks) {
      metrics.clicks.push({ x: parseDate(date), y: clicks[date] });
      metrics.impressions.push({ x: parseDate(date), y: impressions[date] });
    }

    return metrics;
  }

  function appendCollectionsFrom(cache: Cache) {
    return function(metrics: Metrics) {
      return {
        metrics,
        datasources: cache.datasources,
        campaigns: cache.campaigns
      };
    };
  }

  function csvToCollections(csv: string): [Data[], string[], string[]] {
    const data: Data[] = [];
    const datasources = Object.create(null);
    const campaigns = Object.create(null);

    const lines = csv.split(/\n/).slice(1, -1);

    for (let i in lines) {
      const line = lines[i].split(",");
      const date = line[0];
      const datasource = line[1];
      const campaign = line[2];
      const clicks = parseInt(line[3], 10) || 0; // default to 0 if not provided
      const impressions = parseInt(line[4], 10) || 0; // default to 0 if not provided

      data.push({ date, datasource, campaign, clicks, impressions });
      datasources[datasource] = undefined;
      campaigns[campaign] = undefined;
    }

    return [
      data,
      Object.keys(datasources).filter(k => k !== "undefined"),
      Object.keys(campaigns).filter(k => k !== "undefined")
    ];
  }

  function fillCache(collections: [Data[], string[], string[]]) {
    cache.data = collections[0];
    cache.datasources = collections[1];
    cache.campaigns = collections[2];
    cache.filled = true;
  }

  function parseDate(date: string) {
    const parts = date.split(".");
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);

    return new Date(y, m, d);
  }
}
