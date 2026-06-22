import { useCallback, useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustandStore/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const typingTimeoutRef = useRef(null);

  const emitTypingStop = useCallback(() => {
    if (!selectedConversation?._id) return;
    socket?.emit("typing:stop", { receiverId: selectedConversation._id });
  }, [selectedConversation?._id, socket]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (!selectedConversation?._id) return;

    socket?.emit("typing:start", { receiverId: selectedConversation._id });
    window.clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = window.setTimeout(emitTypingStop, 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    emitTypingStop();
    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(typingTimeoutRef.current);
      emitTypingStop();
    };
  }, [emitTypingStop]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3">
        <textarea
          rows="1"
          maxLength={2000}
          className="app-input max-h-32 min-h-11 flex-1 resize-none rounded-md px-4 py-3 text-sm"
          placeholder="Type a message..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="app-button-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          ) : (
            <BsSend className="text-lg" aria-hidden="true" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
