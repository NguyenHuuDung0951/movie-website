import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import { HttpError } from "../utils/http-error";

type UserRole = "user" | "admin";

const createAuthToken = (userId: string, role: UserRole): string =>
  jwt.sign({ role }, env.jwtSecret, {
    subject: userId,
    expiresIn: "7d",
  });

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new HttpError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: "user",
  });

  const token = createAuthToken(user.id, user.role);

  return {
    message: "Register successful",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new HttpError(401, "Invalid email or password");
  }

  const token = createAuthToken(user.id, user.role);

  return {
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const getCurrentUser = async (userId?: string) => {
  if (!userId) {
    throw new HttpError(401, "Unauthorized");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return { user };
};
