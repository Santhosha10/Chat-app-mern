import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 py-2 bg-gray-800" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <input
          type="text"
          className="w-full rounded-full bg-gray-700 text-white px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0 flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors duration-200"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <BsSend className="text-lg" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
