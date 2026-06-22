import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import ThemeToggle from "../../Components/ThemeToggle";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
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
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="app-muted mt-2 text-sm">
            Join the workspace and start messaging instantly.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium">Full name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="app-input h-11 w-full rounded-md px-3 text-sm"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter unique user name"
              className="app-input h-11 w-full rounded-md px-3 text-sm"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="app-input h-11 w-full rounded-md px-3 text-sm"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Min 9 characters"
                className="app-input h-11 w-full rounded-md px-3 text-sm"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Confirm</label>
              <input
                type="password"
                placeholder="Repeat password"
                className="app-input h-11 w-full rounded-md px-3 text-sm"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                autoComplete="new-password"
              />
            </div>
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckbox}
            selectedGender={inputs.gender}
          />

          <button
            className="app-button-primary flex h-11 w-full items-center justify-center rounded-md font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner" /> : "Create account"}
          </button>

          <p className="app-muted text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="app-accent font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
