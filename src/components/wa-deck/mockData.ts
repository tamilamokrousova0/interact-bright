import { WaAccount, Chat } from "./types";

export const mockAccounts: WaAccount[] = [
  { id: "1", name: "K3 WP_3_x3", shortName: "K3", color: "blue", status: "online", unread: 0, phone: "+49 151 234 5678" },
  { id: "2", name: "K3 WP_4_x4", shortName: "K3", color: "orange", status: "online", unread: 0, phone: "+49 152 345 6789" },
  { id: "3", name: "K2 WP_1_x6", shortName: "K2", color: "red", status: "online", unread: 1, phone: "+380 93 163 6131" },
  { id: "4", name: "K2 WP_2_x7", shortName: "K2", color: "purple", status: "online", unread: 0, phone: "+380 67 234 5678" },
  { id: "5", name: "K2 WP_3_x1", shortName: "K2", color: "blue", status: "online", unread: 0, phone: "+380 50 345 6789" },
];

export const mockChats: Chat[] = [
  { id: "c1", name: "+380 93 163 6131 (Вы)", lastMessage: "Чат WhatsApp с контактом Carsten ...", time: "00:48", unread: 0, isRead: true },
  { id: "c2", name: "Carsten DE61", lastMessage: "Er hatte recht 😊 Hast du mal probiert, o...", time: "Вчера", unread: 0, isRead: true },
  { id: "c3", name: "Олег Бизнес", lastMessage: "Отправь документы до конца дня", time: "Вчера", unread: 2, isRead: false },
  { id: "c4", name: "Команда Маркетинг", lastMessage: "Встреча перенесена на 15:00", time: "Пн", unread: 0, isRead: true },
  { id: "c5", name: "Поддержка Клиентов", lastMessage: "Билет #4521 решён", time: "Пн", unread: 0, isRead: true },
];
