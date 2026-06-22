import { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../../zustandStore/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import Avatar from "../Avatar";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

const MessageContainer = ({ className = "" }) => {
  const {
    selectedConversation,
    setSelectedConversation,
    typingByUser,
    messageSearch,
    setMessageSearch
  } = useConversation();
  const { onlineUser } = useSocketContext();
  const isOnline = selectedConversation && onlineUser.includes(selectedConversation._id);
  const isTyping = selectedConversation && typingByUser[selectedConversation._id];

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <main className={`app-shell min-h-0 flex-1 flex-col ${className}`}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <header className="app-panel flex items-center justify-between border-b px-3 py-3 sm:px-5 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="icon-button md:hidden"
                onClick={() => setSelectedConversation(null)}
                aria-label="Back to inbox"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <Avatar
                src={selectedConversation.profilePic}
                name={selectedConversation.fullName}
                isOnline={Boolean(isOnline)}
                size="lg"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold">{selectedConversation.fullName}</p>
                <p className="app-muted text-xs">{isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}</p>
              </div>
            </div>
            <label className="app-panel-strong hidden h-10 w-56 items-center gap-2 rounded-md border px-3 text-sm md:flex">
              <FiSearch className="app-muted h-4 w-4" />
              <input
                className="min-w-0 flex-1 bg-transparent outline-none"
                placeholder="Search messages"
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
              />
            </label>
          </header>

          <div className="min-h-0 flex-1">
            <Messages />
          </div>

          <div className="app-panel border-t px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:p-4">
            <MessageInput />
          </div>
        </>
      )}
    </main>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center px-6 text-center md:min-h-screen">
      <div className="app-panel mb-5 flex h-20 w-20 items-center justify-center rounded-md border">
        <TiMessage className="app-accent text-5xl" />
      </div>
      <p className="mb-2 text-2xl font-semibold">Welcome, {authUser.fullName}</p>
      <p className="app-muted max-w-md text-sm leading-6">
        Select a contact to start a secure real-time conversation.
      </p>
    </div>
  );
};
