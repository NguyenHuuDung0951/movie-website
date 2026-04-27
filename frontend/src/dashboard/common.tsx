import { ReactNode } from "react";

export const panelClass =
  "rounded-2xl border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_50px_-25px_rgba(59,130,246,0.55)] backdrop-blur-sm";

type PanelProps = {
  title?: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Panel = ({ title, subtitle, rightSlot, children, className = "" }: PanelProps) => {
  return (
    <section className={`${panelClass} ${className}`}>
      {(title || subtitle || rightSlot) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title ? (
              <h3 className="text-sm font-semibold tracking-wide text-zinc-100">{title}</h3>
            ) : null}
            {subtitle ? <p className="mt-1 text-xs text-zinc-400">{subtitle}</p> : null}
          </div>
          {rightSlot}
        </header>
      )}
      {children}
    </section>
  );
};

export const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-zinc-800/80 ${className ?? ""}`} />
);
