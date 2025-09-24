import { client } from "../../auth/axiosClient";

type GoogleLoginPayload = {
  idToken: string;
};

export async function loginWithGoogle({ idToken }: GoogleLoginPayload) {
  const res = await client.post<{ accessToken: string }>("/auth/login/google", { idToken });

  if (res.data.accessToken) {
    localStorage.setItem("accessToken", res.data.accessToken);
  }

  return res.data;
}

export async function logout() {
  await client.post("/auth/logout");
  localStorage.removeItem("accessToken");
}
