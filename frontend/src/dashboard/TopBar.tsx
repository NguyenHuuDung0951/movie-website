import { Bell, CalendarRange, Menu } from "lucide-react";
import { DateRangeKey } from "@/dashboard/types";

const ranges: DateRangeKey[] = ["Today", "7D", "30D", "3M", "1Y", "Custom"];

type TopBarProps = {
  activeRange: DateRangeKey;
  onRangeChange: (range: DateRangeKey) => void;
  onMenuClick: () => void;
};

export const TopBar = ({ activeRange, onRangeChange, onMenuClick }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f0f13]/90 px-4 py-4 backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-200 transition hover:border-[#3B82F6]/60 hover:text-[#3B82F6] lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#A855F7] to-[#06B6D4] text-lg font-bold text-white">
              C
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-100">CineStream Admin</h1>
              <p className="text-xs text-zinc-400">Streaming intelligence cockpit</p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-[#1A1A24]/70 p-1 md:flex">
            <span className="pl-2 text-zinc-400">
              <CalendarRange size={15} />
            </span>
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => onRangeChange(range)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeRange === range
                    ? "bg-gradient-to-r from-[#A855F7] to-[#3B82F6] text-white"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-200 transition hover:border-[#06B6D4]/70 hover:text-[#06B6D4]"
          >
            <Bell size={17} />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#A855F7]" />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1A1A24]/80 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]" />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-zinc-100">Alex Tran</p>
              <p className="text-xs text-zinc-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 md:hidden">
        {ranges.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => onRangeChange(range)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              activeRange === range
                ? "border-[#A855F7]/70 bg-[#A855F7]/20 text-[#e9d5ff]"
                : "border-white/10 text-zinc-400"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </header>
  );
};
