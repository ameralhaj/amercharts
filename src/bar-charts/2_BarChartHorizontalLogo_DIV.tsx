import { ClientTooltip, TooltipContent, TooltipTrigger } from "../helpers/ClientTooltip";
import { amerChartFrame, amerTooltipLabel, amerTooltipValue } from "../helpers/AmerChartTheme";

const data = [
  { key: "Lyft", value: 55.8, color: "#f19be7" },
  { key: "Figma", value: 34.3, color: "#c4b5fd" },
  { key: "Meta", value: 27.1, color: "#8bb7ff" },
  { key: "Open", value: 22.5, color: "#7dd3fc" },
  { key: "Edge", value: 18.7, color: "#fdbb74" },
  { key: "Duo", value: 10.8, color: "#86efac" },
];

export function Live2_BarChartHorizontalLogo_DIV() {
  return (
    <div className={`${amerChartFrame} grid content-center gap-3`}>
      {data.map((d) => (
        <ClientTooltip key={d.key}>
          <TooltipTrigger>
            <div className="grid grid-cols-[34px_1fr_44px] items-center gap-3">
              <div className="grid size-7 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: d.color }}>{d.key.slice(0, 2)}</div>
              <div className="h-8 rounded-r-md shadow-sm" style={{ width: `${d.value}%`, background: `linear-gradient(90deg, ${d.color}99, ${d.color})` }} />
              <span className="text-xs tabular-nums text-slate-500">{d.value}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent><div className={amerTooltipLabel}>{d.key}</div><div className={amerTooltipValue}>{d.value}</div></TooltipContent>
        </ClientTooltip>
      ))}
    </div>
  );
}
