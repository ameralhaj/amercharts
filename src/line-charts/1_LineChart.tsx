import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const values = [18, 24, 20, 32, 28, 38, 36, 45];
const path = values.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (values.length - 1)) * 100} ${100 - v * 1.8}`).join(" ");

export function Live1_LineChart() {
  return (
    <div className={amerChartFrame}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="#8bb7ff" strokeWidth="2.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        {values.map((value, index) => (
          <ClientTooltip key={index}>
            <TooltipTrigger>
              <circle cx={(index / (values.length - 1)) * 100} cy={100 - value * 1.8} r="2.8" fill="#c4b5fd" />
            </TooltipTrigger>
            <TooltipContent>
              <div className={amerTooltipLabel}>Value</div>
              <div className={amerTooltipValue}>{value}</div>
            </TooltipContent>
          </ClientTooltip>
        ))}
      </svg>
    </div>
  );
}
