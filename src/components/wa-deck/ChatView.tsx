import { Send, Paperclip, Smile, Mic, Phone, Video, MoreVertical, Search } from "lucide-react";
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
        <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center mb-4">
          <Send className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">Выберите чат</h3>
        <p className="text-sm text-muted-foreground">Выберите чат из списка слева для начала общения</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-panel-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              {chat.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{chat.name}</p>
            <p className="text-xs text-muted-foreground">был(а) в сети недавно</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Video, Phone, Search, MoreVertical].map((Icon, i) => (
            <button key={i} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md ml-auto">
          <div className="bg-primary/15 rounded-2xl rounded-tr-sm px-4 py-2 mb-2">
            <p className="text-sm">Привет! Как дела?</p>
            <p className="text-[10px] text-muted-foreground text-right mt-1">14:32 ✓✓</p>
          </div>
        </div>
        <div className="max-w-md mr-auto">
          <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-2 mb-2 border border-border">
            <p className="text-sm">Привет! Всё отлично, спасибо 😊</p>
            <p className="text-[10px] text-muted-foreground text-right mt-1">14:33</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-panel-header">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-xl hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
            className="flex-1 px-4 py-2 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <button className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-colors hover:opacity-90 flex-shrink-0">
            {message ? (
              <Send className="w-4 h-4 text-primary-foreground" />
            ) : (
              <Mic className="w-4 h-4 text-primary-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
