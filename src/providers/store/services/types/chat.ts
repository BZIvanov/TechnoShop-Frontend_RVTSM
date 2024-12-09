import { Image } from "./common";

export interface Chat {
  _id: string;
  participants: {
    user: {
      _id: string;
      username: string;
      avatar: Image;
    };
    role: "admin" | "seller" | "buyer";
  }[];
  chatType: "buyer-seller" | "seller-admin";
  mostRecentMessage: string;
}

export interface Message {
  _id: string;
  chat: string;
  sender: {
    _id: string;
    avatar: Image;
  };
  content: string;
  createdAt: string;
}

export interface ChatsResponse {
  success: boolean;
  chats: Chat[];
}

export interface ChatResponse {
  success: boolean;
  chat: Chat;
}

export interface ChatParams {
  receiverId: string;
}

export interface ChatMessagesParams {
  chatId: string;
}

export interface ChatMessagesResponse {
  success: boolean;
  messages: Message[];
}

export interface CreateChatInput {
  receiverId: string;
}