import { client } from "./axiosClient";

type AuthCredentials = {
  email: string;
  password: string;
};

export function register({ email, password }: AuthCredentials) {
  return client.post("auth/register", { email, password });
}

export function login({ email, password }: AuthCredentials) {
  return client.post("auth/login", { email, password });
}
