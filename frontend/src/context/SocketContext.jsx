import { createContext, useEffect, useState ,useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

 const SockectConext  = createContext();

export const useSocketContext = () => {
	return useContext(SockectConext);
};


export const SockectConextProvider = ({children})=>{

    const [socket, setSocket] =useState(null);
    const [onlineUser, setOnlineUser] =useState([]);
    const {authUser} = useAuthContext();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:5000",{
                query:{
                    userId:authUser._id
                }
            });

            setSocket(socket);
            
            socket.on("getOnlineUser",(users)=>{
                setOnlineUser(users)
            })

            return ()=> socket.close()
        }else{
            if(socket) {
                socket.close();
                setSocket(null)
            }
        }
    },[authUser])

    return (
        <SockectConext.Provider value={{socket,onlineUser}}>
            {children}
        </SockectConext.Provider>
    )
}