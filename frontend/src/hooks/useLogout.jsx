import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { logoutUser } from "../services/authService";

const useLogout = () => {
  const [loading , setLoading] = useState(false);

  const {setAuthUser} = useAuthContext();

  const logout = async ()=>{
    setLoading(true)
    try {
        await logoutUser()
        localStorage.removeItem("chat-user");
        setAuthUser(null)
        toast.success("Logged out")
        
    } catch (error) {
        toast.error(error.message)
    } finally{
        setLoading(false)
    }
  }
  return {loading,logout}
}

export default useLogout
