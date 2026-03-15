import { useState } from "react";
import { Search, Filter, MessageSquarePlus, MoreVertical } from "lucide-react";
import { Chat, WaAccount } from "./types";
import { cn } from "@/lib/utils";

interface ChatListProps {
  account: WaAccount;
  chats: Chat[];
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
}

type FilterType = "all" | "unread" | "favorites";

export function ChatList({ account, chats, selectedChat, onSelectChat }: ChatListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filtered = chats.filter((c) => {
    if (filter === "unread") return c.unread > 0;
    if (search) return c.name.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  return (
    <div className="w-[340px] min-w-[340px] bg-panel border-r border-border flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-panel-header">
        <h2 className="font-semibold text-lg">WhatsApp</h2>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <MessageSquarePlus className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск или новый чат"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 pb-2 flex gap-1.5">
        {(["all", "unread", "favorites"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {f === "all" ? "Все" : f === "unread" ? "Непрочитанные" : "Избранное"}
          </button>
        ))}
      </div>

      {/* Chat items */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left",
              selectedChat === chat.id && "bg-secondary"
            )}
          >
            <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              {chat.avatar ? (
                <img src={chat.avatar} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">
                  {chat.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">{chat.name}</span>
                <span className={cn("text-[11px] flex-shrink-0 ml-2", chat.unread > 0 ? "text-primary" : "text-muted-foreground")}>
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-muted-foreground truncate pr-2">
                  {chat.isRead && <span className="text-wa-blue">✓✓ </span>}
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border">
        <p className="text-[11px] text-muted-foreground text-center">
          🔒 Сообщения защищены сквозным шифрованием
        </p>
      </div>
    </div>
  );
}
