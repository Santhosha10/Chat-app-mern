import Conversation from "./Conversation";
import useGetConversations from "../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="app-muted mb-2 flex items-center justify-between px-2 pt-2 text-xs font-semibold uppercase tracking-[0.14em]">
        <span>Recent chats</span>
        <span>{conversations.length}</span>
      </div>
      <div className="space-y-2 md:space-y-1">
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))}
      </div>

      {loading && <span className="loading loading-spinner mx-auto mt-8 block" />}
      {!loading && conversations.length === 0 && (
        <p className="app-muted px-2 py-6 text-sm">No contacts available yet.</p>
      )}
    </div>
  );
};

export default Conversations;
