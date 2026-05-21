import { CSSProperties } from "react";
import { scaleBand, scaleLinear } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerAxisLabel, amerChartFrame, amerPalette, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["09:00", "11:00", "13:00", "15:00", "17:00"];

const data = days.flatMap((day, dayIndex) =>
  hours.map((hour, hourIndex) => ({
    day,
    hour,
    value: Math.round(32 + dayIndex * 8 + hourIndex * 6 + ((dayIndex + hourIndex) % 3) * 12),
  }))
);

export function Live6_HeatmapChart() {
  const xScale = scaleBand().domain(hours).range([0, 100]).padding(0.12);
  const yScale = scaleBand().domain(days).range([0, 100]).padding(0.12);
  const colorScale = scaleLinear<string>()
    .domain([30, 70, 110])
    .range(["#f0f9ff", amerPalette.aqua, amerPalette.blue]);

  return (
    <div
      className={amerChartFrame}
      style={
        {
          "--marginTop": "4px",
          "--marginRight": "8px",
          "--marginBottom": "28px",
          "--marginLeft": "44px",
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))] translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
          {data.map((d) => (
            <ClientTooltip key={`${d.day}-${d.hour}`}>
              <TooltipTrigger>
                <rect
                  x={xScale(d.hour)}
                  y={yScale(d.day)}
                  width={xScale.bandwidth()}
                  height={yScale.bandwidth()}
                  rx={2.5}
                  fill={colorScale(d.value)}
                  className="transition-opacity duration-200 hover:opacity-80"
                  vectorEffect="non-scaling-stroke"
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className={amerTooltipLabel}>{d.day} / {d.hour}</div>
                <div className={amerTooltipValue}>{d.value} active users</div>
              </TooltipContent>
            </ClientTooltip>
          ))}
        </svg>

        {hours.map((hour) => (
          <div
            key={hour}
            style={{ left: `${(xScale(hour) ?? 0) + xScale.bandwidth() / 2}%`, top: "100%" }}
            className={`${amerAxisLabel} -translate-x-1/2 translate-y-2`}
          >
            {hour}
          </div>
        ))}
      </div>

      <div className="h-[calc(100%-var(--marginTop)-var(--marginBottom))] w-[var(--marginLeft)] translate-y-[var(--marginTop)]">
        {days.map((day) => (
          <div
            key={day}
            style={{ top: `${(yScale(day) ?? 0) + yScale.bandwidth() / 2}%` }}
            className={`${amerAxisLabel} w-full -translate-y-1/2 pr-3 text-right`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
