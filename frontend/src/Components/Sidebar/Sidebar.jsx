import React from 'react'
import SearchInput from './SearchInput'
import Conversations from '../Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
  return (
    <div className='border-r w-[400px] border-slate p-[30px] rounded-lg bg-blue-500 flex-flex-col overflow-auto'>
        <SearchInput />
        <div className='divider px-3'/>
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar