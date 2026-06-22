import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustandStore/useConversation";
import { extractTime } from "../../utils/MessageTime";
import Avatar from "../Avatar";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderID === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const profileName = fromMe ? authUser.fullName : selectedConversation?.fullName;
  const bubbleClassName = fromMe ? "app-button-primary" : "app-panel-strong";
  const time = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <Avatar src={profilePic} name={profileName} size="sm" />
      </div>
      <div className={`chat-bubble max-w-[78vw] break-words rounded-md text-sm shadow-none sm:max-w-[70vw] md:max-w-xl ${bubbleClassName}`}>
        {message.message}
      </div>
      <div className="app-muted chat-footer flex items-center gap-1 text-xs">{time}</div>
    </div>
  );
};

export default Message;
