import Link from "next/link";

const menuItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Phim Hot", href: "/#hot" },
  { label: "Thể loại", href: "/" },
  { label: "Tin tức", href: "/" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-xl font-black tracking-tight text-zinc-900">
          MOVIEHUB
        </Link>

        <nav className="order-3 w-full overflow-x-auto sm:order-2 sm:w-auto sm:flex-1">
          <ul className="flex min-w-max items-center gap-2 sm:justify-center">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700"
              >
                Hồ sơ
              </button>
            </li>
          </ul>
        </nav>

        <div className="order-2 ml-auto flex items-center gap-2 sm:order-3">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="h-10 w-36 rounded-full border border-zinc-300 px-4 text-sm outline-none transition focus:border-zinc-900 sm:w-56"
          />
          <button
            type="button"
            className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
          >
            Giỏ hàng
          </button>
        </div>
      </div>
    </header>
  );
};