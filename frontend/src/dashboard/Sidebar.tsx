import {
  Film,
  LayoutDashboard,
  Settings,
  Users,
  WalletCards,
  ChartNoAxesCombined,
  FileBarChart2,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard Overview", active: true },
  { icon: Film, label: "Movies & Series" },
  { icon: Users, label: "Users & Members" },
  { icon: WalletCards, label: "Revenue & Subscriptions" },
  { icon: ChartNoAxesCombined, label: "Content Performance" },
  { icon: FileBarChart2, label: "Reports & Export" },
  { icon: Settings, label: "Settings" },
];

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 border-r border-white/10 bg-[#12121b] px-4 py-6 lg:fixed lg:left-0 lg:top-0 lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#A855F7] to-[#06B6D4] font-bold text-white">
            C
          </div>
          <div>
            <p className="text-sm text-zinc-400">Platform</p>
            <h2 className="text-base font-semibold text-zinc-100">CineStream Admin</h2>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                active
                  ? "bg-gradient-to-r from-[#A855F7]/30 to-[#3B82F6]/20 text-zinc-100"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
              }`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#12121b] px-4 py-5 transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#A855F7] to-[#06B6D4] text-white">
              C
            </div>
            <h2 className="text-base font-semibold text-zinc-100">CineStream Admin</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300"
          >
            <X size={17} />
          </button>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                active
                  ? "bg-gradient-to-r from-[#A855F7]/30 to-[#3B82F6]/20 text-zinc-100"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
              }`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};
