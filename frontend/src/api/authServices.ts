import { client } from "../auth/axiosClient";

type AuthCredentials = {
  email: string;
  password: string;
  username?: string;
};

export async function register({ email, password, username }: AuthCredentials) {
  const res = await client.post("auth/register", { email, password, username });

  const accessToken = res.data.accessToken;
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return res;
}

export async function login({ email, password }: AuthCredentials) {
  const res = await client.post("auth/login", { email, password });

  const accessToken = res.data.accessToken;
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return res;
}
