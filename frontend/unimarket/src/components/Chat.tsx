import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  attachment?: string;
  attachmentName?: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "me",
    text: "¡Hola! ¿En qué puedo ayudarte?",
    time: "10:00",
  },
  {
    id: 2,
    sender: "other",
    text: "Hola, estoy interesado en tu producto.",
    time: "10:01",
  },
  {
    id: 3,
    sender: "me",
    text: "¡Perfecto! ¿Tienes alguna pregunta?",
    time: "10:02",
  },
];

const users = [
  {
    id: 1,
    name: "Juan Pérez",
    avatar: "/assets/images/thumbs/vendors-two-icon1.png",
    lastMessage: "¿Tienes fotos adicionales?",
    time: "09:58",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "María López",
    avatar: "/assets/images/thumbs/vendors-two-icon2.png",
    lastMessage: "Gracias por la información.",
    time: "Ayer",
    unread: 0,
    online: false,
  },
];

const emojiList = [
  "😀",
  "😂",
  "😍",
  "👍",
  "🙏",
  "🎉",
  "😎",
  "😢",
  "😡",
  "❤️",
  "🔥",
  "🥳",
  "🤔",
  "🙌",
  "😅",
];

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // No auto-scroll al enviar mensaje, solo si el usuario ya está abajo
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    // Si está cerca del fondo, permitir auto-scroll
    setIsAtBottom(
      container.scrollHeight - container.scrollTop - container.clientHeight <
        50,
    );
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !attachment) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        attachment: attachment ? URL.createObjectURL(attachment) : undefined,
        attachmentName: attachment ? attachment.name : undefined,
      },
    ]);
    setInput("");
    setAttachment(null);
    setShowEmoji(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setInput(input + emoji);
    setShowEmoji(false);
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <section className="container py-4 mt-10 mb-10">
      <div
        className="row g-0 border shadow-lg p-3 mb-5 rounded-20 overflow-hidden bg-white"
        style={{ minHeight: 500 }}
      >
        {/* Sidebar de usuarios */}
        <aside
          className="col-12 col-md-4 border-end bg-light d-flex flex-column"
          style={{ minHeight: 500 }}
        >
          <div className="p-10 border-bottom bg-white">
            <h5 className="mb-0 fw-bold">Chats</h5>
          </div>
          <div className="flex-grow-1 overflow-auto">
            {users.map(user => (
              <div
                key={user.id}
                className={`d-flex align-items-center gap-10 p-10 chat-user-list-item ${selectedUser.id === user.id ? "bg-main-50" : ""} pointer`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(user)}
              >
                <div className="position-relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle"
                    width={48}
                    height={48}
                  />
                  {user.online && (
                    <span
                      className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-white rounded-circle"
                      style={{ width: 12, height: 12 }}
                    />
                  )}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-truncate">{user.name}</div>
                  <div className="small text-muted text-truncate">
                    {user.lastMessage}
                  </div>
                </div>
                <div className="text-end">
                  <div className="small text-muted">{user.time}</div>
                  {user.unread > 0 && (
                    <span className="badge bg-main-600 text-white rounded-pill ms-1">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
        {/* Panel de chat */}
        <main
          className="col-12 col-md-8 d-flex flex-column"
          style={{ minHeight: 500 }}
        >
          {/* Header del chat */}
          <div className="d-flex align-items-center gap-10 border-bottom p-10 bg-white">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="rounded-circle"
              width={48}
              height={48}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold">{selectedUser.name}</div>
              <div className="small text-success">
                {selectedUser.online ? "En línea" : "Desconectado"}
              </div>
            </div>
            <button
              className="group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
              title="Llamar"
            >
              <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                <i className="ph-fill ph-phone text-lg" />
              </span>
            </button>
            <button
              className="group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
              title="Video"
            >
              <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                <i className="ph-fill ph-video-camera text-lg" />
              </span>
            </button>
            <button
              className="group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
              title="Más opciones"
            >
              <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                <i className="ph-fill ph-dots-three-outline text-lg" />
              </span>
            </button>
          </div>
          {/* Mensajes */}
          <div
            className="flex-grow-1 px-3 py-4 bg-light custom-scroll"
            style={{
              minHeight: 0,
              maxHeight: 400,
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}
            ref={messagesContainerRef}
            onScroll={handleScroll}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`px-10 py-10 d-flex mb-3 ${msg.sender === "me" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-8 rounded-4 shadow-sm ${msg.sender === "me" ? "bg-main-600 text-white" : "bg-white border"}`}
                  style={{ maxWidth: "75%" }}
                >
                  <div>{msg.text}</div>
                  {msg.attachment && (
                    <div className="mt-2">
                      <a
                        href={msg.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-inline-flex align-items-center text-decoration-none"
                      >
                        <i className="ph-fill ph-paperclip me-2" />
                        {msg.attachmentName || "Adjunto"}
                      </a>
                    </div>
                  )}
                  <div
                    className={`mt-2 small fw-semibold d-flex justify-content-end`}
                  >
                    {/* {msg.sender === "me" ? "Tú" : selectedUser.name} */}
                    <span className="ms-2 small text-muted">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Input de mensaje */}
          <form
            className="p-10 border-top bg-white"
            onSubmit={handleSend}
            autoComplete="off"
          >
            <div className="input-group align-items-end">
              <button
                type="button"
                className="m-5 group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
                style={{ width: 40, height: 40 }}
                title="Adjuntar archivo"
                onClick={() =>
                  document.getElementById("chat-attachment")?.click()
                }
              >
                <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                  <i className="ph ph-paperclip text-lg" />
                </span>
              </button>
              <input
                id="chat-attachment"
                type="file"
                style={{ display: "none" }}
                onChange={handleAttachment}
              />
              <button
                type="button"
                className="m-5 group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
                style={{ width: 40, height: 40 }}
                title="Emojis"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                  <i className="ph ph-smiley text-lg" />
                </span>
              </button>
              <div style={{ position: "relative" }}>
                {showEmoji && (
                  <div
                    className="border rounded-4 p-2 bg-white shadow position-absolute bottom-100 mb-2 z-3 d-flex flex-wrap"
                    style={{ minWidth: 220 }}
                  >
                    {emojiList.map((emoji, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="btn btn-light btn-sm m-1 fs-4"
                        style={{ minWidth: 36 }}
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                className="form-control rounded-pill px-20"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ minHeight: 48 }}
              />
              <button
                className="btn btn-main rounded-pill ms-10 px-10 d-flex align-items-center"
                type="submit"
                disabled={!input.trim() && !attachment}
              >
                <i className="ph-fill ph-paper-plane text-lg me-2" />
                Enviar
              </button>
            </div>
            {attachment && (
              <div className="mt-2 small text-muted d-flex align-items-center gap-2">
                <i className="ph-fill ph-paperclip" /> {attachment.name}
                <button
                  type="button"
                  className="btn btn-link btn-sm text-danger p-0 ms-2"
                  onClick={() => setAttachment(null)}
                >
                  Quitar
                </button>
              </div>
            )}
          </form>
        </main>
      </div>
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #bdbdbd;
        }
      `}</style>
    </section>
  );
};

export default Chat;
