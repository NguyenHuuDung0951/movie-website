export type User = {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
};

export type AuthResponse = {
  token: string;
  user: User;
  message: string;
};
