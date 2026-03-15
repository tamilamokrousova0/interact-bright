import { useState } from "react";
import { Search, MessageSquarePlus, MoreVertical, MessageSquare, Radio, Users, Megaphone, FileText, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Chat, WaAccount } from "./types";
import { cn } from "@/lib/utils";

interface ChatListProps {
  account: WaAccount;
  chats: Chat[];
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
}

type FilterType = "all" | "unread" | "favorites";

const sideIcons = [
  { icon: MessageSquare, label: "Чаты" },
  { icon: Radio, label: "Статус" },
  { icon: Megaphone, label: "Каналы" },
  { icon: Users, label: "Сообщества" },
];

export function ChatList({ account, chats, selectedChat, onSelectChat }: ChatListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [activeSideTab, setActiveSideTab] = useState(0);

  const filtered = chats.filter((c) => {
    if (filter === "unread") return c.unread > 0;
    if (search) return c.name.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      className="flex"
    >
      {/* Left icon sidebar */}
      <div className="w-12 min-w-12 bg-panel-header border-r border-border flex flex-col items-center py-3 gap-1">
        {sideIcons.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveSideTab(i)}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center transition-colors relative",
              activeSideTab === i ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <item.icon className="w-4.5 h-4.5" />
            {activeSideTab === i && (
              <motion.div
                layoutId="sideTabIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-0.5 w-1 h-5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
          </motion.button>
        ))}

        <div className="flex-1" />

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground flex items-center justify-center transition-colors"
        >
          <FileText className="w-4.5 h-4.5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground flex items-center justify-center transition-colors"
        >
          <UserCircle className="w-4.5 h-4.5" />
        </motion.button>
      </div>

      {/* Chat list */}
      <div className="w-[300px] min-w-[300px] bg-panel border-r border-border flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-panel-header">
          <h2 className="font-semibold text-lg">WhatsApp</h2>
          <div className="flex items-center gap-1">
            {[MessageSquarePlus, MoreVertical].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            ))}
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
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-3 pb-2 flex gap-1.5">
          {(["all", "unread", "favorites"] as FilterType[]).map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
              layout
            >
              {f === "all" ? "Все" : f === "unread" ? "Непрочитанные" : "Избранное"}
            </motion.button>
          ))}
        </div>

        {/* Chat items */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((chat, index) => (
              <motion.button
                key={chat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03, duration: 0.25 }}
                layout
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left",
                  selectedChat === chat.id && "bg-secondary"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="w-11 h-11 rounded-full bg-muted flex items-center justify-center flex-shrink-0"
                >
                  {chat.avatar ? (
                    <img src={chat.avatar} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">
                      {chat.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </motion.div>
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
                    <AnimatePresence>
                      {chat.unread > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          {chat.unread}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border">
          <p className="text-[11px] text-muted-foreground text-center">
            🔒 Ваши личные сообщения <span className="text-primary cursor-pointer hover:underline">защищены сквозным шифрованием</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
