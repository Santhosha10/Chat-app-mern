import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SockectConext = createContext();

export const useSocketContext = () => {
  return useContext(SockectConext);
};

export const SockectConextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const SERVER_URL =
        process.env.NODE_ENV === "production"
          ? "https://chat-app-backend.onrender.com" 
          : "http://localhost:5000";

      const newSocket = io(SERVER_URL, {
        query: { userId: authUser._id.toString() },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        console.log("online users:", users);
        setOnlineUser(users);
      });

      return () => newSocket.disconnect();
    }
  }, [authUser]);

  return (
    <SockectConext.Provider value={{ socket, onlineUser }}>
      {children}
    </SockectConext.Provider>
  );
};
