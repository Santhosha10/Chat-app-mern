import Login from "./Pages/login/Login";
import SignUp from "./Pages/signup/SignUp";
import Home from "./Pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { authUser, isAuthLoading } = useAuthContext();
  const { isDark } = useThemeContext();

  return (
    <div className="app-shell min-h-screen">
      {isAuthLoading ? (
        <div className="grid min-h-screen place-items-center px-4">
          <div className="app-panel flex items-center gap-3 rounded-md border px-4 py-3">
            <span className="loading loading-spinner loading-sm" />
            <span className="text-sm font-medium">Loading ChatWay</span>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        </Routes>
      )}
      <Toaster
        toastOptions={{
          style: {
            background: isDark ? "#151b22" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            border: isDark ? "1px solid #243244" : "1px solid #d8e2ea",
          },
        }}
      />
    </div>
  );
}

export default App;
