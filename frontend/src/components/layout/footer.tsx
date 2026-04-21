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
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-col gap-5">
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-3 self-center sm:self-start"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-linear-to-br from-[#241b08] via-[#3a2a08] to-[#0e0a03] shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_0_25px_rgba(251,191,36,0.18)] transition duration-300 group-hover:shadow-[0_0_0_1px_rgba(251,191,36,0.28),0_0_32px_rgba(251,191,36,0.26)] sm:h-14 sm:w-14">
                  <span className="absolute inset-1 rounded-full border border-amber-300/20" />
                  <span className="absolute inset-2 rounded-full border border-amber-200/10" />
                  <FaPlay className="relative left-0.5 text-lg text-amber-300" />
                </span>

                <span>
                  <span className="block text-xl font-black tracking-[0.12em] text-white uppercase sm:text-2xl sm:tracking-[0.18em]">
                    CinemaVersa
                  </span>
                  <span className="mt-1 block text-center text-sm text-gray-400 sm:text-left">
                    Phim hay trên thế giới
                  </span>
                </span>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href="/"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full
                       border border-white/10 bg-white/5 text-gray-300 transition duration-300
                     hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-white hover:shadow-[0_0_18px_rgba(251,191,36,0.18)] sm:h-11 sm:w-11"
                    >
                      <Icon className="text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>

            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-medium text-gray-400 sm:justify-start">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="transition duration-200 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="max-w-3xl text-center text-sm leading-7 text-gray-400 sm:text-left sm:text-base">
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

        <div className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-gray-500 sm:mt-10 sm:pt-6 sm:text-left">
          © 2026 CinemaVersa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
