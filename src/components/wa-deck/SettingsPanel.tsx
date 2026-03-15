import { useState } from "react";
import { X, Moon, ChevronDown, ChevronUp, Paperclip, Trash2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 380, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="min-w-0 bg-card border-l border-border flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-panel-header flex-shrink-0">
            <motion.h3
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-semibold text-sm whitespace-nowrap"
            >
              Настройки
            </motion.h3>
            <div className="flex items-center gap-1">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                <Moon className="w-4 h-4 text-muted-foreground" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
          </div>

          {/* Account info */}
          {account && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-3 border-b border-border flex-shrink-0"
            >
              <p className="text-xs text-muted-foreground">Аккаунт</p>
              <p className="text-sm font-medium mt-0.5">{account.name}</p>
            </motion.div>
          )}

          {/* Sections */}
          <div className="flex-1 overflow-y-auto">
            {/* Proxy settings */}
            <SectionHeader title="Настройки прокси" isOpen={openSection === "proxy"} onClick={() => toggle("proxy")} />
            <AnimatePresence>
              {openSection === "proxy" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Templates */}
            <SectionHeader title="Общие шаблоны" count={2} isOpen={openSection === "templates"} onClick={() => toggle("templates")} />
            <AnimatePresence>
              {openSection === "templates" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border space-y-2">
                    {["Добрый день! Как могу помочь?", "Спасибо за обращение! Мы ответим в течение часа."].map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2 p-2.5 bg-secondary rounded-xl group"
                      >
                        <p className="text-sm flex-1 truncate">{t}</p>
                        <motion.button whileHover={{ scale: 1.2 }} className="text-muted-foreground hover:text-wa-red transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02, borderColor: "hsl(var(--foreground) / 0.3)" }}
                      className="w-full py-2 border border-dashed border-border rounded-xl text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      + Добавить шаблон
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scheduled messages */}
            <SectionHeader title="Отложенная отправка" isOpen={openSection === "scheduled"} onClick={() => toggle("scheduled")} accent />
            <AnimatePresence>
              {openSection === "scheduled" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border space-y-4">
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
                          className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-20 transition-shadow duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Время отправки</label>
                        <input
                          type="datetime-local"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 [color-scheme:dark] transition-shadow duration-200"
                        />
                      </div>
                      <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-secondary rounded-lg text-xs hover:bg-sidebar-hover transition-colors">
                          <Paperclip className="w-3.5 h-3.5" />
                          Вложения
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                          Очистить
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Запланировать
                      </motion.button>
                    </div>

                    {/* Existing scheduled */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Запланировано ({scheduledMessages.length})</p>
                      {scheduledMessages.map((sm, i) => (
                        <motion.div
                          key={sm.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ scale: 1.01 }}
                          className="p-3 bg-secondary rounded-xl space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{sm.chatName}</span>
                            <motion.button whileHover={{ scale: 1.2 }} className="text-muted-foreground hover:text-wa-red transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{sm.message}</p>
                          <div className="flex items-center gap-1 text-[11px] text-primary">
                            <Calendar className="w-3 h-3" />
                            {sm.scheduledTime}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 bg-secondary text-sm rounded-xl hover:bg-sidebar-hover transition-colors"
            >
              Обновление
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionHeader({ title, count, isOpen, onClick, accent }: { title: string; count?: number; isOpen: boolean; onClick: () => void; accent?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 border-b border-border hover:bg-secondary/30 transition-colors text-left",
        accent && isOpen && "bg-primary/5"
      )}
    >
      <span className={cn("text-sm font-medium whitespace-nowrap", accent && "text-primary")}>
        {title}{count !== undefined ? ` (${count})` : ""}
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </motion.button>
  );
}
