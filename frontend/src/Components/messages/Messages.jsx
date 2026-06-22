import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../utils/MessagesSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  useListenMessages();
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app-shell h-full overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 md:px-8">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {!loading && messages.length === 0 && (
        <p className="app-muted mt-20 text-center text-sm">
          Send the first message to start the conversation.
        </p>
      )}
    </div>
  );
};

export default Messages;
