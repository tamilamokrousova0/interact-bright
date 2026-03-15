import { WaAccount } from "./types";
import { Settings, Plus, MessageSquare, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

interface HubScreenProps {
  accounts: WaAccount[];
  onSelectAccount: (id: string) => void;
  onOpenSettings: () => void;
}

const colorMap: Record<string, string> = {
  blue: "bg-wa-blue",
  green: "bg-wa-green",
  orange: "bg-wa-orange",
  red: "bg-wa-red",
  purple: "bg-wa-purple",
  teal: "bg-wa-teal",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function HubScreen({ accounts, onSelectAccount, onOpenSettings }: HubScreenProps) {
  const totalUnread = accounts.reduce((s, a) => s + a.unread, 0);
  const onlineCount = accounts.filter((a) => a.status === "online").length;

  const stats = [
    { icon: <Users className="w-5 h-5 text-wa-blue" />, value: accounts.length, label: "Аккаунтов" },
    { icon: <div className="w-5 h-5 rounded-full bg-wa-green flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary-foreground" /></div>, value: onlineCount, label: "Онлайн" },
    { icon: <MessageSquare className="w-5 h-5 text-wa-orange" />, value: totalUnread, label: "Непрочитано" },
    { icon: <Clock className="w-5 h-5 text-wa-purple" />, value: 2, label: "Запланировано" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 flex flex-col items-center justify-center p-8"
    >
      {/* Stats row */}
      <div className="flex gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -4, boxShadow: "0 8px 24px hsl(var(--primary) / 0.08)" }}
            className="bg-card rounded-2xl px-6 py-4 flex flex-col items-center min-w-[120px] border border-border cursor-default"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
              className="mb-2"
            >
              {s.icon}
            </motion.div>
            <span className="text-2xl font-bold">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Account cards */}
      <motion.div variants={item} className="bg-card rounded-2xl border border-border w-full max-w-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-sm">Аккаунты WhatsApp</h2>
          <span className="text-xs text-muted-foreground">{onlineCount}/{accounts.length} онлайн</span>
        </div>
        <div className="divide-y divide-border">
          {accounts.map((account, index) => (
            <motion.button
              key={account.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.06 }}
              whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
              onClick={() => onSelectAccount(account.id)}
              className="w-full flex items-center gap-3 px-5 py-3 transition-colors text-left"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className={`w-9 h-9 rounded-xl ${colorMap[account.color]} flex items-center justify-center`}
              >
                <span className="text-xs font-bold text-primary-foreground">{account.shortName}</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{account.name}</p>
                <p className="text-xs text-muted-foreground">{account.phone || "—"}</p>
              </div>
              <div className="flex items-center gap-2">
                {account.unread > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  >
                    {account.unread}
                  </motion.span>
                )}
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${account.status === "online" ? "bg-wa-green" : account.status === "connecting" ? "bg-wa-orange" : "bg-muted-foreground/40"}`} />
                  <span className="text-xs text-muted-foreground">
                    {account.status === "online" ? "онлайн" : account.status === "connecting" ? "..." : "оффлайн"}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div variants={item} className="flex gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl hover:bg-secondary/50 transition-colors text-sm"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
          Настройки
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Добавить аккаунт
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
