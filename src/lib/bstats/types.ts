export type BStatsLinePoint = [number, number];

export interface BStatsPiePoint {
  name: string;
  y: number;
}

export interface BStatsMapPoint {
  code: string;
  value: number;
}

export interface BStatsDrilldownSeriesPoint {
  name: string;
  y: number;
  drilldown?: string | null;
}

export interface BStatsDrilldownGroup {
  name: string;
  id: string;
  data: [string, number][];
}

export interface BStatsDrilldownPayload {
  seriesData: BStatsDrilldownSeriesPoint[];
  drilldownData: BStatsDrilldownGroup[];
}

export interface CanvasBStatsResponse {
  plugin: {
    id: number;
    name: string;
    owner: string;
    softwareId: number | null;
    isGlobal: boolean;
  };
  generatedAt: string;
  fullData: boolean;
  maxElements: number | null;
  summary: {
    servers: {
      current: number;
      record: number;
      points: number;
    };
    players: {
      current: number;
      record: number;
      points: number;
    };
  };
  charts: {
    servers: BStatsLinePoint[];
    players: BStatsLinePoint[];
    canvasVersion: BStatsPiePoint[];
    coreCount: BStatsPiePoint[];
    onlineMode: BStatsPiePoint[];
    location: BStatsPiePoint[];
    locationMap: BStatsMapPoint[];
    osArch: BStatsPiePoint[];
    os: BStatsDrilldownPayload;
  };
}

export type TimeRangeKey = "1d" | "1w" | "1m" | "3m" | "1y" | "all";

export interface TimeRangeOption {
  key: TimeRangeKey;
  label: string;
  ms: number | null;
}

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { key: "1d", label: "1d", ms: 24 * 60 * 60 * 1000 },
  { key: "1w", label: "1w", ms: 7 * 24 * 60 * 60 * 1000 },
  { key: "1m", label: "1m", ms: 30 * 24 * 60 * 60 * 1000 },
  { key: "3m", label: "3m", ms: 90 * 24 * 60 * 60 * 1000 },
  { key: "1y", label: "1y", ms: 365 * 24 * 60 * 60 * 1000 },
  { key: "all", label: "All", ms: null },
];
