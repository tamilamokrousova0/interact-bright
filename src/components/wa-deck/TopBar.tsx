import { RefreshCw, Sparkles, Users, Settings, Moon } from "lucide-react";
import { WaAccount } from "./types";

interface TopBarProps {
  activeAccount: WaAccount | null;
  totalAccounts: number;
  onOpenSettings: () => void;
}

export function TopBar({ activeAccount, totalAccounts, onOpenSettings }: TopBarProps) {
  return (
    <div className="h-10 bg-panel-header border-b border-border flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <button className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
          <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <button className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <button className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg">
          <Moon className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">2°C Чернигов</span>
        </div>
        {activeAccount && (
          <div className="px-3 py-1 bg-secondary rounded-lg">
            <span className="text-xs font-medium">{activeAccount.name}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[11px] text-muted-foreground">
            Готово. Аккаунтов: {totalAccounts}
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
        >
          <Settings className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
