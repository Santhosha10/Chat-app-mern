import React, { useEffect } from 'react'
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustandStore/useConversation';
import noticesound from '../assets/noticesound.mp3'

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const{messages,setMessages} = useConversation();

        useEffect(() => {
            socket?.on("newMessage", (newMessage) => {
                newMessage.shouldShake = true;
                const sound = new Audio(noticesound);
                sound.play();
                setMessages([...messages, newMessage]);
            });

            return () => socket?.off("newMessage");
        }, [socket, setMessages, messages]);

}

export default useListenMessages;