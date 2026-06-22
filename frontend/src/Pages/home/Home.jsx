import Sidebar from "../../Components/Sidebar/Sidebar";
import MessageContainer from "../../Components/messages/MessageContainer";
import useConversation from "../../zustandStore/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="app-shell flex h-[100dvh] w-full overflow-hidden md:h-screen md:flex-row">
      <Sidebar className={selectedConversation ? "hidden md:flex" : "flex"} />
      <MessageContainer className={selectedConversation ? "flex" : "hidden md:flex"} />
    </div>
  );
};

export default Home;
