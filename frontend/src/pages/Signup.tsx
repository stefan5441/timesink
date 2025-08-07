import axios from "axios";
import { useState } from "react";

import Button from "../components/styling/Button";
import Input from "../components/styling/Input";
import { register } from "../api/authServices";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ email, password });
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <h1 className="text-7xl font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[300px]">
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

        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
}

export default Signup;
