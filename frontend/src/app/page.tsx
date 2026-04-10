import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-bold">Movies Website - Giai đoạn 1 & 2</h1>
      <p className="mt-3 text-zinc-700">
        Nền tảng đã sẵn sàng với kiến trúc FE/BE, xác thực JWT, form auth và middleware bảo vệ
        trang admin.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/login" className="rounded bg-black px-4 py-2 text-white">
          Đăng nhập
        </Link>
        <Link href="/register" className="rounded border border-zinc-300 px-4 py-2">
          Đăng ký
        </Link>
        <Link href="/admin" className="rounded border border-zinc-300 px-4 py-2">
          Vào Admin
        </Link>
      </div>
    </main>
  );
}
