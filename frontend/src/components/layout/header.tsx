import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { SearchComponent } from "@/components/layout/SearchComponent";

const menuItems = [
  { label: "Phim Bộ", href: "/tv-series" },
  { label: "Phim Lẻ", href: "/movies" },
  { label: "Thể loại", href: "/" },
  { label: "Hỗ trợ", href: "/support-center" },
];

export const Header = () => {
  const { authState, logout } = useAuth();
  const isLoggedIn = Boolean(authState.user);

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur">
      {/* Desktop layout */}
      <div className="hidden sm:flex mx-auto w-full max-w-6xl items-center gap-3 px-6 py-3">
        <Link to="/" className="text-xl font-black tracking-tight text-zinc-100 shrink-0">
          CINEMAVERSA
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
                  className="inline-flex h-10 items-center rounded-full px-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
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
          <Link to="/" className="text-xl font-black tracking-tight text-zinc-100">
            CINEMAVERSA
          </Link>
          <div className="flex items-center gap-2">
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
                  className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
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