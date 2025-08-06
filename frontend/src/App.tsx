import { useState, useEffect } from "react";
import { client } from "./api/axiosClient";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  async function register() {
    setError(null);
    setLoading(true);
    try {
      const res = await client.post("/auth/register", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      setAccessToken(res.data.accessToken);
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    setError(null);
    setLoading(true);
    try {
      const res = await client.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      setAccessToken(res.data.accessToken);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setError(null);
    setLoading(true);
    try {
      await client.post("/auth/logout");
      localStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (err: any) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!accessToken) {
    return (
      <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register / Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-between">
          <button
            onClick={register}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Register
          </button>
          <button
            onClick={login}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Login
          </button>
        </div>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6">Protected Page</h1>
      <p className="mb-6">Welcome! You are logged in.</p>
      <button
        onClick={logout}
        disabled={loading}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        Logout
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

export default App;
