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
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { username: "", email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormInput | RegisterFormInput) => {
    if (isLogin) {
      await loginMutation.mutateAsync(values as LoginFormInput);
      navigate("/");
    } else {
      await registerMutation.mutateAsync(values as RegisterFormInput);
      navigate("/login");
    }
  };

  const loading = loginMutation.isPending || registerMutation.isPending;
  const rawError = loginMutation.error || registerMutation.error;

  // Extract human-readable error message from Axios response body
  const getErrorMessage = (err: unknown): string => {
    if (!err) return "";
    const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
    return (
      axiosErr?.response?.data?.message ||
      axiosErr?.message ||
      "Đã có lỗi xảy ra, vui lòng thử lại."
    );
  };

  const errorMessage = rawError ? getErrorMessage(rawError) : "";

  // Map backend messages to Vietnamese for better UX
  const displayError = (() => {
    if (!errorMessage) return "";
    if (errorMessage.toLowerCase().includes("email already exists"))
      return "Email này đã được đăng ký. Vui lòng dùng email khác.";
    if (errorMessage.toLowerCase().includes("username already exists"))
      return "Tên người dùng đã tồn tại. Vui lòng chọn tên khác.";
    if (errorMessage.toLowerCase().includes("invalid email or password"))
      return "Email hoặc mật khẩu không đúng. Vui lòng thử lại.";
    return errorMessage;
  })();

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-lg border border-zinc-800 bg-[#151618]/92 p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold text-zinc-100">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Tên người dùng</label>
            <input
              className="w-full rounded border border-zinc-700 bg-zinc-900/70 p-2 text-zinc-100"
              {...form.register("username" as const)}
            />
            <p className="mt-1 text-sm text-red-500">
              {(form.formState.errors as Record<string, { message?: string }>).username?.message}
            </p>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Email</label>
          <input
            type="email"
            className="w-full rounded border border-zinc-700 bg-zinc-900/70 p-2 text-zinc-100"
            {...form.register("email")}
          />
          <p className="mt-1 text-sm text-red-500">
            {(form.formState.errors as Record<string, { message?: string }>).email?.message}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Mật khẩu</label>
          <input
            type="password"
            className="w-full rounded border border-zinc-700 bg-zinc-900/70 p-2 text-zinc-100"
            {...form.register("password")}
          />
          <p className="mt-1 text-sm text-red-500">
            {(form.formState.errors as Record<string, { message?: string }>).password?.message}
          </p>
        </div>

        {displayError && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm font-medium text-red-400">⚠ {displayError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-zinc-100 px-4 py-2 text-zinc-900 disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Tạo tài khoản"}
        </button>
      </form>

      <p className="mt-4 text-sm text-zinc-300">
        {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <Link to={isLogin ? "/register" : "/login"} className="font-medium text-zinc-100 underline">
          {isLogin ? "Đăng ký" : "Đăng nhập"}
        </Link>
      </p>
    </div>
  );
};
