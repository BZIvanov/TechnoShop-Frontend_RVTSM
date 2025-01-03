import { AppImage } from "./common";

export enum UserRoles {
  ADMIN = "admin",
  BUYER = "buyer",
  SELLER = "seller",
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  role: UserRoles.BUYER | UserRoles.SELLER;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  role: UserRoles;
  avatar?: AppImage;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}

export interface UpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateMessageResponse {
  success: boolean;
  message: string;
}
