import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../utils/MessagesSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  useListenMessages();
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  // Scroll to the last message smoothly
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 px-4 py-3 overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      
      {/* Loading skeleton */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* Messages */}
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {/* Empty state */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
