import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaFacebookF,
  FaPlay,
  FaTelegram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const navLinks = [
  { label: "Hỏi-Đáp", href: "/faq" },
  { label: "Chính sách bảo mật", href: "/privacy" },
  { label: "Điều khoản sử dụng", href: "/terms" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

const socialLinks = [
  { label: "Telegram", icon: FaTelegram },
  { label: "Discord", icon: FaDiscord },
  { label: "X", icon: FaXTwitter },
  { label: "Facebook", icon: FaFacebookF },
  { label: "TikTok", icon: FaTiktok },
  { label: "YouTube", icon: FaYoutube },
];

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0b0b0c]/92 text-gray-300 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/" className="group inline-flex items-center gap-4">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-linear-to-br from-[#241b08] via-[#3a2a08] to-[#0e0a03] shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_25px_rgba(251,191,36,0.18)] transition duration-300 group-hover:shadow-[0_0_0_1px_rgba(251,191,36,0.28),0_0_32px_rgba(251,191,36,0.26)]">
                  <span className="absolute inset-1 rounded-full border border-amber-300/20" />
                  <span className="absolute inset-2 rounded-full border border-amber-200/10" />
                  <FaPlay className="relative left-0.5 text-lg text-amber-300" />
                </span>

                <span>
                  <span className="block text-2xl font-black tracking-[0.18em] text-white uppercase">
                    CinemaVersa
                  </span>
                  <span className="mt-1 block text-sm text-gray-400">Phim hay trên thế giới </span>
                </span>
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href="/"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full
                       border border-white/10 bg-white/5 text-gray-300 transition duration-300
                     hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-white hover:shadow-[0_0_18px_rgba(251,191,36,0.18)]"
                    >
                      <Icon className="text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-400">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="transition duration-200 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="max-w-3xl text-sm leading-7 text-gray-400 sm:text-base">
              CinemaVersa – Phim hay trên thế giới | Trang xem phim online miễn phí chất lượng cao
              HD 4K, Vietsub, thuyết minh, lồng tiếng. Cập nhật nhanh nhất phim lẻ, phim bộ, phim
              chiếu rạp từ Hàn Quốc, Trung Quốc, Nhật Bản, Thái Lan, Âu Mỹ và nhiều quốc gia khác...
            </p>
          </div>

          {/* <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:max-w-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              CinemaVersa
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Giao diện tối sang trọng, tối ưu cho trải nghiệm xem phim mượt mà trên mọi thiết bị.
            </p>
          </div> */}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-500">
          © 2026 CinemaVersa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
