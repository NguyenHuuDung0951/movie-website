import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginFormInput,
  RegisterFormInput,
  loginSchema,
  registerSchema,
} from "@/features/auth/schemas";
import { useAuth } from "@/hooks/use-auth";

type Props = {
  mode: "login" | "register";
};

export const AuthForm = ({ mode }: Props) => {
  const navigate = useNavigate();
  const { loginMutation, registerMutation } = useAuth();
  const isLogin = mode === "login";

  const form = useForm<LoginFormInput | RegisterFormInput>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin ? { email: "", password: "" } : { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormInput | RegisterFormInput) => {
    if (isLogin) {
      await loginMutation.mutateAsync(values as LoginFormInput);
    } else {
      await registerMutation.mutateAsync(values as RegisterFormInput);
    }
    navigate("/admin");
  };

  const loading = loginMutation.isPending || registerMutation.isPending;
  const error = loginMutation.error || registerMutation.error;

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-lg border border-zinc-200 p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm">Tên</label>
            <input
              className="w-full rounded border border-zinc-300 p-2"
              {...form.register("name" as const)}
            />
            <p className="mt-1 text-sm text-red-600">
              {(form.formState.errors as Record<string, { message?: string }>).name?.message}
            </p>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded border border-zinc-300 p-2"
            {...form.register("email")}
          />
          <p className="mt-1 text-sm text-red-600">
            {(form.formState.errors as Record<string, { message?: string }>).email?.message}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm">Mật khẩu</label>
          <input
            type="password"
            className="w-full rounded border border-zinc-300 p-2"
            {...form.register("password")}
          />
          <p className="mt-1 text-sm text-red-600">
            {(form.formState.errors as Record<string, { message?: string }>).password?.message}
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600">Đăng nhập/đăng ký thất bại, vui lòng kiểm tra lại.</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Tạo tài khoản"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <Link to={isLogin ? "/register" : "/login"} className="font-medium underline">
          {isLogin ? "Đăng ký" : "Đăng nhập"}
        </Link>
      </p>
    </div>
  );
};
