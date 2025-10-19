import React from "react";
import useConversation from "../zustandStore/useConversation";
import { useSocketContext } from "../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUser } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUser.includes(conversation?._id);

  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`
          flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200
          ${isSelected ? "bg-sky-500" : "hover:bg-sky-600"}
        `}
      >
        {/* Avatar */}
        <div className="relative w-12 h-12">
          <img
            src={conversation.profilePic}
            alt={`${conversation.fullName} avatar`}
            className="w-full h-full rounded-full object-cover border-2 border-gray-600"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full animate-pulse"></span>
          )}
        </div>

        {/* Name & info */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <p className="text-gray-100 font-semibold truncate">
            {conversation.fullName}
          </p>
          {/* You can add last message preview here if needed */}
        </div>
      </div>

      {/* Divider */}
      {!lastIdx && <div className="border-b border-gray-700 mx-3"></div>}
    </>
  );
};

export default Conversation;
