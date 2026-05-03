import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  FileText,
  Mail,
  MessageSquareMore,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

type SectionId = "intro" | "faq" | "privacy" | "terms" | "contact";

const sections: Array<{ id: SectionId; label: string; description: string }> = [
  { id: "intro", label: "Giới thiệu", description: "Tổng quan nhanh" },
  { id: "faq", label: "Hỏi đáp", description: "Câu hỏi thường gặp" },
  { id: "privacy", label: "Chính sách bảo mật", description: "Dữ liệu & quyền riêng tư" },
  { id: "terms", label: "Điều khoản sử dụng", description: "Quy định & trách nhiệm" },
  { id: "contact", label: "Liên hệ", description: "Hỗ trợ trực tiếp" },
];

const faqs = [
  {
    question: "Tôi có cần tài khoản để xem phim không?",
    answer:
      "Bạn có thể xem một số nội dung công khai mà không cần đăng nhập. Tuy nhiên, tài khoản sẽ giúp bạn lưu danh sách yêu thích, tiếp tục xem và nhận đề xuất cá nhân hóa.",
  },
  {
    question: "Làm sao để đổi mật khẩu hoặc cập nhật hồ sơ?",
    answer:
      "Sau khi đăng nhập, vào trang Hồ sơ để cập nhật tên, email hoặc đổi mật khẩu. Nếu gặp vấn đề, hãy gửi yêu cầu ở mục Liên hệ để được hỗ trợ.",
  },
  {
    question: "Nội dung có được cập nhật thường xuyên không?",
    answer:
      "Có. Hệ thống sẽ đồng bộ nội dung mới theo từng danh mục để bạn luôn thấy các bộ phim và series mới nhất trên trang chủ.",
  },
  {
    question: "Tôi báo lỗi phát video ở đâu?",
    answer:
      "Bạn có thể mô tả lỗi, thiết bị đang dùng và đường dẫn phim ở form liên hệ. Càng nhiều chi tiết, đội hỗ trợ càng xử lý nhanh hơn.",
  },
];

const privacyHighlights = [
  {
    title: "Dữ liệu chúng tôi thu thập",
    content:
      "Chúng tôi chỉ thu thập thông tin cần thiết để vận hành tài khoản, lưu trạng thái xem và cải thiện trải nghiệm nội dung.",
  },
  {
    title: "Mục đích sử dụng",
    content:
      "Dữ liệu được dùng để xác thực, hiển thị lịch sử xem, cá nhân hóa gợi ý và hỗ trợ khách hàng khi có yêu cầu.",
  },
  {
    title: "Bảo vệ thông tin",
    content:
      "Mật khẩu được băm an toàn trước khi lưu. Chúng tôi cũng áp dụng các biện pháp kỹ thuật nhằm giảm thiểu truy cập trái phép.",
  },
];

const termsHighlights = [
  {
    title: "Quyền của người dùng",
    content:
      "Người dùng có quyền xem, cập nhật hồ sơ và yêu cầu xóa dữ liệu cá nhân trong phạm vi hệ thống cho phép.",
  },
  {
    title: "Hành vi bị cấm",
    content:
      "Không sử dụng hệ thống cho mục đích spam, tấn công, tự động hóa trái phép hoặc khai thác dữ liệu vượt quá giới hạn cho phép.",
  },
  {
    title: "Trách nhiệm nội dung",
    content:
      "Nội dung hiển thị có thể đến từ nguồn bên thứ ba. Người dùng cần kiểm tra tính phù hợp của nội dung trước khi chia sẻ hoặc sử dụng.",
  },
];

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
    <path
      d="M21.6 4.8 18.7 19c-.2 1-1 1.2-1.9.8l-4.8-3.5-2.3 2.2c-.3.3-.6.5-1.2.5l.3-5.1 9.3-8.4c.4-.4-.1-.6-.5-.2L6.2 14l-5-1.6c-1.1-.3-1.1-1.1.2-1.6L20.4 3.6c.9-.3 1.7.2 1.2 1.2Z"
      fill="currentColor"
    />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
    <path
      d="M19.5 5.8A15.2 15.2 0 0 0 15.8 4l-.2.5c1.4.4 2.7 1 3.9 1.8A13.3 13.3 0 0 0 15.2 5a11.8 11.8 0 0 0-.7 1.3c-1.4-.2-2.8-.2-4.2 0A11.8 11.8 0 0 0 9.6 5c-1.6.2-3.2.7-4.7 1.3 1.2-.8 2.5-1.4 3.9-1.8l-.2-.5a15.2 15.2 0 0 0-3.7 1.8C2.7 10 2.2 14 3 17.9c1.7 1.2 3.5 1.8 5.3 2.1l.7-1.1c-.6-.2-1.2-.5-1.8-.9l.4-.3c3.3 1.6 6.8 1.6 10.1 0l.4.3c-.6.4-1.2.7-1.8.9l.7 1.1c1.8-.3 3.6-.9 5.3-2.1.9-4-.1-8-.8-12.1ZM9.3 15.5c-.9 0-1.6-.8-1.6-1.7 0-1 .7-1.7 1.6-1.7s1.6.8 1.6 1.7c0 1-.7 1.7-1.6 1.7Zm5.4 0c-.9 0-1.6-.8-1.6-1.7 0-1 .7-1.7 1.6-1.7s1.6.8 1.6 1.7c0 1-.7 1.7-1.6 1.7Z"
      fill="currentColor"
    />
  </svg>
);

export const SupportCenterPage = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("intro");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.3, 0.5] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                <Sparkles className="h-4 w-4" />
                Trung tâm hỗ trợ
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                Giải đáp nhanh, hỗ trợ rõ ràng, trải nghiệm mượt mà.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                Tìm câu trả lời, xem chính sách, hiểu điều khoản và liên hệ trực tiếp chỉ trong
                một màn hình. Giao diện tối ưu cho desktop lẫn mobile.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
              {[
                { label: "Phản hồi", value: "< 24h", icon: MessageSquareMore },
                { label: "Bảo mật", value: "An toàn", icon: ShieldCheck },
                { label: "Hỗ trợ", value: "24/7", icon: CircleHelp },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <item.icon className="h-5 w-5 text-cyan-300" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="mb-4 lg:hidden">
              <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex min-w-[180px] flex-col rounded-2xl border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-cyan-400/30 bg-cyan-400/10 text-white"
                          : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-sm font-semibold">{section.label}</span>
                      <span className="text-xs text-zinc-400">{section.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl lg:block">
              <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Mục lục</p>
                <h2 className="mt-2 text-xl font-bold text-white">Điều hướng nhanh</h2>
              </div>

              <nav className="space-y-2">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-cyan-400/30 bg-cyan-400/10"
                          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-white">{section.label}</span>
                        <span className="block text-xs text-zinc-400">{section.description}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition ${isActive ? "rotate-180 text-cyan-300" : "text-zinc-500"}`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-6">
            <section
              id="intro"
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Giới thiệu</h2>
                    <p className="mt-2 max-w-3xl text-zinc-300 leading-7">
                      Trung tâm hỗ trợ được thiết kế để người dùng tìm thông tin nhanh, đọc chính
                      sách dễ hiểu và gửi yêu cầu hỗ trợ mà không phải rời khỏi trang.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      "Sidebar cố định trên desktop",
                      "Accordion gọn gàng cho FAQ",
                      "Form liên hệ và mạng xã hội",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5 text-zinc-200"
                      >
                        <p className="text-sm leading-6">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              id="faq"
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Hỏi đáp</h2>
                  <p className="mt-2 text-zinc-300">Nhấn vào từng câu hỏi để xem câu trả lời.</p>
                </div>
                <CircleHelp className="mt-1 h-6 w-6 shrink-0 text-cyan-300" />
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className="rounded-2xl border border-white/10 bg-black/20 p-1 shadow-lg shadow-black/10"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 rounded-[1.1rem] px-4 py-4 text-left transition hover:bg-white/5"
                      >
                        <span className="text-base font-semibold text-white sm:text-lg">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-zinc-400 transition ${isOpen ? "rotate-180 text-cyan-300" : ""}`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden px-4 pb-4 text-zinc-300 leading-7">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section
              id="privacy"
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Chính sách bảo mật</h2>
                  <p className="mt-2 text-zinc-300">
                    Nội dung bên dưới được trình bày ngắn gọn, rõ ràng và dễ đọc.
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-zinc-300">
                <div>
                  <h3 className="text-lg font-semibold text-white">1. Phạm vi áp dụng</h3>
                  <p className="mt-2 leading-7">
                    Chính sách này áp dụng cho toàn bộ người dùng truy cập hệ thống, tạo tài khoản
                    hoặc gửi yêu cầu hỗ trợ qua nền tảng.
                  </p>
                </div>

                {privacyHighlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-7">{item.content}</p>
                  </div>
                ))}

                <div>
                  <h3 className="text-lg font-semibold text-white">2. Quyền kiểm soát dữ liệu</h3>
                  <p className="mt-2 leading-7">
                    Người dùng có thể yêu cầu cập nhật hoặc xóa dữ liệu trong phạm vi tài khoản của
                    mình. Các yêu cầu sẽ được xem xét theo quy trình xác minh an toàn.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="terms"
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Điều khoản sử dụng</h2>
                  <p className="mt-2 text-zinc-300">
                    Các điều khoản giúp duy trì môi trường sử dụng an toàn và minh bạch.
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-zinc-300">
                <div>
                  <h3 className="text-lg font-semibold text-white">1. Tài khoản và bảo mật</h3>
                  <p className="mt-2 leading-7">
                    Người dùng chịu trách nhiệm bảo vệ thông tin đăng nhập của mình và thông báo
                    ngay khi phát hiện truy cập bất thường.
                  </p>
                </div>

                {termsHighlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-7">{item.content}</p>
                  </div>
                ))}

                <div>
                  <h3 className="text-lg font-semibold text-white">2. Sử dụng hợp lệ</h3>
                  <p className="mt-2 leading-7">
                    Hệ thống không được dùng cho hành vi xâm phạm, khai thác trái phép hoặc làm
                    gián đoạn dịch vụ của những người dùng khác.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="contact"
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Liên hệ</h2>
                  <p className="mt-2 text-zinc-300">
                    Gửi cho chúng tôi thông tin và nội dung cần hỗ trợ, đội ngũ sẽ phản hồi sớm.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-200">Tên</span>
                      <input
                        type="text"
                        placeholder="Nhập tên của bạn"
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/50 focus:bg-black/30"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-200">Email</span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/50 focus:bg-black/30"
                      />
                    </label>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-zinc-200">Nội dung</span>
                    <textarea
                      rows={6}
                      placeholder="Mô tả vấn đề hoặc câu hỏi của bạn"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/50 focus:bg-black/30"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                  >
                    <Send className="h-4 w-4" />
                    Gửi yêu cầu
                  </button>
                </form>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h3 className="text-lg font-semibold text-white">Kênh hỗ trợ nhanh</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Liên hệ qua mạng xã hội nếu bạn cần phản hồi nhanh hoặc trao đổi trực tiếp.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href="https://t.me/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-200 transition hover:border-cyan-400/30 hover:bg-white/5"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                        <TelegramIcon />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Telegram</span>
                        <span className="block text-xs text-zinc-400">Nhắn tin trực tiếp</span>
                      </span>
                    </a>

                    <a
                      href="https://discord.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-200 transition hover:border-violet-400/30 hover:bg-white/5"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/15 text-violet-300">
                        <DiscordIcon />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Discord</span>
                        <span className="block text-xs text-zinc-400">Cộng đồng & hỗ trợ</span>
                      </span>
                    </a>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 p-5 text-sm leading-7 text-zinc-200">
                    <div className="flex items-center gap-2 text-white">
                      <UserRound className="h-4 w-4" />
                      Cần hỗ trợ gấp?
                    </div>
                    <p className="mt-2 text-zinc-300">
                      Hãy mô tả rõ lỗi, thời điểm xảy ra và thiết bị bạn đang dùng để chúng tôi xử lý
                      nhanh nhất.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};