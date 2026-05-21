import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const a = [18, 24, 21, 34, 30, 42, 39, 48];
const b = [14, 18, 25, 22, 30, 29, 36, 41];
function makePath(values: number[]) { return values.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (values.length - 1)) * 100} ${100 - v * 1.7}`).join(" "); }

export function Live3_LineChartMultiple() {
  return (
    <div className={amerChartFrame}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <path d={makePath(a)} fill="none" stroke="#7dd3fc" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
        <path d={makePath(b)} fill="none" stroke="#f0abfc" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
        {a.map((value, index) => (
          <ClientTooltip key={index}>
            <TooltipTrigger><circle cx={(index / (a.length - 1)) * 100} cy={100 - value * 1.7} r="2.6" fill="#7dd3fc" /></TooltipTrigger>
            <TooltipContent><div className={amerTooltipLabel}>Series A</div><div className={amerTooltipValue}>{value}</div></TooltipContent>
          </ClientTooltip>
        ))}
      </svg>
    </div>
  );
}
