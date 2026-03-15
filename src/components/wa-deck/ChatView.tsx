import { Send, Paperclip, Smile, Mic, Phone, Video, MoreVertical, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Chat } from "./types";
import { useState } from "react";

interface ChatViewProps {
  chat: Chat | null;
}

export function ChatView({ chat }: ChatViewProps) {
  const [message, setMessage] = useState("");

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center mb-4"
        >
          <Send className="w-7 h-7 text-muted-foreground" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-lg font-medium mb-1"
        >
          Выберите чат
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-muted-foreground"
        >
          Выберите чат из списка слева для начала общения
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      key={chat.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col bg-background"
    >
      {/* Chat header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-panel-header">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {chat.name.slice(0, 2).toUpperCase()}
            </span>
          </motion.div>
          <div>
            <p className="text-sm font-medium">{chat.name}</p>
            <p className="text-xs text-muted-foreground">был(а) в сети недавно</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Video, Phone, Search, MoreVertical].map((Icon, i) => (
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

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="max-w-md ml-auto"
        >
          <div className="bg-primary/15 rounded-2xl rounded-tr-sm px-4 py-2 mb-2">
            <p className="text-sm">Привет! Как дела?</p>
            <p className="text-[10px] text-muted-foreground text-right mt-1">14:32 ✓✓</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="max-w-md mr-auto"
        >
          <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-2 mb-2 border border-border">
            <p className="text-sm">Привет! Всё отлично, спасибо 😊</p>
            <p className="text-[10px] text-muted-foreground text-right mt-1">14:33</p>
          </div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-panel-header">
        <div className="flex items-center gap-2">
          {[Smile, Paperclip].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
            className="flex-1 px-4 py-2 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-colors hover:opacity-90 flex-shrink-0"
          >
            <AnimatePresence mode="wait">
              {message ? (
                <motion.div key="send" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                  <Send className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              ) : (
                <motion.div key="mic" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <Mic className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
