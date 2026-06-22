import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustandStore/useConversation";
import { extractTime } from "../../utils/MessageTime";
import Avatar from "../Avatar";
import toast from "react-hot-toast";
import { deleteMessageById, editMessageById, toggleMessageReaction } from "../../services/messageService";
import { FiCheck, FiCopy, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "👏"];

const Message = ({ message }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(message.message);
  const { authUser } = useAuthContext();
  const { selectedConversation, updateMessage } = useConversation();

  const fromMe = message.senderID === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const profileName = fromMe ? authUser.fullName : selectedConversation?.fullName;
  const bubbleClassName = fromMe ? "app-button-primary" : "app-panel-strong";
  const time = extractTime(message.createdAt);
  const isDeleted = Boolean(message.deletedAt);
  const groupedReactions = (message.reactions || []).reduce((acc, reaction) => {
    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
    return acc;
  }, {});

  const handleReaction = async (emoji) => {
    if (isDeleted) return;
    try {
      const updatedMessage = await toggleMessageReaction(message._id, emoji);
      updateMessage(updatedMessage);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCopy = async () => {
    if (isDeleted) return;
    try {
      await navigator.clipboard.writeText(message.message);
      toast.success("Message copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!draft.trim()) return toast.error("Message cannot be empty");

    try {
      const updatedMessage = await editMessageById(message._id, draft);
      updateMessage(updatedMessage);
      setIsEditing(false);
      toast.success("Message updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const updatedMessage = await deleteMessageById(message._id);
      updateMessage(updatedMessage);
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <Avatar src={profilePic} name={profileName} size="sm" />
      </div>
      <div className="group relative">
        {isEditing ? (
          <form className="app-panel-strong max-w-[78vw] rounded-md border p-2 sm:max-w-[70vw] md:max-w-xl" onSubmit={handleEdit}>
            <textarea
              className="app-input min-h-20 w-full resize-none rounded-md px-3 py-2 text-sm"
              value={draft}
              maxLength={2000}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                className="icon-button !h-8 !w-8"
                onClick={() => {
                  setDraft(message.message);
                  setIsEditing(false);
                }}
                aria-label="Cancel edit"
              >
                <FiX className="h-4 w-4" />
              </button>
              <button type="submit" className="app-button-primary rounded-md px-3 py-1 text-sm font-semibold">
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className={`chat-bubble max-w-[78vw] break-words rounded-md text-sm shadow-none sm:max-w-[70vw] md:max-w-xl ${isDeleted ? "app-panel-strong italic opacity-75" : bubbleClassName}`}>
            {message.message}
          </div>
        )}
        <div className={`mt-1 flex flex-wrap gap-1 ${fromMe ? "justify-end" : "justify-start"}`}>
          {Object.entries(groupedReactions).map(([emoji, count]) => (
            <button
              key={emoji}
              type="button"
              className="app-panel-strong rounded-full border px-2 py-0.5 text-xs"
              onClick={() => handleReaction(emoji)}
              aria-label={`React ${emoji}`}
            >
              {emoji} {count}
            </button>
          ))}
        </div>
        {!isEditing && (
        <div className={`mt-1 flex flex-wrap gap-1 opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100 ${fromMe ? "justify-end" : "justify-start"}`}>
          <button
            type="button"
            className="app-panel-strong rounded-full border px-2 py-1 text-xs"
            onClick={handleCopy}
            disabled={isDeleted}
            aria-label="Copy message"
          >
            <FiCopy className="h-3.5 w-3.5" />
          </button>
          {fromMe && !isDeleted && (
            <>
              <button
                type="button"
                className="app-panel-strong rounded-full border px-2 py-1 text-xs"
                onClick={() => setIsEditing(true)}
                aria-label="Edit message"
              >
                <FiEdit2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                className="app-panel-strong rounded-full border px-2 py-1 text-xs text-[var(--app-danger)]"
                onClick={handleDelete}
                aria-label="Delete message"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
              </button>
            </>
          )}
          {!isDeleted && reactionOptions.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="app-panel-strong rounded-full border px-2 py-1 text-xs"
              onClick={() => handleReaction(emoji)}
              aria-label={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
        )}
      </div>
      <div className="app-muted chat-footer flex items-center gap-1 text-xs">
        {time}
        {message.editedAt && !isDeleted && <span>edited</span>}
        {fromMe && <FiCheck className="h-3 w-3" aria-label="Sent" />}
      </div>
    </div>
  );
};

export default Message;
