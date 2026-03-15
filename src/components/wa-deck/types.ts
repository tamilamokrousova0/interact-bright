export interface WaAccount {
  id: string;
  name: string;
  shortName: string;
  color: string;
  status: "online" | "offline" | "connecting";
  unread: number;
  phone?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  isRead: boolean;
}

export interface ScheduledMessage {
  id: string;
  chatName: string;
  message: string;
  scheduledTime: string;
  accountId: string;
}
