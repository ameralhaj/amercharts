import React from "react";
import { pie, arc, PieArcDatum } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerGradients, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

type DataItem = {
  name: string;
  value: number;
};

const data: DataItem[] = [
  {
    name: "Rent",
    value: 731,
  },
  {
    name: "Food",
    value: 631,
  },
  {
    name: "Household",
    value: 331,
  },
  {
    name: "Transportation",
    value: 232,
  },
  {
    name: "Entertainment",
    value: 101,
  },
  {
    name: "Other",
    value: 42,
  },
];

export function Live1_PieChart() {
  // Chart dimensions
  const radius = 180;
  const gap = 0.02; // Gap between slices
  // Pie layout and arc generator
  const pieLayout = pie<DataItem>()
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  const arcGenerator = arc<PieArcDatum<DataItem>>()
    .innerRadius(0)
    .outerRadius(radius)
    .cornerRadius(10);

  const arcs = pieLayout(data);

  return (
    <div className={`${amerChartFrame} flex items-center justify-center overflow-visible`}>
      <div className="relative mx-auto size-56">
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className="h-full w-full overflow-visible drop-shadow-sm"
        >
          <defs>
            {amerGradients.map((gradient, i) => (
              <linearGradient key={i} id={`amer-pie-gradient-${i}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor={gradient[0]} />
                <stop offset="55%" stopColor={gradient[1]} />
                <stop offset="100%" stopColor={gradient[2]} />
              </linearGradient>
            ))}
          </defs>
          {/* Sectors with Gradient Fill */}
          {arcs.map((d: PieArcDatum<DataItem>, i) => (
            <ClientTooltip key={i}>
              <TooltipTrigger>
                <path
                  key={i}
                  fill={`url(#amer-pie-gradient-${i % amerGradients.length})`}
                  stroke="#ffffff88"
                  strokeWidth={4}
                  d={arcGenerator(d)!}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className={amerTooltipLabel}>{d.data.name}</div>
                <div className={amerTooltipValue}>{d.data.value.toLocaleString("en-US")}</div>
              </TooltipContent>
            </ClientTooltip>
          ))}
        </svg>
      </div>
    </div>
  );
}
