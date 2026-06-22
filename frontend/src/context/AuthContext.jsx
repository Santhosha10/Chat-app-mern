import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext();

export const  useAuthContext = ()=>{

    return useContext(AuthContext)
}

export const AuthContextProvider = ({children})=>{

    const [authUser, setAuthUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("chat-user")) || null
        } catch {
            return null
        }
    })
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    useEffect(() => {
        const hydrateAuthUser = async () => {
            try {
                const user = await getCurrentUser()
                localStorage.setItem("chat-user", JSON.stringify(user))
                setAuthUser(user)
            } catch {
                localStorage.removeItem("chat-user")
                setAuthUser(null)
            } finally {
                setIsAuthLoading(false)
            }
        }

        hydrateAuthUser()
    }, [])

    return <AuthContext.Provider value={{authUser,setAuthUser,isAuthLoading}}>
        {children}
    </AuthContext.Provider>
}
