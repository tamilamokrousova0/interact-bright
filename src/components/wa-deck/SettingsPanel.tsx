import { useState } from "react";
import { X, Moon, ChevronDown, ChevronUp, Paperclip, Trash2, Calendar } from "lucide-react";
import { WaAccount, ScheduledMessage } from "./types";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  account: WaAccount | null;
}

type Section = "proxy" | "templates" | "scheduled";

export function SettingsPanel({ isOpen, onClose, account }: SettingsPanelProps) {
  const [openSection, setOpenSection] = useState<Section | null>("scheduled");
  const [messageText, setMessageText] = useState("");
  const [scheduledTime, setScheduledTime] = useState("2026-03-16T01:25");

  const [scheduledMessages] = useState<ScheduledMessage[]>([
    { id: "1", chatName: "Carsten DE61", message: "Напоминание о встрече завтра в 10:00", scheduledTime: "16.03.2026, 09:00", accountId: "1" },
    { id: "2", chatName: "+380 93 163 6131", message: "Отправить документы", scheduledTime: "16.03.2026, 12:00", accountId: "1" },
  ]);

  const toggle = (s: Section) => setOpenSection(openSection === s ? null : s);

  if (!isOpen) return null;

  return (
    <div className="w-[380px] min-w-[380px] bg-card border-l border-border flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-panel-header">
        <h3 className="font-semibold text-sm">Настройки</h3>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Moon className="w-4 h-4 text-muted-foreground" />
          </button>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Account info */}
      {account && (
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs text-muted-foreground">Аккаунт</p>
          <p className="text-sm font-medium mt-0.5">{account.name}</p>
        </div>
      )}

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Proxy settings */}
        <SectionHeader title="Настройки прокси" isOpen={openSection === "proxy"} onClick={() => toggle("proxy")} />
        {openSection === "proxy" && (
          <div className="px-4 py-3 border-b border-border">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Тип</label>
                <select className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>SOCKS5</option>
                  <option>HTTP</option>
                  <option>HTTPS</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground">Хост</label>
                  <input className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="proxy.example.com" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Порт</label>
                  <input className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="1080" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates */}
        <SectionHeader
          title="Общие шаблоны"
          count={2}
          isOpen={openSection === "templates"}
          onClick={() => toggle("templates")}
        />
        {openSection === "templates" && (
          <div className="px-4 py-3 border-b border-border space-y-2">
            {["Добрый день! Как могу помочь?", "Спасибо за обращение! Мы ответим в течение часа."].map((t, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 bg-secondary rounded-xl">
                <p className="text-sm flex-1 truncate">{t}</p>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button className="w-full py-2 border border-dashed border-border rounded-xl text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
              + Добавить шаблон
            </button>
          </div>
        )}

        {/* Scheduled messages */}
        <SectionHeader
          title="Отложенная отправка"
          isOpen={openSection === "scheduled"}
          onClick={() => toggle("scheduled")}
          accent
        />
        {openSection === "scheduled" && (
          <div className="px-4 py-3 border-b border-border space-y-4">
            {/* New message form */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Цель отправки</label>
                <button className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm text-left text-muted-foreground hover:text-foreground transition-colors">
                  Выбрать WhatsApp и чат
                </button>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Сообщение</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Текст сообщения"
                  className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-20"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Время отправки</label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 [color-scheme:dark]"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-secondary rounded-lg text-xs hover:bg-sidebar-hover transition-colors">
                  <Paperclip className="w-3.5 h-3.5" />
                  Вложения
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Очистить
                </button>
              </div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                Запланировать
              </button>
            </div>

            {/* Existing scheduled */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Запланировано ({scheduledMessages.length})</p>
              {scheduledMessages.map((sm) => (
                <div key={sm.id} className="p-3 bg-secondary rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{sm.chatName}</span>
                    <button className="text-muted-foreground hover:text-wa-red transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{sm.message}</p>
                  <div className="flex items-center gap-1 text-[11px] text-primary">
                    <Calendar className="w-3 h-3" />
                    {sm.scheduledTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <button className="w-full py-2 bg-secondary text-sm rounded-xl hover:bg-sidebar-hover transition-colors">
          Обновление
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ title, count, isOpen, onClick, accent }: { title: string; count?: number; isOpen: boolean; onClick: () => void; accent?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 border-b border-border hover:bg-secondary/30 transition-colors text-left",
        accent && isOpen && "bg-primary/5"
      )}
    >
      <span className={cn("text-sm font-medium", accent && "text-primary")}>
        {title}{count !== undefined ? ` (${count})` : ""}
      </span>
      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
}
