import { useState } from 'react'
import useConversation from '../zustandStore/useConversation'
import toast from "react-hot-toast";
import { sendMessageToConversation } from '../services/messageService';

const useSendMessage = () => {

    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

    const sendMessage = async (message)=>{
        setLoading(true)
        try {
            const data = await sendMessageToConversation(selectedConversation._id, message);

            setMessages([...messages,data])

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    return {sendMessage,loading}
}

export default useSendMessage
