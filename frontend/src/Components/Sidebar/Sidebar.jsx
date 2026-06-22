import { useAuthContext } from "../../context/AuthContext";
import SearchInput from "./SearchInput";
import Conversations from "../Conversations";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "../ThemeToggle";
import Avatar from "../Avatar";
import { useSocketContext } from "../../context/SocketContext";

const Sidebar = ({ className = "" }) => {
  const { authUser } = useAuthContext();
  const { isConnected } = useSocketContext();

  return (
    <aside className={`app-panel h-full w-full shrink-0 flex-col md:w-[360px] md:border-r ${className}`}>
      <div className="border-b px-4 pb-4 pt-5 sm:p-5" style={{ borderColor: "var(--app-border)" }}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="app-accent text-xs font-semibold uppercase tracking-[0.18em]">
              ChatWay
            </p>
            <h1 className="text-2xl font-semibold md:text-xl">Inbox</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
        <div className="app-panel-strong flex items-center gap-3 rounded-md border p-3 shadow-sm">
          <Avatar
            src={authUser?.profilePic}
            name={authUser?.fullName}
            isOnline={isConnected || Boolean(authUser)}
            size="md"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{authUser?.fullName}</p>
            <p className="app-muted truncate text-xs">
              {isConnected ? "Online" : "Connecting"} · @{authUser?.username}
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-2 pt-4">
        <SearchInput />
      </div>
      <Conversations />
    </aside>
  );
};

export default Sidebar;
