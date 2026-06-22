import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import ThemeToggle from "../../Components/ThemeToggle";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-8 sm:py-10">
      <div className="app-card w-full max-w-md rounded-md p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="app-accent text-xs font-semibold uppercase tracking-[0.18em]">
            ChatWay
          </span>
          <ThemeToggle />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="app-muted mt-2 text-sm">
            Sign in to continue your conversations.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium">Username or email</label>
            <input
              type="text"
              placeholder="your_username or you@example.com"
              className="app-input h-11 w-full rounded-md px-3 text-sm"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="app-input h-11 w-full rounded-md px-3 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            className="app-button-primary flex h-11 w-full items-center justify-center rounded-md font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner" /> : "Log in"}
          </button>
          <p className="app-muted text-center text-sm">
            New to ChatWay?{" "}
            <Link to="/signup" className="app-accent font-semibold">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
