import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

    const [inputs,setInputs] = useState({
        fullName:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:''
    })

   const {loading,signup}= useSignup()

    const handelCheckbox = (gender)=>{
        setInputs({...inputs,gender})
    }

    const handleSumbit = async (e)=>{
        e.preventDefault()
        await signup(inputs)
    }

  return (
    <div className='flex flex-col item-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-fliter backdrop-blur-lg bg-opacity-1'>
        <h1 className='text-3xl font-semibold text-center text-black'> SignUp
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handleSumbit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-800' >FullName</span>
                    </label>
                    <input  type='text' 
                            placeholder='Enter Fullname'
                            className='w-full input input-bordered h-10'
                            value={inputs.fullName}
                            onChange={(e)=> setInputs({...inputs,fullName:e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-800' >Username</span>
                    </label>
                    <input  type='text' 
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e)=> setInputs({...inputs,username:e.target.value})}
                    />
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base label-text text-gray-800' >Password</span>
                    </label>
                    <input  type='password' 
                            placeholder='Enter Password' 
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e)=> setInputs({...inputs,password:e.target.value})}
                    />
                </div>
                <div>
                <label className='label'>
                        <span className='text-base label-text text-gray-800' >Confirm Password</span>
                    </label>
                    <input  type='password' 
                            placeholder='Enter Confirm Password' 
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e)=> setInputs({...inputs,confirmPassword:e.target.value})}
                    />
                </div>

                <GenderCheckbox 
                    onCheckboxChange = {handelCheckbox}
                    selectedGender = {inputs.gender}
                />

                <Link to ='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-800'>
                    Already have an account?
                </Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                        SignUp
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
