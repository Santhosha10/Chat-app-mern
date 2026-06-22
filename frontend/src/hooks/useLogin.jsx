import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (identifier, password) => {
    const success = handleInputErrors(identifier, password);
    if (!success) return;
    setLoading(true);
    try {
      const data = await loginUser({ identifier, password });

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleInputErrors(identifier, password) {
  if (!identifier || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  return true;
}
