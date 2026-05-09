import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const menuItems = [
  { label: "Trang chủ", href: "/#home" },
  { label: "Phim Bộ", href: "/tv-series" },
  { label: "Phim Lẻ", href: "/movies" },
  { label: "Thể loại", href: "/" },
  // { label: "Danh sách phim của tôi", href: "/" },
];

export const Header = () => {
  const { authState, logout } = useAuth();
  const isLoggedIn = Boolean(authState.user);

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-[#0b0b0c]/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="text-xl font-black tracking-tight text-zinc-100">
          CINEMAVERSA
        </Link>

        <nav className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1">
          <ul className="flex flex-wrap items-center gap-2 sm:justify-center">
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

        <div className="order-2 ml-auto flex flex-wrap items-center justify-end gap-2 sm:order-3">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="h-10 w-full min-w-0 flex-1 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-zinc-400 sm:w-56 sm:flex-none"
          />
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-zinc-700 px-4 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800"
          >
            Giỏ hàng
          </button>
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
    </header>
  );
};