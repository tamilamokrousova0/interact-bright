import { useState } from "react";
import { Plus, Settings, RefreshCw } from "lucide-react";
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
      <button
        onClick={onHubClick}
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-all duration-200",
          activeAccount === null
            ? "bg-primary/20 ring-2 ring-primary rounded-xl"
            : "bg-secondary hover:bg-sidebar-hover hover:rounded-xl"
        )}
      >
        <div className="w-6 h-6 relative">
          <div className="absolute w-2 h-2 rounded-full bg-primary top-0 left-1/2 -translate-x-1/2" />
          <div className="absolute w-2 h-2 rounded-full bg-wa-blue bottom-0 left-0" />
          <div className="absolute w-2 h-2 rounded-full bg-wa-orange bottom-0 right-0" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-wa-teal top-1/2 left-0 -translate-y-1/2" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-wa-purple top-1/2 right-0 -translate-y-1/2" />
        </div>
      </button>

      <div className="w-8 h-px bg-border mb-1" />

      {/* Account list */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center gap-1.5 w-full px-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(account.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button
              onClick={() => onSelectAccount(account.id)}
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
            </button>

            {/* Unread badge */}
            {account.unread > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-wa-red rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-foreground">{account.unread}</span>
              </div>
            )}

            {/* Status dot */}
            <div
              className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-sidebar",
                account.status === "online" ? "bg-wa-green" : account.status === "connecting" ? "bg-wa-orange" : "bg-muted-foreground/40"
              )}
            />

            {/* Tooltip */}
            {hoveredId === account.id && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-card px-3 py-1.5 rounded-lg shadow-lg z-50 whitespace-nowrap border border-border">
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground">{account.status === "online" ? "● Онлайн" : account.status === "connecting" ? "● Подключение..." : "● Оффлайн"}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-8 h-px bg-border my-1" />

      {/* Bottom actions */}
      <button className="w-10 h-10 rounded-xl bg-secondary hover:bg-sidebar-hover flex items-center justify-center transition-colors">
        <Plus className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}
