import { useState, useEffect } from "react";
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

const statusDotColor: Record<string, string> = {
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
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const worldClocks = [
  { label: "МОСКВА", tz: "Europe/Moscow" },
  { label: "КИЕВ", tz: "Europe/Kiev" },
  { label: "БЕРЛИН", tz: "Europe/Berlin" },
];

function useWorldTime() {
  const [times, setTimes] = useState<Record<string, string>>({});
  useEffect(() => {
    const update = () => {
      const t: Record<string, string> = {};
      worldClocks.forEach(({ label, tz }) => {
        const d = new Date();
        t[label] = d.toLocaleTimeString("ru-RU", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
      });
      setTimes(t);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return times;
}

export function HubScreen({ accounts, onSelectAccount, onOpenSettings }: HubScreenProps) {
  const totalUnread = accounts.reduce((s, a) => s + a.unread, 0);
  const onlineCount = accounts.filter((a) => a.status === "online").length;
  const times = useWorldTime();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Background decoration — moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-8 right-16 w-40 h-40 pointer-events-none"
      >
        <div className="w-full h-full rounded-full border-[6px] border-foreground/60 relative">
          <div className="absolute top-2 right-2 w-28 h-28 rounded-full bg-background" />
        </div>
      </motion.div>

      {/* Background mountains */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none overflow-hidden opacity-[0.06]">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-foreground"
            style={{ left: `${i * 14 - 4}%`, transform: `scale(${0.8 + (i % 3) * 0.3})` }}
          />
        ))}
      </div>

      {/* Hub icon */}
      <motion.div
        variants={item}
        className="flex flex-col items-center mb-2"
      >
        <div className="w-12 h-12 relative mb-3">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute w-2.5 h-2.5 rounded-full bg-primary top-0 left-1/2 -translate-x-1/2" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-wa-blue bottom-0 left-1" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-wa-orange bottom-0 right-1" />
          <div className="absolute w-2 h-2 rounded-full bg-wa-teal top-1/2 left-0 -translate-y-1/2" />
          <div className="absolute w-2 h-2 rounded-full bg-wa-purple top-1/2 right-0 -translate-y-1/2" />
          {/* connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 48 48">
            <line x1="24" y1="5" x2="5" y2="38" stroke="currentColor" strokeWidth="0.5" />
            <line x1="24" y1="5" x2="43" y2="38" stroke="currentColor" strokeWidth="0.5" />
            <line x1="24" y1="5" x2="0" y2="24" stroke="currentColor" strokeWidth="0.5" />
            <line x1="24" y1="5" x2="48" y2="24" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight">WA Deck</h1>
        <p className="text-sm text-muted-foreground mt-1">Хаб режим. Выберите WhatsApp слева.</p>
      </motion.div>

      {/* World clocks */}
      <motion.div variants={item} className="flex gap-8 mb-8 mt-4">
        {worldClocks.map(({ label }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-3xl font-mono font-bold tracking-wider tabular-nums">
              {times[label] || "--:--"}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium tracking-widest mt-1">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Account list card */}
      <motion.div
        variants={item}
        className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/60 w-full max-w-lg overflow-hidden"
      >
        <div className="divide-y divide-border/50">
          {accounts.map((account, index) => (
            <motion.button
              key={account.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.06 }}
              whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.4)" }}
              onClick={() => onSelectAccount(account.id)}
              className="w-full flex items-center gap-3 px-5 py-3 transition-colors text-left group"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${statusDotColor[account.color]} flex-shrink-0`} />
              <span className="text-sm flex-1">{account.name}</span>
              {account.unread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="bg-wa-red text-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {account.unread}
                </motion.span>
              )}
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${account.status === "online" ? "bg-wa-green" : "bg-muted-foreground/40"}`} />
                <span className="text-xs text-muted-foreground">
                  {account.status === "online" ? "онлайн" : "оффлайн"}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div variants={item} className="flex gap-3 mt-5">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-5 py-2.5 bg-card/60 border border-border/60 rounded-xl hover:bg-secondary/50 backdrop-blur-sm transition-colors text-sm"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
          Настройки
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Аккаунт
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
