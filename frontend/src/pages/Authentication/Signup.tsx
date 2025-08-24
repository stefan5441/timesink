import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../../auth/useAuth";
import { register } from "../../api/authServices";
import Input from "../../components/styling/Input";
import Button from "../../components/styling/Button";

export const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string; username: string }) => {
      return register(data);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Unexpected error");
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate({ email, password, username });
  };

  console.log(username);

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px]">
        <label htmlFor="username">Username:</label>
        <Input
          type="text"
          id="username"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <Input
          type="email"
          id="email"
          placeholder="mail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <Input
          type="password"
          id="password"
          placeholder="************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="mt-4" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
};
