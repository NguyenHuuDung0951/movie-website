import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { SearchComponent } from "@/components/layout/SearchComponent";

import { FaPlay } from "react-icons/fa6";
const menuItems = [
  { label: "Phim Bộ", href: "/tv-series" },
  { label: "Phim Lẻ", href: "/movies" },
  { label: "Thể loại", href: "/genre/action" },
  { label: "Hỗ trợ", href: "/support-center" },
];

export const Header = () => {
  const { authState, logout } = useAuth();
  const location = useLocation();
  const isLoggedIn = Boolean(authState.user);
  const isAdmin = authState.user?.role === "admin";
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur">
      {/* Desktop layout */}
      <div className="hidden sm:flex mx-auto w-full max-w-6xl items-center gap-3 px-6 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-[#241b08] via-[#3a2a08] to-[#0e0a03] shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_15px_rgba(251,191,36,0.18)] transition duration-300 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.28),0_0_20px_rgba(251,191,36,0.26)] sm:h-10 sm:w-10">
            <span className="absolute inset-1 rounded-full border border-amber-300/20" />
            <span className="absolute inset-2 rounded-full border border-amber-200/10" />
            <FaPlay className="relative left-0.5 text-[10px] text-amber-300 sm:text-xs" />
          </span>
          <span className="text-xl font-black tracking-tight text-white">
            CINEMA<span className="text-amber-500">VERSA</span>
          </span>
        </Link>

        <div className="w-[420px] shrink-0">
          <SearchComponent />
        </div>

        <nav className="flex-1">
          <ul className="flex items-center justify-center gap-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="inline-flex h-10 whitespace-nowrap items-center rounded-full px-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {isLoggedIn && isAdmin && !isAdminRoute && (
            <Link
              to="/admin/dashboard"
              className="inline-flex h-10 items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
            >
              Admin
            </Link>
          )}
          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            className="inline-flex h-10 items-center rounded-full border border-zinc-700 px-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          >
            {isLoggedIn ? "Hồ sơ" : "Đăng nhập"}
          </Link>
          {isLoggedIn && (
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-10 items-center rounded-full border border-zinc-700 px-4 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800"
            >
              Đăng xuất
            </button>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex sm:hidden flex-col px-4 py-3 gap-3">
        {/* Row 1: Logo + Auth */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-gradient-to-br from-[#241b08] via-[#3a2a08] to-[#0e0a03] shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_15px_rgba(251,191,36,0.18)] transition duration-300 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.28),0_0_20px_rgba(251,191,36,0.26)]">
              <span className="absolute inset-1 rounded-full border border-amber-300/20" />
              <span className="absolute inset-2 rounded-full border border-amber-200/10" />
              <FaPlay className="relative left-0.5 text-[10px] text-amber-300" />
            </span>
            <span className="text-lg font-black tracking-tight text-white">
              CINEMA<span className="text-amber-500">VERSA</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isLoggedIn && isAdmin && !isAdminRoute && (
              <Link
                to="/admin/dashboard"
                className="inline-flex h-9 items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
              >
                Admin
              </Link>
            )}
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              className="inline-flex h-9 items-center rounded-full border border-zinc-700 px-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              {isLoggedIn ? "Hồ sơ" : "Đăng nhập"}
            </Link>
            {isLoggedIn && (
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-9 items-center rounded-full border border-zinc-700 px-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Search */}
        <SearchComponent />

        {/* Row 3: Nav */}
        <nav>
          <ul className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {menuItems.map((item) => (
              <li key={item.label} className="shrink-0">
                <Link
                  to={item.href}
                  className="inline-flex h-9 whitespace-nowrap items-center rounded-full px-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
