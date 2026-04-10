export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

export type AuthResponse = {
  token: string;
  user: User;
  message: string;
};
