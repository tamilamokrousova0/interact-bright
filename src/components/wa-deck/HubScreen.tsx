import { WaAccount } from "./types";
import { Settings, Plus, MessageSquare, Clock, Users } from "lucide-react";

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

export function HubScreen({ accounts, onSelectAccount, onOpenSettings }: HubScreenProps) {
  const totalUnread = accounts.reduce((s, a) => s + a.unread, 0);
  const onlineCount = accounts.filter((a) => a.status === "online").length;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Stats row */}
      <div className="flex gap-4 mb-10">
        <div className="bg-card rounded-2xl px-6 py-4 flex flex-col items-center min-w-[120px] border border-border">
          <Users className="w-5 h-5 text-wa-blue mb-2" />
          <span className="text-2xl font-bold">{accounts.length}</span>
          <span className="text-xs text-muted-foreground">Аккаунтов</span>
        </div>
        <div className="bg-card rounded-2xl px-6 py-4 flex flex-col items-center min-w-[120px] border border-border">
          <div className="w-5 h-5 rounded-full bg-wa-green mb-2 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">{onlineCount}</span>
          <span className="text-xs text-muted-foreground">Онлайн</span>
        </div>
        <div className="bg-card rounded-2xl px-6 py-4 flex flex-col items-center min-w-[120px] border border-border">
          <MessageSquare className="w-5 h-5 text-wa-orange mb-2" />
          <span className="text-2xl font-bold">{totalUnread}</span>
          <span className="text-xs text-muted-foreground">Непрочитано</span>
        </div>
        <div className="bg-card rounded-2xl px-6 py-4 flex flex-col items-center min-w-[120px] border border-border">
          <Clock className="w-5 h-5 text-wa-purple mb-2" />
          <span className="text-2xl font-bold">2</span>
          <span className="text-xs text-muted-foreground">Запланировано</span>
        </div>
      </div>

      {/* Account cards */}
      <div className="bg-card rounded-2xl border border-border w-full max-w-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-sm">Аккаунты WhatsApp</h2>
          <span className="text-xs text-muted-foreground">{onlineCount}/{accounts.length} онлайн</span>
        </div>
        <div className="divide-y divide-border">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => onSelectAccount(account.id)}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors text-left"
            >
              <div className={`w-9 h-9 rounded-xl ${colorMap[account.color]} flex items-center justify-center`}>
                <span className="text-xs font-bold text-primary-foreground">{account.shortName}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{account.name}</p>
                <p className="text-xs text-muted-foreground">{account.phone || "—"}</p>
              </div>
              <div className="flex items-center gap-2">
                {account.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {account.unread}
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      account.status === "online" ? "bg-wa-green" : account.status === "connecting" ? "bg-wa-orange" : "bg-muted-foreground/40"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {account.status === "online" ? "онлайн" : account.status === "connecting" ? "..." : "оффлайн"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl hover:bg-secondary/50 transition-colors text-sm"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
          Настройки
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity text-sm font-medium">
          <Plus className="w-4 h-4" />
          Добавить аккаунт
        </button>
      </div>
    </div>
  );
}
