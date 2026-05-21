"use client";
import * as React from "react";
import { createPortal } from "react-dom";

type TooltipContextValue = {
  tooltip: { x: number; y: number } | undefined;
  setTooltip: (tooltip: { x: number; y: number } | undefined) => void;
};

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

function useTooltipContext(componentName: string): TooltipContextValue {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Please wrap your TooltipContent and TooltipTrigger in a ClientTooltip");
  }
  return context;
}

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = React.useState<{ x: number; y: number }>();

  return (
    <TooltipContext.Provider value={{ tooltip, setTooltip }}>{children}</TooltipContext.Provider>
  );
};

const TRIGGER_NAME = "TooltipTrigger";

const TooltipTrigger = React.forwardRef<SVGGElement, { children: React.ReactNode }>(
  (props, forwardedRef) => {
    const { children } = props;
    const context = useTooltipContext(TRIGGER_NAME);
    const triggerRef = React.useRef<SVGGElement | null>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          context.setTooltip(undefined);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [context]);

    return (
      <g
        ref={(node) => {
          triggerRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") {
            context.setTooltip({ x: event.clientX, y: event.clientY });
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            context.setTooltip(undefined);
          }
        }}
        onTouchStart={(event) => {
          context.setTooltip({ x: event.touches[0].clientX, y: event.touches[0].clientY });
          setTimeout(() => {
            context.setTooltip(undefined);
          }, 2000);
        }}
      >
        {children}
      </g>
    );
  }
);

TooltipTrigger.displayName = TRIGGER_NAME;

const CONTENT_NAME = "TooltipContent";

const tooltipShellClass =
  "fixed z-50 max-w-72 overflow-hidden rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-[13px] font-medium leading-5 tracking-normal text-slate-950 shadow-[0_24px_80px_-28px_rgba(43,86,125,0.5)] ring-1 ring-sky-950/[0.06] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 dark:text-white dark:shadow-black/50";

function TooltipChrome({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1"
        style={{ background: accent ?? "linear-gradient(90deg, #7dd3fc, #c4b5fd, #fda4af)" }}
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl"
        style={{ background: accent ? `${accent}30` : "rgba(125, 211, 252, 0.2)" }}
      />
      <div className="relative">{children}</div>
    </>
  );
}

const TooltipContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; accent?: string }>(
  (props, _) => {
    const { children, accent } = props;
    const context = useTooltipContext(CONTENT_NAME);
    const runningOnClient = typeof document !== "undefined";
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    const getTooltipPosition = () => {
      if (!tooltipRef.current || !context.tooltip) return {};

      const tooltipWidth = tooltipRef.current.offsetWidth;
      const viewportWidth = window.innerWidth;
      const willOverflowRight = context.tooltip.x + tooltipWidth + 10 > viewportWidth;

      return {
        top: context.tooltip.y - 20,
        left: willOverflowRight ? context.tooltip.x - tooltipWidth - 10 : context.tooltip.x + 10,
      };
    };

    if (!context.tooltip || !runningOnClient) {
      return null;
    }

    const isMobile = window.innerWidth < 768;

    return createPortal(
      isMobile ? (
        <div
          className={tooltipShellClass}
          style={{
            top: context.tooltip.y,
            left: context.tooltip.x + 20,
          }}
        >
          <TooltipChrome accent={accent}>{children}</TooltipChrome>
        </div>
      ) : (
        <div
          ref={tooltipRef}
          className={tooltipShellClass}
          style={getTooltipPosition()}
        >
          <TooltipChrome accent={accent}>{children}</TooltipChrome>
        </div>
      ),
      document.body
    );
  }
);

TooltipContent.displayName = CONTENT_NAME;

export { Tooltip as ClientTooltip, TooltipTrigger, TooltipContent };
