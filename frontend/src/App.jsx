import Login from "./Pages/login/Login";
import SignUp from "./Pages/signup/SignUp";
import Home from "./Pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { authUser } = useAuthContext();
  const { isDark } = useThemeContext();

  return (
    <div className="app-shell min-h-screen">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
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
