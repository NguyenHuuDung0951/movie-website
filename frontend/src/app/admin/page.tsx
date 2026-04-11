export default function AdminPage() {
  return (
    <main className="mx-auto mt-16 w-full max-w-3xl px-6">
      <h1 className="text-3xl font-bold">Bảng điều khiển Admin</h1>
      <p className="mt-2 text-zinc-700">
        Bạn đã truy cập trang admin thành công (route được bảo vệ bởi middleware).
      </p>
    </main>
  );
}
