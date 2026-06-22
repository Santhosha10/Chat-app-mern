import { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';
import { getUsersForSidebar } from '../services/userService';

const useGetConversations = () => {
  
    const[loading,setLoading] = useState(false);
    const[conversations,setConversations] = useState([]);

    useEffect(()=>{
        const getConversations = async()=>{
            setLoading(true);

            try {
               const data = await getUsersForSidebar()
               setConversations(data);
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        getConversations();
    },[])

    return {loading,conversations}
}

export default useGetConversations
