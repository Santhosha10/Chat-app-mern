import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {

    const [username,setUserName] =useState("");
    const [password,setPassword] = useState("");

    const {loading,login} = useLogin();

    const handleSumbit = async (e) =>{
        e.preventDefault();
        await login(username,password)
    }

  return (
    <div className='flex flex-col items justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-fliter backdrop-blur-lg bg-opacity-1'>
            <h1 className='text-3xl font-semibold text-center text-black'> Login
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handleSumbit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-800' >Username</span>
                    </label>
                    <input  type='text' 
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={(e)=> setUserName(e.target.value)}
                    />

                    <label className='label'>
                        <span className='text-base label-text text-gray-800' >Password</span>
                    </label>
                    <input  type='password' 
                            placeholder='Enter Password' 
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <Link to ='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-800'>
                    Don't have an account ?
                </Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2'disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
