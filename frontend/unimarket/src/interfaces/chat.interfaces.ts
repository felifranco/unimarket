export interface chatWebSocketMessage {
  action: string;
  profile_picture: string;
  name: string;
  from: string;
  to: string;
  message: string;
}

export interface chatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  attachment?: string;
  attachmentName?: string;
}

export interface chatUser {
  uuid: string;
  profile_picture: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}
