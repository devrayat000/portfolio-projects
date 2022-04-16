import * as yup from "yup";
import { api } from "$lib/modules/axios";

export interface AuthData {
  jwt: string;
  user: {
    id: number;
    username: string;
  };
}

export interface SignupInput extends LoginInput {
  username: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export function login({ email, password }: LoginInput) {
  return api
    .post<AuthData>("/api/auth/local", {
      identifier: email,
      password,
    })
    .then((res) => res.data);
}

export function signup({ email, password, username }: SignupInput) {
  return api
    .post<AuthData>("/api/auth/local/register", {
      email,
      password,
      username,
    })
    .then((res) => res.data);
}

export function user(jwt: string) {
  return api
    .get<AuthData>("/api/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data);
}

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(32),
});

export const signupSchema = loginSchema.shape({
  username: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .equals([yup.ref("password")]),
  termsAndCondition: yup.boolean().isTrue(),
});
