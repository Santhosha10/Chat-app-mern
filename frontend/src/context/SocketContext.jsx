import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

const getSocketServerUrl = () => {
  if (import.meta.env.PROD) return window.location.origin;
  if (import.meta.env.VITE_SOCKET_URL) return import.meta.env.VITE_SOCKET_URL;
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  return "http://localhost:5000";
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const serverUrl = getSocketServerUrl();

      const newSocket = io(serverUrl, {
        query: { userId: authUser._id.toString() },
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 8,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        setIsConnected(true);
        setOnlineUser((users) => Array.from(new Set([...users, authUser._id.toString()])));
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection failed", {
          message: error.message,
          serverUrl,
        });
        setIsConnected(false);
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      return () => {
        newSocket.disconnect();
        setSocket(null);
        setOnlineUser([]);
        setIsConnected(false);
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
