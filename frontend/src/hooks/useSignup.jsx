import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { signupUser } from '../services/authService';

const useSignup = () => {
    
    const [loading,setLoading] =useState(false);
    const {setAuthUser} = useAuthContext();

    const signup= async ({fullName,username,email,password,confirmPassword,gender})=>{
        const success = handleInputErrors({fullName,username,email,password,confirmPassword,gender});

        if(!success) return;
        setLoading(true);

        try {
            const data = await signupUser({fullName,username,email,password,confirmPassword,gender});
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
            toast.success("Account created successfully");

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return {loading,signup}
}

export default useSignup;

function handleInputErrors({fullName,username,email,password,confirmPassword,gender}){
    if(!fullName || !username || !email || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){
        toast.error('Please enter a valid email address')
        return false
    }

    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return false;
    }

    if (password.length <6) {
        toast.error("Password should be at least 6 characters")
        return false
    }

    return true;
}
