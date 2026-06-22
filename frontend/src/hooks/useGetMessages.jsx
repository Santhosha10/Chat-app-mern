import { useEffect, useState } from 'react'
import useConversation from '../zustandStore/useConversation'
import toast from "react-hot-toast";
import { getMessagesByConversation } from '../services/messageService';


const useGetMessages = () => {
  
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

    useEffect(()=>{
        const getMessage = async ()=>{
            setLoading(true)
            try {
                const data = await getMessagesByConversation(selectedConversation._id);
    
                setMessages(data)
    
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id) getMessage()

    },[selectedConversation?._id,setMessages])

    return {messages,loading}
}

export default useGetMessages
