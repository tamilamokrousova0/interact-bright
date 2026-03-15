import { useState } from "react";
import { AccountSidebar } from "@/components/wa-deck/AccountSidebar";
import { TopBar } from "@/components/wa-deck/TopBar";
import { HubScreen } from "@/components/wa-deck/HubScreen";
import { ChatList } from "@/components/wa-deck/ChatList";
import { ChatView } from "@/components/wa-deck/ChatView";
import { SettingsPanel } from "@/components/wa-deck/SettingsPanel";
import { mockAccounts, mockChats } from "@/components/wa-deck/mockData";

const Index = () => {
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const account = activeAccount ? mockAccounts.find((a) => a.id === activeAccount) || null : null;
  const chat = selectedChat ? mockChats.find((c) => c.id === selectedChat) || null : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar
        activeAccount={account}
        totalAccounts={mockAccounts.length}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <div className="flex-1 flex overflow-hidden">
        <AccountSidebar
          accounts={mockAccounts}
          activeAccount={activeAccount}
          onSelectAccount={setActiveAccount}
          onHubClick={() => { setActiveAccount(null); setSelectedChat(null); }}
        />
        {activeAccount === null ? (
          <HubScreen
            accounts={mockAccounts}
            onSelectAccount={setActiveAccount}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        ) : (
          <>
            <ChatList
              account={account!}
              chats={mockChats}
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
            />
            <ChatView chat={chat} />
          </>
        )}
        <SettingsPanel
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          account={account}
        />
      </div>
    </div>
  );
};

export default Index;
