import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../../zustandStore/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="m-1 w-[950px] rounded-xl flex flex-col bg-gray-900 shadow-lg overflow-hidden">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
            <p className="text-gray-100 font-semibold text-lg">
              Chatting with:{" "}
              <span className="text-blue-400">{selectedConversation.fullName}</span>
            </p>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
            <Messages />
          </div>

          {/* Input */}
          <div className="bg-gray-800 p-4 border-t border-gray-700">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center p-4 bg-gray-900 rounded-xl">
      <TiMessage className="text-6xl text-gray-400 mb-4 animate-bounce" />
      <p className="text-white text-xl font-semibold mb-2">
        Welcome, {authUser.fullName}!
      </p>
      <p className="text-gray-400 text-md">
        Select a chat on the left to start a conversation
      </p>
    </div>
  );
};
