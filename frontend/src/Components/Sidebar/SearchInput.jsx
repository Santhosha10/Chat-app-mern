import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustandStore/useConversation";
import useGetConversation from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    if (search.trim().length < 3) {
      return toast.error("Search with at least 3 characters");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <IoSearchSharp className="app-muted pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search people"
          className="app-input h-11 w-full rounded-md pl-10 pr-3 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="app-button-primary flex h-11 w-11 items-center justify-center rounded-md disabled:opacity-50"
        aria-label="Search"
      >
        <IoSearchSharp className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchInput;
