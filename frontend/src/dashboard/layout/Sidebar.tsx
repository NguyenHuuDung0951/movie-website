import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Film,
  Users,
  Settings,
  LogOut,
  X,
  Clapperboard,
  Activity,
} from "lucide-react";
import { FaPlay } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { name: "Tổng quan", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Quản lý Phim", path: "/admin/movies", icon: Film },
    { name: "Người dùng", path: "/admin/users", icon: Users },
    { name: "Hoạt động", path: "/admin/activity", icon: Activity },
    { name: "Cài đặt", path: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform flex-col border-r border-zinc-800 bg-[#151618] transition-transform duration-300 ease-in-out lg:static lg:flex lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-3">
            <span className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-[#241b08] via-[#3a2a08] to-[#0e0a03] shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_25px_rgba(251,191,36,0.18)] transition duration-300 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.28),0_0_32px_rgba(251,191,36,0.26)] sm:h-14 sm:w-14">
              <span className="absolute inset-1 rounded-full border border-amber-300/20" />
              <span className="absolute inset-2 rounded-full border border-amber-200/10" />
              <FaPlay className="relative left-0.5 text-lg text-amber-300" />
            </span>
            <span className="text-xl font-bold tracking-wider text-white">
              CINEMA<span className="text-amber-500">VERSA</span>
            </span>
          </Link>
          <button className="text-zinc-400 hover:text-white lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Menu Quản Trị
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/admin/dashboard" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-500"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  }`}
                >
                  <item.icon size={18} className={isActive ? "text-blue-500" : "text-zinc-500"} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-zinc-800 p-4">
          <Link
            to="/logout"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={18} />
            Quay lại trang chính
          </Link>
        </div>
      </aside>
    </>
  );
};
