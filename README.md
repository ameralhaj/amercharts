# Amercharts

A lightweight and easy-to-use charting library built with D3.js and Tailwind CSS.  
Just **copy-paste the code** and install the required dependencies to get started.

---

## Installation

Each chart component uses D3.js internally. Install it in your project:

```bash
npm install d3
```

If you're using TypeScript, install the types as well:

```bash
npm install --save-dev @types/d3
```

> **Tailwind CSS** is also required — all components use Tailwind utility classes.  
> Make sure Tailwind is set up in your project.

---

## Usage

Copy-paste any chart component source file into your project.  
Each file is self-contained — just import it and render:

```tsx
import { Live1_BarChartHorizontal_DIV } from "./path/to/1_BarChartHorizontal_DIV";

export function Dashboard() {
  return (
    <div className="grid gap-6">
      <Live1_BarChartHorizontal_DIV />
    </div>
  );
}
```

No extra config, no heavy dependencies. Works with JavaScript and TypeScript.

---

## All Components

### Bar Charts

| Component | File |
|-----------|------|
| `Live1_BarChartHorizontal_DIV` | `src/bar-charts/1_BarChartHorizontal_DIV.tsx` |
| `Live2_BarChartHorizontalLogo_DIV` | `src/bar-charts/2_BarChartHorizontalLogo_DIV.tsx` |
| `Live3_BarChartGradient_DIV` | `src/bar-charts/3_BarChartGradient_DIV.tsx` |
| `Live4_BarChartBreakdown` | `src/bar-charts/4_BarChartBreakdown.tsx` |
| `Live5_BarChartThinBreakdown` | `src/bar-charts/5_BarChartThinBreakdown.tsx` |

### Line Charts

| Component | File |
|-----------|------|
| `Live1_LineChart` | `src/line-charts/1_LineChart.tsx` |
| `Live2_LineChartCurved` | `src/line-charts/2_LineChartCurved.tsx` |
| `Live3_LineChartMultiple` | `src/line-charts/3_LineChartMultiple.tsx` |

### Area Charts

| Component | File |
|-----------|------|
| `Live1_AreaChart` | `src/area-charts/1_AreaChart.tsx` |
| `Live2_AreaChartFull` | `src/area-charts/2_AreaChartFull.tsx` |

### Pie & Donut

| Component | File |
|-----------|------|
| `Live1_PieChart` | `src/pie-charts/1_PieChart.tsx` |
| `Live4_DonutChart` | `src/pie-charts/4_DonutChart.tsx` |

### Other

| Component | File |
|-----------|------|
| `Live6_HeatmapChart` | `src/other-charts/6_HeatmapChart.tsx` |
| `Live8_CandlestickChart` | `src/other-charts/8_CandlestickChart.tsx` |
| `Live1_ScatterChart` | `src/scatter-charts/1_ScatterChart.tsx` |

---

## Helpers

Some components import shared helpers. If you see imports from `"../helpers/"`, grab those files too:

| File | Exports |
|------|---------|
| `src/helpers/AmerChartTheme.ts` | `amerPalette`, `amerSeries`, `amerGradients`, `amerChartFrame`, `amerAxisLabel`, `amerGridLine`, `amerTooltipValue`, `amerTooltipLabel` |
| `src/helpers/ClientTooltip.tsx` | `ClientTooltip`, `TooltipTrigger`, `TooltipContent` |

---

## Customizing the Charts

All components contain hardcoded sample data. Replace the `data` array with your own values to adapt any chart to your use case.

---

## Pro

Pro unlocks 96+ chart components: advanced bars, market charts, distribution views, network graphs, timeline charts, radial charts, and more — with lifetime updates.

→ [amercharts.com](https://amercharts.com)

## License

MIT — Free package. See [LICENSE](LICENSE).
