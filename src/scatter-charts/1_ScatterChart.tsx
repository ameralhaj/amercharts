import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const data = [
  { x: 12, y: 70, label: "A" }, { x: 22, y: 58, label: "B" }, { x: 36, y: 66, label: "C" },
  { x: 48, y: 44, label: "D" }, { x: 64, y: 54, label: "E" }, { x: 78, y: 32, label: "F" },
  { x: 88, y: 42, label: "G" },
];

export function Live1_ScatterChart() {
  return (
    <div className={amerChartFrame}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        {data.map((d) => (
          <ClientTooltip key={d.label}>
            <TooltipTrigger><circle cx={d.x} cy={d.y} r="4" fill="#7dd3fc" opacity="0.85" /></TooltipTrigger>
            <TooltipContent><div className={amerTooltipLabel}>Company {d.label}</div><div className={amerTooltipValue}>{d.x} / {100 - d.y}</div></TooltipContent>
          </ClientTooltip>
        ))}
      </svg>
    </div>
  );
}
