import { RefreshCw, Sparkles, Users, Settings, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { WaAccount } from "./types";

interface TopBarProps {
  activeAccount: WaAccount | null;
  totalAccounts: number;
  onOpenSettings: () => void;
}

export function TopBar({ activeAccount, totalAccounts, onOpenSettings }: TopBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-10 bg-panel-header border-b border-border flex items-center justify-between px-3"
    >
      <div className="flex items-center gap-2">
        {[RefreshCw, Sparkles, Users].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
          >
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg">
          <Moon className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">2°C Чернигов</span>
        </div>
        {activeAccount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-secondary rounded-lg"
          >
            <span className="text-xs font-medium">{activeAccount.name}</span>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <span className="text-[11px] text-muted-foreground">
            Готово. Аккаунтов: {totalAccounts}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenSettings}
          className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
}
