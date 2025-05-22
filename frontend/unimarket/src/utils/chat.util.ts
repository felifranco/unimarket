import { chatWebSocketMessage } from "../interfaces/chat.interfaces";

export const sendChatMessage = ({
  profile_picture,
  name,
  from,
  to,
  message,
}: {
  profile_picture: string;
  name: string;
  from: string;
  to: string;
  message: string;
}): string => {
  const msg: chatWebSocketMessage = {
    profile_picture,
    name,
    action: "sendMessage",
    from,
    to,
    message: message,
  };
  return JSON.stringify(msg);
};
