import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WaAccount } from "./types";
import { cn } from "@/lib/utils";

interface AccountSidebarProps {
  accounts: WaAccount[];
  activeAccount: string | null;
  onSelectAccount: (id: string) => void;
  onHubClick: () => void;
}

const colorMap: Record<string, string> = {
  blue: "bg-wa-blue",
  green: "bg-wa-green",
  orange: "bg-wa-orange",
  red: "bg-wa-red",
  purple: "bg-wa-purple",
  teal: "bg-wa-teal",
};

export function AccountSidebar({ accounts, activeAccount, onSelectAccount, onHubClick }: AccountSidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-[72px] min-w-[72px] bg-sidebar flex flex-col items-center py-3 gap-1 border-r border-sidebar-border">
      {/* Hub button */}
      <motion.button
        onClick={onHubClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-all duration-200",
          activeAccount === null
            ? "bg-primary/20 ring-2 ring-primary rounded-xl"
            : "bg-secondary hover:bg-sidebar-hover hover:rounded-xl"
        )}
      >
        <div className="w-6 h-6 relative">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute w-2 h-2 rounded-full bg-primary top-0 left-1/2 -translate-x-1/2" />
          <div className="absolute w-2 h-2 rounded-full bg-wa-blue bottom-0 left-0" />
          <div className="absolute w-2 h-2 rounded-full bg-wa-orange bottom-0 right-0" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-wa-teal top-1/2 left-0 -translate-y-1/2" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-wa-purple top-1/2 right-0 -translate-y-1/2" />
        </div>
      </motion.button>

      <div className="w-8 h-px bg-border mb-1" />

      {/* Account list */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center gap-1.5 w-full px-2">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
            className="relative group"
            onMouseEnter={() => setHoveredId(account.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.button
              onClick={() => onSelectAccount(account.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className={cn(
                "w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 relative",
                colorMap[account.color] || "bg-wa-blue",
                activeAccount === account.id
                  ? "rounded-xl ring-2 ring-foreground/30"
                  : "hover:rounded-xl opacity-80 hover:opacity-100"
              )}
            >
              <span className="text-xs font-bold text-primary-foreground leading-none">
                {account.shortName}
              </span>
            </motion.button>

            {/* Unread badge */}
            <AnimatePresence>
              {account.unread > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-wa-red rounded-full flex items-center justify-center"
                >
                  <span className="text-[10px] font-bold text-foreground">{account.unread}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status dot */}
            <motion.div
              animate={account.status === "connecting" ? { opacity: [1, 0.3, 1] } : {}}
              transition={account.status === "connecting" ? { repeat: Infinity, duration: 1.2 } : {}}
              className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-sidebar",
                account.status === "online" ? "bg-wa-green" : account.status === "connecting" ? "bg-wa-orange" : "bg-muted-foreground/40"
              )}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredId === account.id && (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-card px-3 py-1.5 rounded-lg shadow-lg z-50 whitespace-nowrap border border-border"
                >
                  <p className="text-sm font-medium">{account.name}</p>
                  <p className="text-xs text-muted-foreground">{account.status === "online" ? "● Онлайн" : account.status === "connecting" ? "● Подключение..." : "● Оффлайн"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="w-8 h-px bg-border my-1" />

      {/* Bottom actions */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-10 h-10 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors"
      >
        <Plus className="w-5 h-5 text-muted-foreground" />
      </motion.button>
    </div>
  );
}
