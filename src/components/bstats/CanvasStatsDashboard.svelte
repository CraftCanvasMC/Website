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
  import { t } from "@/lib/i18n";
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
  let themeMode = $state<"light" | "dark">("dark");

  function getThemeModeFromDom(): "light" | "dark" {
    if (typeof document === "undefined") {
      return "dark";
    }

    return document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  }

  function formatCount(value: number): string {
    return numberFormatter.format(Math.round(value));
  }

  function formatTranslation(
    key: string,
    fallback: string,
    replacements?: Record<string, string | number>
  ): string {
    let translated = $t(key, fallback);

    if (!replacements) {
      return translated;
    }

    for (const [name, value] of Object.entries(replacements)) {
      translated = translated.replaceAll(`{${name}}`, String(value));
    }

    return translated;
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
    color: string,
    isLightTheme = false
  ): EChartsCoreOption {
    const tooltipBackgroundColor = isLightTheme
      ? "rgba(255, 255, 255, 0.96)"
      : "rgba(7, 15, 31, 0.95)";
    const tooltipBorderColor = isLightTheme
      ? "rgba(148, 163, 184, 0.7)"
      : "#284062";
    const tooltipTextColor = isLightTheme ? "#0f172a" : "#d8e6ff";
    const axisLineColor = isLightTheme ? "rgba(148, 163, 184, 0.8)" : "#2c3f60";
    const axisLabelColor = isLightTheme ? "#475569" : "#8da2c4";
    const splitLineColor = isLightTheme
      ? "rgba(148, 163, 184, 0.24)"
      : "rgba(108, 131, 163, 0.14)";
    const zoomBackgroundColor = isLightTheme
      ? "rgba(241, 245, 249, 0.92)"
      : "rgba(12, 26, 47, 0.8)";
    const zoomFillerColor = isLightTheme
      ? "rgba(79, 70, 229, 0.2)"
      : "rgba(36, 227, 187, 0.24)";
    const zoomBorderColor = isLightTheme
      ? "rgba(148, 163, 184, 0.82)"
      : "#2a405f";
    const zoomHandleColor = isLightTheme ? "#4f46e5" : "#2ce4be";
    const zoomHandleBorderColor = isLightTheme ? "#4338ca" : "#23c29f";
    const zoomTextColor = isLightTheme ? "#475569" : "#7f95b5";

    return {
      animation: true,
      animationDuration: 400,
      textStyle: {
        fontFamily: "Geist Sans",
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: tooltipBackgroundColor,
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        textStyle: {
          color: tooltipTextColor,
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
            color: axisLineColor,
          },
        },
        axisLabel: {
          color: axisLabelColor,
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
          color: axisLabelColor,
          formatter: (value: number) => formatCount(value),
        },
        splitLine: {
          lineStyle: {
            color: splitLineColor,
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
          backgroundColor: zoomBackgroundColor,
          fillerColor: zoomFillerColor,
          borderColor: zoomBorderColor,
          handleStyle: {
            color: zoomHandleColor,
            borderColor: zoomHandleBorderColor,
          },
          textStyle: {
            color: zoomTextColor,
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

  function makePieChartOption(
    points: BStatsPiePoint[],
    isLightTheme = false
  ): EChartsCoreOption {
    const collapsedPoints = collapsePieSlices(points);
    const chartData = collapsedPoints.map((point) => ({
      name: point.name,
      value: point.y,
    }));

    const tooltipBackgroundColor = isLightTheme
      ? "rgba(255, 255, 255, 0.96)"
      : "rgba(7, 15, 31, 0.95)";
    const tooltipBorderColor = isLightTheme
      ? "rgba(148, 163, 184, 0.7)"
      : "#284062";
    const tooltipTextColor = isLightTheme ? "#0f172a" : "#d8e6ff";
    const sliceBorderColor = isLightTheme ? "#e2e8f0" : "#0f1b32";
    const labelColor = isLightTheme ? "#334155" : "#a8bddc";
    const labelLineColor = isLightTheme ? "#94a3b8" : "#627a9f";

    return {
      animation: true,
      animationDuration: 450,
      textStyle: {
        fontFamily: "Geist Sans",
      },
      tooltip: {
        trigger: "item",
        backgroundColor: tooltipBackgroundColor,
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        textStyle: {
          color: tooltipTextColor,
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
            borderColor: sliceBorderColor,
            borderWidth: 1,
          },
          label: {
            color: labelColor,
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
              color: labelLineColor,
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
    return makeLineChartOption(
      points,
      $t("stats.series.servers", "Servers"),
      accentColor,
      themeMode === "light"
    );
  });

  const playersOption = $derived.by(() => {
    const points = filterLinePoints(
      response?.charts.players ?? [],
      playersRange
    );
    return makeLineChartOption(
      points,
      $t("stats.series.players", "Players"),
      secondaryAccentColor,
      themeMode === "light"
    );
  });

  const downloadsByDateOption = $derived.by(() => {
    const points: BStatsLinePoint[] = (downloadsStats?.dailyDownloads ?? [])
      .map((point) => [parseDayToTimestamp(point.day), point.downloads])
      .filter(
        (point): point is BStatsLinePoint =>
          Number.isFinite(point[0]) && Number.isFinite(point[1])
      );

    return makeLineChartOption(
      points,
      $t("stats.series.downloads", "Downloads"),
      "#f59e0b",
      themeMode === "light"
    );
  });

  const downloadsByVersionOption = $derived.by(() => {
    const points: BStatsPiePoint[] =
      downloadsStats?.downloadsByMinecraftVersion.map((point) => ({
        name: point.version,
        y: point.downloads,
      })) ?? [];

    return makePieChartOption(points, themeMode === "light");
  });

  const bstatsMinecraftVersionOption = $derived.by(() =>
    makePieChartOption(
      aggregateMinecraftVersions(response?.charts.canvasVersion ?? []),
      themeMode === "light"
    )
  );

  onMount(() => {
    const updateThemeMode = () => {
      themeMode = getThemeModeFromDom();
    };

    updateThemeMode();

    const themeObserver = new MutationObserver(updateThemeMode);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    void Promise.all([loadData(), loadDownloadsData()]);

    return () => {
      themeObserver.disconnect();
    };
  });
</script>

<section class="bstats-shell">
  <div class="bstats-bg-orb bstats-bg-orb-top"></div>
  <div class="bstats-bg-orb bstats-bg-orb-bottom"></div>

  <header class="hero">
    <p class="hero-tag">{$t("stats.heroTag", "Server Implementation")}</p>
    <h1 class="hero-title">{response?.plugin.name ?? "Canvas"}</h1>
    <p class="hero-author">
      {$t("common.by")}
      <a
        href="https://bstats.org/author/Dueris"
        target="_blank"
        rel="noreferrer noopener">{response?.plugin.owner ?? "Dueris"}</a
      >
    </p>

    <div class="summary-grid">
      <article class="summary-card" use:hoverScale={"small"}>
        <p class="summary-label">{$t("stats.cards.servers", "SERVERS")}</p>
        <p class="summary-value">
          {response ? formatCount(response.summary.servers.current) : "--"}
        </p>
        <p class="summary-record">
          {response ? formatCount(response.summary.servers.record) : "--"}
          {$t("stats.cards.record", "RECORD")}
        </p>
      </article>

      <article class="summary-card" use:hoverScale={"small"}>
        <p class="summary-label">{$t("stats.cards.players", "PLAYERS")}</p>
        <p class="summary-value">
          {response ? formatCount(response.summary.players.current) : "--"}
        </p>
        <p class="summary-record">
          {response ? formatCount(response.summary.players.record) : "--"}
          {$t("stats.cards.record", "RECORD")}
        </p>
      </article>

      <article class="summary-card" use:hoverScale={"small"}>
        <p class="summary-label">
          {$t("stats.cards.downloads", "DOWNLOADS")}
        </p>
        <p class="summary-value">
          {downloadsStats ? formatCount(downloadsStats.totalDownloads) : "--"}
        </p>
        <p class="summary-record">{$t("stats.cards.total", "TOTAL")}</p>
      </article>
    </div>

    <p class="counter-note">
      {formatTranslation(
        "stats.counterStartedOn",
        "Downloads counter started on {date}.",
        {
          date: downloadsStats
            ? formatUtcDay(downloadsStats.trackingStartedDay)
            : "Apr 6, 2026",
        }
      )}
    </p>

    <p class="counter-note counter-note-secondary">
      {$t(
        "stats.bstatsDataNote",
        "Everything except downloads data is pulled from bStats."
      )}
    </p>
  </header>

  <section class="charts-section">
    <h2>{$t("stats.chartsTitle", "Charts")}</h2>
    <p class="charts-meta">
      {$t(
        "stats.chartsMeta",
        "Data updates every 30 minutes, on the hour and half hour."
      )}
    </p>

    {#if loading}
      <div class="state-card">
        {$t("stats.loadingLiveData", "Loading live bStats data...")}
      </div>
    {:else if errorMessage}
      <div class="state-card state-card-error">
        <p>{$t("stats.loadFailed", "Failed to load bStats data.")}</p>
        <p>{errorMessage}</p>
        <button class="action-button" onclick={() => void loadData()}
          >{$t("stats.retry", "Retry")}</button
        >
      </div>
    {:else if response}
      <div class="panel-stack">
        <article class="panel line-panel" use:hoverScale={"small"}>
          <div class="panel-header">
            <h3>
              {$t("stats.panels.serversUsingCanvas", "Servers using Canvas")}
            </h3>
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
            <h3>
              {$t("stats.panels.playersUsingCanvas", "Players using Canvas")}
            </h3>
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
            <h3>{$t("stats.panels.downloadsByDate", "Downloads by Date")}</h3>
            <span class="panel-meta"
              >{formatTranslation("stats.since", "Since {date}", {
                date: downloadsStats
                  ? formatUtcDay(downloadsStats.trackingStartedDay)
                  : "Apr 6, 2026",
              })}</span
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
            <h3>
              {$t(
                "stats.panels.bstatsMinecraftVersionServerShare",
                "bStats Minecraft Version (Server Share)"
              )}
            </h3>
            <EChart option={bstatsMinecraftVersionOption} class="pie-chart" />
          </article>

          <article class="panel pie-panel" use:hoverScale={"small"}>
            <h3>
              {$t(
                "stats.panels.downloadsByMinecraftVersion",
                "Downloads by Minecraft Version"
              )}
            </h3>

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

  .counter-note-secondary {
    margin-top: 0.5rem;
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

  :global([data-theme="light"]) .bstats-shell {
    color: #1e293b;
  }

  :global([data-theme="light"]) .bstats-bg-orb {
    opacity: 0.42;
  }

  :global([data-theme="light"]) .bstats-bg-orb-top {
    background: radial-gradient(
      circle,
      rgba(20, 184, 166, 0.45) 0%,
      transparent 74%
    );
  }

  :global([data-theme="light"]) .bstats-bg-orb-bottom {
    background: radial-gradient(
      circle,
      rgba(79, 70, 229, 0.34) 0%,
      transparent 72%
    );
  }

  :global([data-theme="light"]) .counter-note {
    color: #334155;
    border-color: rgba(148, 163, 184, 0.7);
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.08);
  }

  :global([data-theme="light"]) .hero-tag {
    background: rgba(255, 255, 255, 0.7);
    color: #475569;
    border-color: rgba(148, 163, 184, 0.7);
  }

  :global([data-theme="light"]) .hero-title {
    color: #0f172a;
  }

  :global([data-theme="light"]) .hero-author {
    color: #475569;
  }

  :global([data-theme="light"]) .hero-author a {
    color: #4338ca;
  }

  :global([data-theme="light"]) .summary-card {
    border-color: rgba(148, 163, 184, 0.6);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9),
      rgba(248, 250, 252, 0.85)
    );
    box-shadow: 0 16px 34px rgba(79, 70, 229, 0.1);
  }

  :global([data-theme="light"]) .summary-label {
    color: #475569;
  }

  :global([data-theme="light"]) .summary-value {
    color: #0f172a;
  }

  :global([data-theme="light"]) .summary-record {
    color: #64748b;
  }

  :global([data-theme="light"]) .charts-section h2 {
    color: #0f172a;
  }

  :global([data-theme="light"]) .charts-meta {
    color: #475569;
  }

  :global([data-theme="light"]) .panel {
    border-color: rgba(148, 163, 184, 0.6);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.92),
      rgba(241, 245, 249, 0.88)
    );
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.09);
  }

  :global([data-theme="light"]) .panel h3 {
    color: #0f172a;
  }

  :global([data-theme="light"]) .panel-meta {
    color: #475569;
  }

  :global([data-theme="light"]) .chart-state-inline {
    color: #475569;
  }

  :global([data-theme="light"]) .range-pill {
    border-color: rgba(148, 163, 184, 0.75);
    color: #475569;
    background: rgba(241, 245, 249, 0.9);
  }

  :global([data-theme="light"]) .range-pill:hover {
    border-color: rgba(99, 102, 241, 0.7);
    color: #1e293b;
  }

  :global([data-theme="light"]) .range-pill-active {
    border-color: rgba(79, 70, 229, 0.9);
    color: #312e81;
    background: rgba(129, 140, 248, 0.18);
  }

  :global([data-theme="light"]) .action-button {
    border-color: rgba(148, 163, 184, 0.78);
    background: rgba(241, 245, 249, 0.9);
    color: #475569;
  }

  :global([data-theme="light"]) .action-button:hover:enabled {
    border-color: rgba(99, 102, 241, 0.72);
    color: #1e293b;
  }

  :global([data-theme="light"]) .state-card {
    border-color: rgba(148, 163, 184, 0.72);
    background: rgba(255, 255, 255, 0.86);
    color: #334155;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  }

  :global([data-theme="light"]) .state-card-error {
    border-color: rgba(239, 68, 68, 0.58);
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
