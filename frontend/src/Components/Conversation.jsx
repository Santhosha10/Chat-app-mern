import useConversation from "../zustandStore/useConversation";
import { useSocketContext } from "../context/SocketContext";
import Avatar from "./Avatar";

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
          flex cursor-pointer items-center gap-3 rounded-md border p-3.5 transition md:border-transparent md:p-3
          ${isSelected ? "app-button-primary" : "hover:bg-[color-mix(in_srgb,var(--app-accent)_10%,transparent)]"}
        `}
        style={{ borderColor: isSelected ? "transparent" : "var(--app-border)" }}
      >
        <Avatar
          src={conversation.profilePic}
          name={conversation.fullName}
          isOnline={isOnline}
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {conversation.fullName}
          </p>
          <p className={`truncate text-xs ${isSelected ? "opacity-80" : "app-muted"}`}>
            {isOnline ? "Online now" : "Offline"}
          </p>
        </div>
      </div>

      {!lastIdx && <div className="mx-3 border-b" style={{ borderColor: "var(--app-border)" }}></div>}
    </>
  );
};

export default Conversation;
