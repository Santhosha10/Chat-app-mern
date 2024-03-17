import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import MessageContainer from '../../Components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-auto bg-gray-400 bg-clip-padding backdrop-fliter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>    
      <MessageContainer />  
    </div>
  )
}

export default Home