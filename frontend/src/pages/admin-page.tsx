export const AdminPage = () => {
  return (
    <main className="mx-auto mt-16 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8">
      <h1 className="text-3xl font-bold text-zinc-100">Bảng điều khiển Admin</h1>
      <p className="mt-2 text-zinc-300">
        Bạn đã truy cập trang admin thành công (route được bảo vệ bởi middleware).
      </p>
    </main>
  );
};
