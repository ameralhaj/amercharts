import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";
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
  { key: "Technology", value: 38.1 },
  { key: "Financials", value: 25.3 },
  { key: "Energy", value: 23.1 },
  { key: "Cyclical", value: 19.5 },
  { key: "Defensive", value: 14.7 },
  { key: "Utilities", value: 5.8 },
].toSorted((a, b) => b.value - a.value);

export function Live1_BarChartHorizontal_DIV() {
  // Scales
  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.175);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([0, 100]);

  const longestWord = max(data.map((d) => d.key.length)) || 1;
  const leftMargin = Math.max(78, longestWord * 8 + 18);
  return (
    <div
      className={amerChartFrame}
      style={
        {
          "--marginTop": "12px",
          "--marginRight": "14px",
          "--marginBottom": "28px",
          "--marginLeft": `${leftMargin}px`,
        } as CSSProperties
      }
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0
          z-10
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {/* Bars with Rounded Right Corners */}
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();

          return (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <div
                  key={index}
                  style={{
                    left: "0",
                    top: `${yScale(d.key)}%`,
                    width: `${barWidth}%`,
                    height: `${barHeight}%`,
                    borderRadius: "0 7px 7px 0", // Rounded right corners
                  }}
                  className="absolute bg-gradient-to-r from-sky-200 via-blue-300 to-violet-300 shadow-sm shadow-sky-300/30 transition-all duration-300 hover:saturate-125"
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex gap-2.5 items-center">
                  <div className="h-8 w-1 rounded-full" style={{ background: amerPalette.blue }}></div>
                  <div>
                    <div className={amerTooltipLabel}>{d.key}</div>
                    <div className={amerTooltipValue}>{d.value}%</div>
                  </div>
                </div>
              </TooltipContent>
            </ClientTooltip>
          );
        })}
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {xScale
            .ticks(8)
            .map(xScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(${xScale(+active)},0)`}
                className={amerGridLine}
                key={i}
              >
                <line
                  y1={0}
                  y2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
        </svg>
        {/* X Axis (Values) */}
        {xScale.ticks(4).map((value, i) => (
          <div
            key={i}
            style={{
              left: `${xScale(value)}%`,
              top: "100%",
            }}
            className={`${amerAxisLabel} -translate-x-1/2`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Y Axis (Letters) */}
      <div
        className="
          absolute left-0 top-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible"
      >
        {data.map((entry, i) => (
          <span
            key={i}
            style={{
              left: "-14px",
              top: `${yScale(entry.key)! + yScale.bandwidth() / 2}%`,
            }}
            className={`${amerAxisLabel} block w-full -translate-y-1/2 truncate pr-3 text-right leading-none`}
          >
            {entry.key}
          </span>
        ))}
      </div>
    </div>
  );
}
