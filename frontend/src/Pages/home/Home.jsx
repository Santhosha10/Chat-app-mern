import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import MessageContainer from '../../Components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[750px] md:h-[650px] w-[80rem] rounded-lg overflow-y-hidden bg-gray-600' >
      <Sidebar/>    
      <MessageContainer />  
    </div>
  )
}

export default Home