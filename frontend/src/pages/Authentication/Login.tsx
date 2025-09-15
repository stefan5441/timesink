import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/api/auth/authQueries";
import { useCurrentUser } from "@/api/user/userQueries";

export const Login = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useLogin();

  if (user) {
    navigate("/", { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px]">
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          placeholder="mail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          placeholder="************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="mt-4" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
