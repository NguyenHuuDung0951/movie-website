import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/use-auth";

export const ProfilePage = () => {
  const { authState } = useAuth();
  const user = authState.user;

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#151618]/92 px-6 py-8">
        <h1 className="text-3xl font-bold text-zinc-100">Hồ sơ cá nhân</h1>
        <p className="mt-2 text-zinc-300">Thông tin tài khoản hiện tại của bạn.</p>

        <div className="mt-8 space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div>
            <p className="text-sm text-zinc-400">Họ tên</p>
            <p className="text-lg font-medium text-zinc-100">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Email</p>
            <p className="text-lg font-medium text-zinc-100">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Vai trò</p>
            <p className="text-lg font-medium capitalize text-zinc-100">{user.role}</p>
          </div>
        </div>
      </main>
    </>
  );
};
