import { z } from "zod";

// validate for form register account
export const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Tên người dùng phải có ít nhất 2 ký tự")
    .max(30, "Tên người dùng tối đa 30 ký tự"),
  email: z.email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const loginSchema = z.object({
  email: z.email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type RegisterFormInput = z.infer<typeof registerSchema>;
export type LoginFormInput = z.infer<typeof loginSchema>;
