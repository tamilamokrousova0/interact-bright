import { useState } from "react";
import { X, Moon, ChevronDown, Paperclip, Trash2, Calendar, Eye, EyeOff, Save, Globe, Keyboard, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WaAccount, ScheduledMessage } from "./types";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  account: WaAccount | null;
}

type Section = "translator" | "templates" | "scheduled" | "worldclocks" | "hotkeys";

const shortcuts = [
  { action: "Переключить аккаунт", keys: ["⌘", "1...9"] },
  { action: "Открыть перевод", keys: ["⌘", "T"] },
  { action: "Настройки", keys: ["⌘", ","] },
  { action: "Обновить вкладку", keys: ["⌘", "R"] },
  { action: "Увеличить масштаб", keys: ["⌘", "+"] },
  { action: "Уменьшить масштаб", keys: ["⌘", "−"] },
  { action: "Сбросить масштаб", keys: ["⌘", "0"] },
  { action: "Обновить вкладку", keys: ["F5"] },
  { action: "Закрыть панель / модал", keys: ["Escape"] },
];

const defaultClocks = [
  { id: "1", label: "Москва", timezone: "Москва +3" },
  { id: "2", label: "Киев", timezone: "Киев +2/+3" },
  { id: "3", label: "Берлин", timezone: "Берлин +1/+2" },
];

export function SettingsPanel({ isOpen, onClose, account }: SettingsPanelProps) {
  const [openSection, setOpenSection] = useState<Section | null>(null);
  const [messageText, setMessageText] = useState("");
  const [scheduledTime, setScheduledTime] = useState("2026-03-16T01:25");
  const [translatorType, setTranslatorType] = useState<"deepl" | "libre">("libre");
  const [showApiKey, setShowApiKey] = useState(false);

  const [scheduledMessages] = useState<ScheduledMessage[]>([
    { id: "1", chatName: "Carsten DE61", message: "Напоминание о встрече завтра в 10:00", scheduledTime: "16.03.2026, 09:00", accountId: "1" },
    { id: "2", chatName: "+380 93 163 6131", message: "Отправить документы", scheduledTime: "16.03.2026, 12:00", accountId: "1" },
  ]);

  const toggle = (s: Section) => setOpenSection(openSection === s ? null : s);

  const sectionContent = {
    height: 0, opacity: 0,
  };
  const sectionAnimate = {
    height: "auto" as const, opacity: 1,
  };

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
          <div className="h-14 px-5 flex items-center justify-between border-b border-border bg-panel-header flex-shrink-0">
            <motion.h3
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-bold text-base whitespace-nowrap"
            >
              Настройки
            </motion.h3>
            <div className="flex items-center gap-1.5">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-9 h-9 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors">
                <Moon className="w-4 h-4 text-muted-foreground" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
          </div>

          {/* Account info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-4 mt-4 mb-3 px-4 py-3 bg-secondary/50 rounded-xl border border-border/50 flex-shrink-0"
          >
            <p className="text-sm text-muted-foreground">
              {account ? account.name : "Нет активного аккаунта"}
            </p>
          </motion.div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">

            {/* Translator settings */}
            <SettingsCard title="Настройки переводчика" icon={<Globe className="w-4 h-4" />} isOpen={openSection === "translator"} onClick={() => toggle("translator")}>
              <div className="space-y-4 p-4 pt-0">
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Переводчик по умолчанию</label>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTranslatorType("deepl")}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                        translatorType === "deepl" ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground"
                      )}
                    >
                      <div className={cn("w-3 h-3 rounded-full border-2", translatorType === "deepl" ? "border-primary bg-primary" : "border-muted-foreground")} />
                      DeepL
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTranslatorType("libre")}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                        translatorType === "libre" ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground"
                      )}
                    >
                      <div className={cn("w-3 h-3 rounded-full border-2", translatorType === "libre" ? "border-primary bg-primary" : "border-muted-foreground")} />
                      LibreTranslate
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors ml-auto">
                      <Save className="w-4 h-4 text-muted-foreground" />
                    </motion.button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">LibreTranslate URL</label>
                  <input className="w-full px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow" defaultValue="https://libretranslate.com/translate" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">LibreTranslate API Key</label>
                  <div className="flex gap-2">
                    <input
                      type={showApiKey ? "text" : "password"}
                      className="flex-1 px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                      defaultValue="sk-xxxxxxxxxxxx"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="w-10 h-10 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </motion.button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">Для публичного LibreTranslate ключ может не требоваться, для приватного сервера обычно нужен.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 bg-secondary rounded-xl text-sm hover:bg-sidebar-hover transition-colors"
                >
                  Проверить LibreTranslate API
                </motion.button>
              </div>
            </SettingsCard>

            {/* Templates */}
            <SettingsCard title="Общие шаблоны (2)" icon={<MessageIcon />} isOpen={openSection === "templates"} onClick={() => toggle("templates")}>
              <div className="space-y-3 p-4 pt-0">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Шаблон</label>
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} className="w-10 h-10 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </motion.button>
                    <select className="flex-1 px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none">
                      <option>Новый шаблон</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Название шаблона</label>
                  <input className="w-full px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow" placeholder="Например: Приветствие" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Текст шаблона</label>
                  <textarea className="w-full px-3 py-2.5 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-28 transition-shadow" placeholder="Текст шаблона, доступный для всех WhatsApp-аккаунтов и всех чатов" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                    Сохранить шаблон
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="py-2.5 bg-secondary rounded-xl text-sm hover:bg-sidebar-hover transition-colors">
                    Новый
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="py-2.5 bg-secondary rounded-xl text-sm hover:bg-sidebar-hover transition-colors">
                    Удалить
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="py-2.5 bg-secondary rounded-xl text-sm hover:bg-sidebar-hover transition-colors">
                    Вставить в чат
                  </motion.button>
                </div>
                <p className="text-[11px] text-muted-foreground">Шаблоны общие: работают для всех WhatsApp-аккаунтов и всех чатов.</p>
              </div>
            </SettingsCard>

            {/* Scheduled messages */}
            <SettingsCard title="Отложенная отправка" icon={<Calendar className="w-4 h-4" />} isOpen={openSection === "scheduled"} onClick={() => toggle("scheduled")} accent>
              <div className="space-y-4 p-4 pt-0">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Цель отправки</label>
                    <input className="w-full px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow" placeholder="Выберите WhatsApp и чат" readOnly />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-2 px-4 py-2.5 bg-secondary rounded-xl text-sm hover:bg-sidebar-hover transition-colors">
                      Выбрать WhatsApp и чат
                    </motion.button>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Текст сообщения"
                      className="w-full px-3 py-2.5 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-24 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Время отправки</label>
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 [color-scheme:dark] transition-shadow"
                    />
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-secondary rounded-xl text-xs hover:bg-sidebar-hover transition-colors">
                      <Paperclip className="w-3.5 h-3.5" />
                      Добавить вложения
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-secondary rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                      Очистить вложения
                    </motion.button>
                  </div>
                  <div className="px-3 py-2 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-muted-foreground">Вложений нет</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Запланировать
                  </motion.button>
                </div>

                {scheduledMessages.length > 0 ? (
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
                ) : (
                  <div className="px-3 py-2 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-muted-foreground">Активных отложенных сообщений нет</p>
                  </div>
                )}
              </div>
            </SettingsCard>

            {/* World clocks */}
            <SettingsCard title="Мировые часы" icon={<Clock className="w-4 h-4" />} isOpen={openSection === "worldclocks"} onClick={() => toggle("worldclocks")}>
              <div className="space-y-2 p-4 pt-0">
                {defaultClocks.map((clock, i) => (
                  <motion.div
                    key={clock.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2"
                  >
                    <input
                      className="w-24 px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
                      defaultValue={clock.label}
                    />
                    <select className="flex-1 px-3 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none">
                      <option>{clock.timezone}</option>
                    </select>
                    <motion.button whileHover={{ scale: 1.15 }} className="text-wa-red/70 hover:text-wa-red transition-colors">
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2.5 border border-dashed border-border rounded-xl text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  + Добавить
                </motion.button>
              </div>
            </SettingsCard>

            {/* Hotkeys */}
            <SettingsCard title="Горячие клавиши" icon={<Keyboard className="w-4 h-4" />} isOpen={openSection === "hotkeys"} onClick={() => toggle("hotkeys")}>
              <div className="p-4 pt-0 space-y-0.5">
                {shortcuts.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center justify-between py-2.5 px-1 rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm">{s.action}</span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k, ki) => (
                        <span key={ki}>
                          {ki > 0 && <span className="text-muted-foreground text-xs mx-0.5">+</span>}
                          <kbd className="px-2 py-1 bg-secondary rounded-lg text-xs font-mono text-muted-foreground border border-border/50">
                            {k}
                          </kbd>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </SettingsCard>

          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 bg-secondary text-sm rounded-xl hover:bg-sidebar-hover transition-colors font-medium"
            >
              Обновление
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MessageIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SettingsCard({
  title,
  icon,
  isOpen,
  onClick,
  accent,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      className={cn(
        "rounded-xl border overflow-hidden transition-colors",
        isOpen
          ? accent
            ? "border-wa-orange/40 bg-card"
            : "border-border/80 bg-card"
          : "border-border/40 bg-card/50 hover:bg-card/80"
      )}
    >
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className={cn("text-muted-foreground", accent && isOpen && "text-wa-orange")}>{icon}</span>
          <span className={cn("text-sm font-semibold", accent && isOpen ? "text-wa-orange" : "text-foreground")}>
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
          <ChevronDown className={cn("w-4 h-4", isOpen ? "text-foreground" : "text-muted-foreground")} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
