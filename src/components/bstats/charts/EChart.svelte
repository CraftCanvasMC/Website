<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { echarts } from "@/lib/echarts";
  import type { EChartsType, SetOptionOpts } from "echarts";

  type ChartEvents = Record<string, (params: unknown) => void>;

  interface Props {
    option: echarts.EChartsCoreOption;
    class?: string;
    theme?: string | object | null;
    setOptionOptions?: SetOptionOpts;
    events?: ChartEvents;
    onInit?: (chart: EChartsType) => void;
  }

  let {
    option,
    class: className = "",
    theme = null,
    setOptionOptions = {
      notMerge: true,
      lazyUpdate: true,
    },
    events = {},
    onInit,
  }: Props = $props();

  let rootElement: HTMLDivElement | null = null;
  let chart: EChartsType | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let boundEvents: string[] = [];

  function setChartOption() {
    if (!chart) {
      return;
    }

    chart.setOption(option, setOptionOptions);
  }

  function attachEvents() {
    if (!chart) {
      return;
    }

    for (const eventName of boundEvents) {
      chart.off(eventName);
    }

    boundEvents = [];

    for (const [eventName, handler] of Object.entries(events)) {
      chart.on(eventName, handler);
      boundEvents.push(eventName);
    }
  }

  function handleWindowResize() {
    chart?.resize();
  }

  onMount(() => {
    if (!rootElement) {
      return;
    }

    chart = echarts.init(rootElement, theme, {
      renderer: "canvas",
    });

    setChartOption();
    attachEvents();
    onInit?.(chart);

    resizeObserver = new ResizeObserver(() => {
      chart?.resize();
    });

    resizeObserver.observe(rootElement);

    window.addEventListener("resize", handleWindowResize, {
      passive: true,
    });
  });

  $effect(() => {
    option;
    setOptionOptions;

    if (chart) {
      setChartOption();
    }
  });

  $effect(() => {
    events;

    if (chart) {
      attachEvents();
    }
  });

  onDestroy(() => {
    resizeObserver?.disconnect();

    if (chart) {
      for (const eventName of boundEvents) {
        chart.off(eventName);
      }

      chart.dispose();
      chart = null;
    }

    window.removeEventListener("resize", handleWindowResize);
  });
</script>

<div bind:this={rootElement} class={className}></div>
