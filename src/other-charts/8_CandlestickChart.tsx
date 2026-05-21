import { CSSProperties } from "react";
import { scaleBand, scaleLinear, min, max } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import {
  amerAxisLabel,
  amerChartFrame,
  amerGridLine,
  amerPalette,
  amerTooltipLabel,
  amerTooltipValue,
} from "../helpers/AmerChartTheme";

const data = [
  { date: "Mon", open: 104, high: 112, low: 101, close: 110 },
  { date: "Tue", open: 110, high: 116, low: 108, close: 113 },
  { date: "Wed", open: 113, high: 115, low: 105, close: 107 },
  { date: "Thu", open: 107, high: 118, low: 106, close: 116 },
  { date: "Fri", open: 116, high: 121, low: 112, close: 114 },
  { date: "Sat", open: 114, high: 124, low: 113, close: 122 },
  { date: "Sun", open: 122, high: 128, low: 118, close: 120 },
];

export function Live8_CandlestickChart() {
  const xScale = scaleBand()
    .domain(data.map((d) => d.date))
    .range([0, 100])
    .padding(0.36);

  const yScale = scaleLinear()
    .domain([min(data.map((d) => d.low)) ?? 0, max(data.map((d) => d.high)) ?? 0])
    .nice()
    .range([100, 0]);

  return (
    <div
      className={amerChartFrame}
      style={
        {
          "--marginTop": "4px",
          "--marginRight": "8px",
          "--marginBottom": "28px",
          "--marginLeft": "34px",
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 h-[calc(100%-var(--marginTop)-var(--marginBottom))] w-[var(--marginLeft)] translate-y-[var(--marginTop)]">
        {yScale.ticks(4).map((value) => (
          <div
            key={value}
            style={{ top: `${yScale(value)}%` }}
            className={`${amerAxisLabel} w-full -translate-y-1/2 pr-2 text-right`}
          >
            {value}
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))] translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)] overflow-visible"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
          {yScale.ticks(4).map((tick) => (
            <g key={tick} transform={`translate(0,${yScale(tick)})`} className={amerGridLine}>
              <line x1={0} x2={100} stroke="currentColor" strokeDasharray="6,5" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
            </g>
          ))}

          {data.map((d) => {
            const up = d.close >= d.open;
            const x = (xScale(d.date) ?? 0) + xScale.bandwidth() / 2;
            const bodyTop = yScale(Math.max(d.open, d.close));
            const bodyHeight = Math.abs(yScale(d.open) - yScale(d.close));
            const color = up ? amerPalette.mint : amerPalette.coral;

            return (
              <ClientTooltip key={d.date}>
                <TooltipTrigger>
                  <g>
                    <line
                      x1={x}
                      x2={x}
                      y1={yScale(d.high)}
                      y2={yScale(d.low)}
                      stroke={color}
                      strokeWidth={1.4}
                      vectorEffect="non-scaling-stroke"
                    />
                    <rect
                      x={(xScale(d.date) ?? 0)}
                      y={bodyTop}
                      width={xScale.bandwidth()}
                      height={Math.max(bodyHeight, 2)}
                      rx={1.6}
                      fill={color}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className={amerTooltipLabel}>{d.date}</div>
                  <div className={amerTooltipValue}>O {d.open} / H {d.high} / L {d.low} / C {d.close}</div>
                </TooltipContent>
              </ClientTooltip>
            );
          })}
        </svg>

        {data.map((d) => (
          <div
            key={d.date}
            style={{ left: `${(xScale(d.date) ?? 0) + xScale.bandwidth() / 2}%`, top: "100%" }}
            className={`${amerAxisLabel} -translate-x-1/2 translate-y-2`}
          >
            {d.date}
          </div>
        ))}
      </div>
    </div>
  );
}
