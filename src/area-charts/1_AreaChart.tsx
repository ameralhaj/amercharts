import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const points = [12, 18, 15, 28, 24, 34, 31, 42, 38, 46];
const path = points.map((value, index) => `${index === 0 ? "M" : "L"} ${(index / (points.length - 1)) * 100} ${100 - value * 1.8}`).join(" ");
const area = `${path} L 100 100 L 0 100 Z`;

export function Live1_AreaChart() {
  return (
    <div className={amerChartFrame}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="amer-area-free" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#7dd3fc" stopOpacity="0.55" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#amer-area-free)" />
        <path d={path} fill="none" stroke="#7dd3fc" strokeWidth="2.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        {points.map((value, index) => (
          <ClientTooltip key={index}>
            <TooltipTrigger>
              <circle cx={(index / (points.length - 1)) * 100} cy={100 - value * 1.8} r="2.5" fill="#8bb7ff" />
            </TooltipTrigger>
            <TooltipContent>
              <div className={amerTooltipLabel}>Point {index + 1}</div>
              <div className={amerTooltipValue}>{value}</div>
            </TooltipContent>
          </ClientTooltip>
        ))}
      </svg>
    </div>
  );
}
