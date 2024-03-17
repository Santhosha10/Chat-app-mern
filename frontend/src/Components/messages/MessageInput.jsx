import React, { useState } from 'react'
import{BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {

  const [message,setMessages] = useState("");
  const {loading,sendMessage} = useSendMessage();

  const handleSumbit= async (e)=>{
    e.preventDefault();
    if(!message) return;

    await sendMessage(message);
    setMessages("")
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSumbit}>
        <div className='w-full relative'>
            <input type='text'
              className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white'
              placeholder='type a message'
              value={message}
              onChange={(e)=> setMessages(e.target.value)}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <div className='loading loading-spinner'/> : <BsSend />}
            </button> 
        </div>
    </form>
  )
}

export default MessageInput