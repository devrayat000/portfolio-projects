import { api } from "$lib/modules/axios";

interface AuthData {
  jwt: string;
  user: {
    id: number;
    username: string;
  };
}

export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return api
    .post<AuthData>("/api/auth/local", {
      data: {
        email,
        password,
      },
    })
    .then((res) => res.data);
}
