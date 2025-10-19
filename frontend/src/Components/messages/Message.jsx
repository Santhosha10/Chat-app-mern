import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustandStore/useConversation'
import { extractTime } from '../../utils/MessageTime'

const Message = ({message}) => {

  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation();

  const fromMe = message.senderID === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const time = extractTime(message.createdAt)


  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic}
                     alt='ProflicPic' 
                />
            </div>
        </div>
        <div className={`chat-bubble text-white  ${bubbleBgColor}`}>{message.message}</div>
        <div className='chat-footer text-white opacity-50 text-xs flex gap-1 item-center'>{time}</div>
    </div>
  )
}

export default Message