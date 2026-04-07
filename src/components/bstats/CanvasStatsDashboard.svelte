<script lang="ts">
  import type { EChartsCoreOption } from "echarts";
  import { onMount } from "svelte";
  import { hoverScale } from "@/lib/animations";
  import {
    TIME_RANGE_OPTIONS,
    type BStatsLinePoint,
    type BStatsPiePoint,
    type CanvasBStatsResponse,
    type TimeRangeKey,
  } from "@/lib/bstats/types";
  import EChart from "./charts/EChart.svelte";

  interface Props {
    pluginId?: number;
  }

  interface DownloadsStatsResponse {
    totalDownloads: number;
    trackingStartedDay: string;
    backfilledDownloads: number;
    dailyDownloads: Array<{
      day: string;
      downloads: number;
    }>;
    downloadsByMinecraftVersion: Array<{
      version: string;
      downloads: number;
      buildCount: number;
    }>;
  }

  const accentColor = "#24e3bb";
  const secondaryAccentColor = "#30c8ff";

  const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  const axisDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const axisTimeFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let { pluginId = 20070 }: Props = $props();

  let response = $state<CanvasBStatsResponse | null>(null);
  let downloadsStats = $state<DownloadsStatsResponse | null>(null);
  let loading = $state(true);
  let errorMessage = $state<string | null>(null);
  let downloadsError = $state<string | null>(null);

  let serversRange = $state<TimeRangeKey>("1m");
  let playersRange = $state<TimeRangeKey>("1m");

  function formatCount(value: number): string {
    return numberFormatter.format(Math.round(value));
  }

  function parseDayToTimestamp(day: string) {
    return Date.parse(`${day}T00:00:00Z`);
  }

  function formatUtcDay(day: string) {
    const parsed = new Date(`${day}T00:00:00Z`);

    if (Number.isNaN(parsed.getTime())) {
      return day;
    }

    return fullDateFormatter.format(parsed);
  }

  function collapsePieSlices(
    points: BStatsPiePoint[],
    visibleSliceCount = 12
  ): BStatsPiePoint[] {
    const sortedPoints = [...points].sort((a, b) => b.y - a.y);

    if (sortedPoints.length <= visibleSliceCount) {
      return sortedPoints;
    }

    const primarySlices = sortedPoints.slice(0, visibleSliceCount - 1);
    const otherTotal = sortedPoints
      .slice(visibleSliceCount - 1)
      .reduce((sum, point) => sum + point.y, 0);

    return [...primarySlices, { name: "Other", y: otherTotal }];
  }

  function filterLinePoints(
    points: BStatsLinePoint[],
    range: TimeRangeKey
  ): BStatsLinePoint[] {
    if (points.length === 0) {
      return [];
    }

    const option = TIME_RANGE_OPTIONS.find((value) => value.key === range);

    if (!option || option.ms === null) {
      return points;
    }

    const latestTimestamp = points[points.length - 1][0];
    const minimumTimestamp = latestTimestamp - option.ms;

    return points.filter(([timestamp]) => timestamp >= minimumTimestamp);
  }

  function makeLineChartOption(
    points: BStatsLinePoint[],
    lineName: string,
    color: string
  ): EChartsCoreOption {
    return {
      animation: true,
      animationDuration: 400,
      textStyle: {
        fontFamily: "Geist Sans",
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(7, 15, 31, 0.95)",
        borderColor: "#284062",
        borderWidth: 1,
        textStyle: {
          color: "#d8e6ff",
          fontSize: 12,
        },
        valueFormatter: (value) => formatCount(Number(value)),
        formatter: (value) => {
          if (!Array.isArray(value) || value.length === 0) {
            return "";
          }

          const firstPoint = value[0];
          const rawTimestamp = Number(firstPoint.axisValue);
          const timestamp = Number.isFinite(rawTimestamp)
            ? axisTimeFormatter.format(new Date(rawTimestamp))
            : "-";
          const valueNumber = Number(firstPoint.value?.[1] ?? firstPoint.value);

          return `${timestamp}<br/>${lineName}: ${formatCount(valueNumber)}`;
        },
      },
      grid: {
        left: 52,
        right: 20,
        top: 24,
        bottom: 64,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: "#2c3f60",
          },
        },
        axisLabel: {
          color: "#8da2c4",
          formatter: (value: number) =>
            axisDateFormatter.format(new Date(value)),
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#8da2c4",
          formatter: (value: number) => formatCount(value),
        },
        splitLine: {
          lineStyle: {
            color: "rgba(108, 131, 163, 0.14)",
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
          zoomLock: false,
          moveOnMouseWheel: true,
          preventDefaultMouseMove: true,
        },
        {
          type: "slider",
          bottom: 16,
          height: 20,
          backgroundColor: "rgba(12, 26, 47, 0.8)",
          fillerColor: "rgba(36, 227, 187, 0.24)",
          borderColor: "#2a405f",
          handleStyle: {
            color: "#2ce4be",
            borderColor: "#23c29f",
          },
          textStyle: {
            color: "#7f95b5",
          },
        },
      ],
      series: [
        {
          name: lineName,
          type: "line",
          data: points,
          showSymbol: false,
          smooth: 0.25,
          sampling: "lttb",
          lineStyle: {
            width: 2,
            color,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(36, 227, 187, 0.28)",
                },
                {
                  offset: 1,
                  color: "rgba(36, 227, 187, 0.02)",
                },
              ],
            },
          },
        },
      ],
    };
  }

  function makePieChartOption(points: BStatsPiePoint[]): EChartsCoreOption {
    const collapsedPoints = collapsePieSlices(points);
    const chartData = collapsedPoints.map((point) => ({
      name: point.name,
      value: point.y,
    }));

    return {
      animation: true,
      animationDuration: 450,
      textStyle: {
        fontFamily: "Geist Sans",
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(7, 15, 31, 0.95)",
        borderColor: "#284062",
        borderWidth: 1,
        textStyle: {
          color: "#d8e6ff",
          fontSize: 12,
        },
        formatter: (value) => {
          const name = String((value as { name?: unknown }).name ?? "Unknown");
          const count = Number((value as { value?: unknown }).value ?? 0);
          const percent = Number((value as { percent?: unknown }).percent ?? 0);
          return `${name}: ${formatCount(count)} (${percent.toFixed(1)}%)`;
        },
      },
      color: [
        "#23e5be",
        "#2f8bff",
        "#f59e0b",
        "#ec4899",
        "#8b5cf6",
        "#ef4444",
        "#14b8a6",
        "#f97316",
        "#6366f1",
        "#22c55e",
        "#06b6d4",
        "#d946ef",
      ],
      series: [
        {
          type: "pie",
          radius: "74%",
          center: ["50%", "56%"],
          minAngle: 2,
          avoidLabelOverlap: true,
          data: chartData,
          itemStyle: {
            borderColor: "#0f1b32",
            borderWidth: 1,
          },
          label: {
            color: "#a8bddc",
            fontSize: 10,
            formatter: (value) => {
              const name = String((value as { name?: unknown }).name ?? "");
              const percent = Number(
                (value as { percent?: unknown }).percent ?? 0
              );
              return `${name} ${percent.toFixed(1)}%`;
            },
          },
          labelLine: {
            length: 10,
            length2: 6,
            lineStyle: {
              color: "#627a9f",
            },
          },
          emphasis: {
            scale: true,
            scaleSize: 6,
          },
        },
      ],
    };
  }

  function extractMinecraftVersion(rawLabel: string) {
    const trimmedLabel = rawLabel.trim();
    const match = trimmedLabel.match(/\b1\.\d+(?:\.\d+)?\b/);

    if (match) {
      return match[0];
    }

    return trimmedLabel || "Unknown";
  }

  function aggregateMinecraftVersions(points: BStatsPiePoint[]) {
    const totals: Record<string, number> = {};

    for (const point of points) {
      const version = extractMinecraftVersion(point.name);
      totals[version] = (totals[version] ?? 0) + point.y;
    }

    return Object.entries(totals)
      .map(([name, y]) => ({ name, y }))
      .sort((a, b) => b.y - a.y);
  }

  async function loadData() {
    loading = true;
    errorMessage = null;

    try {
      const statsResponse = await fetch(`/api/v2/bstats/${pluginId}?full=true`);

      if (!statsResponse.ok) {
        const errorPayload = (await statsResponse.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(errorPayload?.message ?? "Failed to fetch bStats data");
      }

      const payload = (await statsResponse.json()) as CanvasBStatsResponse;
      response = payload;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load bStats data from the API";
      errorMessage = message;
    } finally {
      loading = false;
    }
  }

  async function loadDownloadsData() {
    downloadsError = null;

    try {
      const downloadsResponse = await fetch(
        "/api/v2/downloads/stats?project=canvas&days=180"
      );

      if (!downloadsResponse.ok) {
        const errorPayload = (await downloadsResponse
          .json()
          .catch(() => null)) as { error?: string } | null;
        throw new Error(
          errorPayload?.error ?? "Failed to fetch download stats"
        );
      }

      downloadsStats =
        (await downloadsResponse.json()) as DownloadsStatsResponse;
    } catch (error) {
      downloadsError =
        error instanceof Error
          ? error.message
          : "Failed to fetch download stats";
    }
  }

  const serversOption = $derived.by(() => {
    const points = filterLinePoints(
      response?.charts.servers ?? [],
      serversRange
    );
    return makeLineChartOption(points, "Servers", accentColor);
  });

  const playersOption = $derived.by(() => {
    const points = filterLinePoints(
      response?.charts.players ?? [],
      playersRange
    );
    return makeLineChartOption(points, "Players", secondaryAccentColor);
  });

  const downloadsByDateOption = $derived.by(() => {
    const points: BStatsLinePoint[] = (downloadsStats?.dailyDownloads ?? [])
      .map((point) => [parseDayToTimestamp(point.day), point.downloads])
      .filter(
        (point): point is BStatsLinePoint =>
          Number.isFinite(point[0]) && Number.isFinite(point[1])
      );

    return makeLineChartOption(points, "Downloads", "#f59e0b");
  });

  const downloadsByVersionOption = $derived.by(() => {
    const points: BStatsPiePoint[] =
      downloadsStats?.downloadsByMinecraftVersion.map((point) => ({
        name: point.version,
        y: point.downloads,
      })) ?? [];

    return makePieChartOption(points);
  });

  const bstatsMinecraftVersionOption = $derived.by(() =>
    makePieChartOption(
      aggregateMinecraftVersions(response?.charts.canvasVersion ?? [])
    )
  );

  onMount(() => {
    void Promise.all([loadData(), loadDownloadsData()]);
  });
</script>

<section class="bstats-shell">
  <div class="bstats-bg-orb bstats-bg-orb-top"></div>
  <div class="bstats-bg-orb bstats-bg-orb-bottom"></div>

  <header class="hero">
    <p class="hero-tag">Server Implementation</p>
    <h1 class="hero-title">{response?.plugin.name ?? "Canvas"}</h1>
    <p class="hero-author">
      by
      <a
        href="https://bstats.org/author/Dueris"
        target="_blank"
        rel="noreferrer noopener">{response?.plugin.owner ?? "Dueris"}</a
      >
    </p>

    <div class="summary-grid">
      <article class="summary-card" use:hoverScale={"small"}>
        <p class="summary-label">SERVERS</p>
        <p class="summary-value">
          {response ? formatCount(response.summary.servers.current) : "--"}
        </p>
        <p class="summary-record">
          {response ? formatCount(response.summary.servers.record) : "--"}
          RECORD
        </p>
      </article>

      <article class="summary-card" use:hoverScale={"small"}>
        <p class="summary-label">PLAYERS</p>
        <p class="summary-value">
          {response ? formatCount(response.summary.players.current) : "--"}
        </p>
        <p class="summary-record">
          {response ? formatCount(response.summary.players.record) : "--"}
          RECORD
        </p>
      </article>

      <article class="summary-card" use:hoverScale={"small"}>
        <p class="summary-label">DOWNLOADS</p>
        <p class="summary-value">
          {downloadsStats ? formatCount(downloadsStats.totalDownloads) : "--"}
        </p>
        <p class="summary-record">TOTAL</p>
      </article>
    </div>

    <p class="counter-note">
      Downloads counter started on {downloadsStats
        ? formatUtcDay(downloadsStats.trackingStartedDay)
        : "Apr 6, 2026"}.
    </p>
  </header>

  <section class="charts-section">
    <h2>Charts</h2>
    <p class="charts-meta">
      Data updates every 30 minutes, on the hour and half hour.
    </p>

    {#if loading}
      <div class="state-card">Loading live bStats data...</div>
    {:else if errorMessage}
      <div class="state-card state-card-error">
        <p>Failed to load bStats data.</p>
        <p>{errorMessage}</p>
        <button class="action-button" onclick={() => void loadData()}
          >Retry</button
        >
      </div>
    {:else if response}
      <div class="panel-stack">
        <article class="panel line-panel" use:hoverScale={"small"}>
          <div class="panel-header">
            <h3>Servers using Canvas</h3>
          </div>

          <div class="range-row">
            {#each TIME_RANGE_OPTIONS as range (range.key)}
              <button
                class={`range-pill ${serversRange === range.key ? "range-pill-active" : ""}`}
                onclick={() => (serversRange = range.key)}
              >
                {range.label}
              </button>
            {/each}
          </div>

          <EChart option={serversOption} class="line-chart" />
        </article>

        <article class="panel line-panel" use:hoverScale={"small"}>
          <div class="panel-header">
            <h3>Players using Canvas</h3>
          </div>

          <div class="range-row">
            {#each TIME_RANGE_OPTIONS as range (range.key)}
              <button
                class={`range-pill ${playersRange === range.key ? "range-pill-active" : ""}`}
                onclick={() => (playersRange = range.key)}
              >
                {range.label}
              </button>
            {/each}
          </div>

          <EChart option={playersOption} class="line-chart" />
        </article>

        <article class="panel line-panel" use:hoverScale={"small"}>
          <div class="panel-header">
            <h3>Downloads by Date</h3>
            <span class="panel-meta"
              >Since {downloadsStats
                ? formatUtcDay(downloadsStats.trackingStartedDay)
                : "Apr 6, 2026"}</span
            >
          </div>

          {#if downloadsError}
            <p class="chart-state-inline">{downloadsError}</p>
          {:else}
            <EChart option={downloadsByDateOption} class="line-chart" />
          {/if}
        </article>

        <div class="panel-grid-two">
          <article class="panel pie-panel" use:hoverScale={"small"}>
            <h3>bStats Minecraft Version (Server Share)</h3>
            <EChart option={bstatsMinecraftVersionOption} class="pie-chart" />
          </article>

          <article class="panel pie-panel" use:hoverScale={"small"}>
            <h3>Downloads by Minecraft Version</h3>

            {#if downloadsError}
              <p class="chart-state-inline">{downloadsError}</p>
            {:else}
              <EChart option={downloadsByVersionOption} class="pie-chart" />
            {/if}
          </article>
        </div>
      </div>
    {/if}
  </section>
</section>

<style>
  .bstats-shell {
    position: relative;
    max-width: 1080px;
    margin: 0 auto;
    padding: 2.5rem 1rem 4rem;
    color: #d9e5fb;
  }

  .bstats-bg-orb {
    position: absolute;
    pointer-events: none;
    filter: blur(65px);
    opacity: 0.35;
    z-index: -1;
  }

  .bstats-bg-orb-top {
    width: 340px;
    height: 340px;
    top: 40px;
    left: -120px;
    background: radial-gradient(circle, #13b897 0%, transparent 72%);
  }

  .bstats-bg-orb-bottom {
    width: 380px;
    height: 380px;
    right: -160px;
    bottom: 180px;
    background: radial-gradient(circle, #3144a9 0%, transparent 70%);
  }

  .hero {
    padding: 2.5rem 0 1.5rem;
  }

  .counter-note {
    color: #9bb0cf;
    font-size: 0.84rem;
    line-height: 1.45;
    border: 1px solid rgba(46, 69, 102, 0.75);
    background: rgba(13, 24, 44, 0.84);
    border-radius: 10px;
    padding: 0.62rem 0.8rem;
    margin-top: 0.85rem;
  }

  .hero-tag {
    display: inline-flex;
    border-radius: 999px;
    padding: 0.25rem 0.65rem;
    background: rgba(34, 48, 76, 0.85);
    color: #9fb6da;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border: 1px solid rgba(73, 92, 126, 0.7);
  }

  .hero-title {
    margin-top: 0.65rem;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #f2f7ff;
    letter-spacing: -0.02em;
  }

  .hero-author {
    margin-top: 0.3rem;
    color: #89a4c8;
    font-size: 0.95rem;
  }

  .hero-author a {
    color: #1ce5bc;
  }

  .summary-grid {
    margin-top: 1.3rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .summary-card {
    border-radius: 12px;
    padding: 1rem 1.1rem;
    border: 1px solid #1f2e49;
    background: linear-gradient(
      180deg,
      rgba(17, 30, 53, 0.96),
      rgba(10, 20, 37, 0.96)
    );
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.33);
  }

  .summary-label {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #9bb2d4;
    font-weight: 600;
  }

  .summary-value {
    margin-top: 0.35rem;
    font-size: 2rem;
    line-height: 1;
    font-weight: 700;
    color: #f2f7ff;
    letter-spacing: -0.01em;
  }

  .summary-record {
    margin-top: 0.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.07em;
    color: #6f87ab;
    text-transform: uppercase;
    font-weight: 600;
  }

  .charts-section {
    margin-top: 1.6rem;
  }

  .charts-section h2 {
    font-size: 2rem;
    letter-spacing: -0.02em;
    color: #f0f6ff;
  }

  .charts-meta {
    margin-top: 0.4rem;
    color: #8ea6c8;
    font-size: 0.9rem;
  }

  .panel-stack {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
  }

  .panel {
    border-radius: 12px;
    border: 1px solid #1f2d47;
    background: linear-gradient(
      180deg,
      rgba(15, 27, 48, 0.98),
      rgba(9, 18, 34, 0.98)
    );
    box-shadow: 0 18px 40px rgba(2, 8, 22, 0.45);
    padding: 0.9rem 1rem 1rem;
  }

  .panel h3 {
    color: #e7f0ff;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;
  }

  .panel-meta {
    color: #8fa3c2;
    font-size: 0.74rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .line-panel {
    overflow: hidden;
  }

  :global(.line-chart) {
    width: 100%;
    height: 330px;
  }

  :global(.pie-chart) {
    width: 100%;
    height: 268px;
  }

  .pie-panel {
    max-width: 560px;
  }

  .panel-grid-two {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .chart-state-inline {
    color: #93a9ca;
    font-size: 0.86rem;
    padding: 1rem 0.2rem 0.2rem;
  }

  .range-row {
    margin-top: 0.7rem;
    margin-bottom: 0.45rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .range-pill {
    border: 1px solid #304969;
    border-radius: 8px;
    padding: 0.22rem 0.55rem;
    font-size: 0.72rem;
    color: #8ba2c4;
    background: rgba(18, 31, 52, 0.88);
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .range-pill:hover {
    border-color: #426188;
    color: #d6e5fe;
  }

  .range-pill-active {
    border-color: #25dcb7;
    color: #f2fffd;
    background: rgba(25, 159, 132, 0.2);
  }

  .action-button {
    border-radius: 8px;
    border: 1px solid #304969;
    background: rgba(18, 31, 52, 0.88);
    color: #9db4d6;
    padding: 0.3rem 0.62rem;
    font-size: 0.72rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
  }

  .action-button:hover:enabled {
    border-color: #4a678f;
    color: #e7f0ff;
  }

  .action-button:disabled {
    opacity: 0.65;
    cursor: default;
  }

  .state-card {
    margin-top: 1rem;
    border-radius: 12px;
    border: 1px solid #243555;
    background: rgba(10, 20, 37, 0.96);
    padding: 1rem;
    color: #98afd2;
    display: grid;
    gap: 0.6rem;
  }

  .state-card-error {
    border-color: rgba(226, 84, 93, 0.6);
  }

  @media (max-width: 900px) {
    .summary-grid {
      grid-template-columns: 1fr;
    }

    .panel-grid-two {
      grid-template-columns: 1fr;
    }

    .pie-panel {
      max-width: none;
    }
  }

  @media (max-width: 640px) {
    .bstats-shell {
      padding-inline: 0.7rem;
    }

    .hero {
      padding-top: 2rem;
    }

    .summary-value {
      font-size: 1.7rem;
    }

    :global(.line-chart) {
      height: 290px;
    }

    :global(.pie-chart) {
      height: 238px;
    }
  }
</style>
