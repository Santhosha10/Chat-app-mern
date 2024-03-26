import React, { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5';
import useConversation  from '../../zustandStore/useConversation';
import useGetConversation from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {

  const [search, setSearch] =useState("");

  const {setSelectedConversation}= useConversation();
  const {conversations} = useGetConversation()

  const handleSumbit =(e)=>{
    e.preventDefault();
    if(!search) return;

    if(search.length <3) {
      return  toast.error('Search Character atleast 3 words ')
    }

    const conversation  = conversations .find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()))

    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    }else{
      toast.error("User not found") 
    }
  }

  return (
    <form className='flex item-center gap-2' onSubmit={handleSumbit}>
        <input type='text' placeholder='Search...' 
          className='input input-bordered rounded-full w-[180px]'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-700 text-white'>
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput