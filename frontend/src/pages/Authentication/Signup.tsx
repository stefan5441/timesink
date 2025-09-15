import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/api/user/userQueries";
import { useRegister } from "@/api/auth/authQueries";

export const Signup = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const registerMutation = useRegister();

  if (user) {
    navigate("/", { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    registerMutation.mutate(
      { email, password, username },
      {
        onError: (err: unknown) => {
          if (err instanceof AxiosError) {
            setError(err.response?.data?.message || "Something went wrong");
          } else {
            setError("Unexpected error");
          }
        },
      }
    );
  };

  console.log(username);

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px]">
        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          id="username"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          placeholder="mail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          placeholder="************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          content={registerMutation.isPending ? "Signing up..." : "Sign up"}
          className="mt-4"
          disabled={registerMutation.isPending}
        />
      </form>
    </div>
  );
};
