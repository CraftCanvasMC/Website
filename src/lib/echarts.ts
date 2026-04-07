import { LineChart, PieChart } from "echarts/charts";
import {
  DataZoomComponent,
  GridComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  LineChart,
  PieChart,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

export { echarts };
