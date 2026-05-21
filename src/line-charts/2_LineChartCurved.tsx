import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const values = [20, 26, 22, 35, 31, 44, 40, 49];
const coords = values.map((v, i) => ({ x: (i / (values.length - 1)) * 100, y: 100 - v * 1.65 }));
const path = `M ${coords[0].x} ${coords[0].y} C 18 52, 24 70, 34 48 S 62 35, 72 34 S 88 21, 100 ${coords.at(-1)?.y}`;

export function Live2_LineChartCurved() {
  return (
    <div className={amerChartFrame}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="#7dd3fc" strokeWidth="2.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        {coords.map((point, index) => (
          <ClientTooltip key={index}>
            <TooltipTrigger><circle cx={point.x} cy={point.y} r="2.5" fill="#86efac" /></TooltipTrigger>
            <TooltipContent><div className={amerTooltipLabel}>Trend</div><div className={amerTooltipValue}>{values[index]}</div></TooltipContent>
          </ClientTooltip>
        ))}
      </svg>
    </div>
  );
}
