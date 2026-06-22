import { useEffect } from 'react'
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustandStore/useConversation';
import noticesound from '../assets/noticesound.mp3'
import { useAuthContext } from '../context/AuthContext';

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {authUser} = useAuthContext();
  const{
    messages,
    setMessages,
    selectedConversation,
    incrementUnread,
    setUserTyping,
    updateMessage
  } = useConversation();

        useEffect(() => {
            socket?.on("newMessage", (newMessage) => {
                newMessage.shouldShake = true;
                const sound = new Audio(noticesound);
                sound.play().catch(() => {});
                const isActiveConversation = selectedConversation?._id === newMessage.senderID;

                if (isActiveConversation) {
                    setMessages([...messages, newMessage]);
                } else if (newMessage.senderID !== authUser?._id) {
                    incrementUnread(newMessage.senderID);
                }
            });

            socket?.on("typing:start", ({ senderId }) => {
                setUserTyping(senderId, true);
            });

            socket?.on("typing:stop", ({ senderId }) => {
                setUserTyping(senderId, false);
            });

            socket?.on("messageReactionUpdated", (updatedMessage) => {
                updateMessage(updatedMessage);
            });

            socket?.on("messageEdited", (updatedMessage) => {
                updateMessage(updatedMessage);
            });

            socket?.on("messageDeleted", (updatedMessage) => {
                updateMessage(updatedMessage);
            });

            return () => {
                socket?.off("newMessage");
                socket?.off("typing:start");
                socket?.off("typing:stop");
                socket?.off("messageReactionUpdated");
                socket?.off("messageEdited");
                socket?.off("messageDeleted");
            }
        }, [socket, setMessages, messages, selectedConversation?._id, authUser?._id, incrementUnread, setUserTyping, updateMessage]);

}

export default useListenMessages;
