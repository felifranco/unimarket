import { useState, useRef, useEffect } from "react";
import { service } from "../config/configurations";
import { chatMessage, chatUser } from "../interfaces/chat.interfaces";
import { sendChatMessage } from "../utils/chat.util";
import {
  setConnected,
  addUser,
  setSelectedUser,
  addMessage,
} from "../store/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import "bootstrap/dist/css/bootstrap.min.css";

const WEB_SOCKET_SERVICE = service.WEB_SOCKET_SERVICE;

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
  const dispatch = useAppDispatch();

  const ws = useRef<WebSocket | null>(null);

  const uuid = useAppSelector(state => state.auth.uuid);
  const nombre_completo = useAppSelector(state => state.auth.nombre_completo);
  const imagen_perfil = useAppSelector(state => state.auth.imagen_perfil);
  const isConnected = useAppSelector(state => state.chat.isConnected);

  const messages = useAppSelector(state => state.chat.messages);
  const users = useAppSelector(state => state.chat.users);
  const selectedUser = useAppSelector(state => state.chat.selectedUser);

  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // No auto-scroll al enviar mensaje, solo si el usuario ya está abajo
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    // Si está cerca del fondo, permitir auto-scroll
    setIsAtBottom(
      container.scrollHeight - container.scrollTop - container.clientHeight <
        50,
    );
  };

  const connectWebSocket = () => {
    if (
      WEB_SOCKET_SERVICE &&
      (!ws.current || ws.current.readyState !== WebSocket.OPEN)
    ) {
      ws.current = new WebSocket(`${WEB_SOCKET_SERVICE}?userId=${uuid}`);

      ws.current.onopen = () => {
        dispatch(setConnected(true));
      };

      ws.current.onmessage = event => {
        console.log("onmessage", event);

        const data = JSON.parse(event.data);
        receiveMessage(data);
      };

      ws.current.onclose = () => {
        dispatch(setConnected(false));
      };
    }
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
      dispatch(setConnected(false));
    }
  };

  const handleSend = (e: React.FormEvent) => {
    if (!uuid) return;
    e.preventDefault();
    if (!input.trim() && !attachment) return;

    let tipo = "text";
    if (attachment) {
      tipo = attachment.type.startsWith("image/") ? "image" : "file";
    }

    const baseMessage: chatMessage = {
      id_conversacion: selectedUser ? selectedUser.id_conversacion : undefined,
      remitente: uuid,
      destinatario: selectedUser ? selectedUser.uuid : "",
      tipo,
      mensaje: input,
      adjunto_url: attachment ? URL.createObjectURL(attachment) : undefined,
      adjunto_nombre: attachment ? attachment.name : undefined,
      adjunto_tipo: attachment ? attachment.type : undefined,
      adjunto_tamano: attachment ? attachment.size : undefined,
    };
    dispatch(
      addMessage({
        ...baseMessage,
        fecha_envio: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }),
    );

    // Conectar el socket si no está conectado
    //connectWebSocket();

    ws.current?.send(
      sendChatMessage({
        ...baseMessage,
        imagen_perfil: imagen_perfil ? imagen_perfil : undefined,
        nombre_completo: nombre_completo ? nombre_completo : "User",
      }),
    );

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

  const receiveMessage = (input: chatMessage) => {
    console.log("Recibiendo mensaje:", input);
    if (!input.remitente) {
      console.log("No se ha recibido el UUID del remitente");
      return;
    }

    const newMessage: chatMessage = {
      ...input,
      fecha_envio: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const fromUser: chatUser = {
      id_conversacion: input.id_conversacion,
      uuid: input.remitente,
      nombre_completo: input.nombre_completo
        ? input.nombre_completo
        : "unknown",
      imagen_perfil: input.imagen_perfil
        ? input.imagen_perfil
        : "/assets/images/thumbs/vendors-two-icon1.png",
      ultimo_mensaje: input.mensaje,
      timestamp: newMessage.fecha_envio ? newMessage.fecha_envio : "",
      no_leidos: 1,
      en_linea: true,
    };

    // Ingresa o actualiza al usuario en la lista
    dispatch(addUser(fromUser));

    dispatch(addMessage(newMessage));
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                key={user.uuid}
                className={`d-flex align-items-center gap-10 p-10 chat-user-list-item ${selectedUser && selectedUser.uuid === user.uuid ? "bg-main-50" : ""} pointer`}
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(setSelectedUser(user))}
              >
                <div className="position-relative">
                  <img
                    src={user.imagen_perfil}
                    alt={user.nombre_completo}
                    className="rounded-circle"
                    width={48}
                    height={48}
                  />
                  {user.en_linea && (
                    <span
                      className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-white rounded-circle"
                      style={{ width: 12, height: 12 }}
                    />
                  )}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-truncate">
                    {user.nombre_completo}
                  </div>
                  <div className="small text-muted text-truncate">
                    {user.ultimo_mensaje}
                  </div>
                </div>
                <div className="text-end">
                  <div className="small text-muted">{user.timestamp}</div>
                  {user.no_leidos > 0 && (
                    <span className="badge bg-main-600 text-white rounded-pill ms-1">
                      {user.no_leidos}
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
              src={selectedUser ? selectedUser.imagen_perfil : ""}
              alt={selectedUser ? selectedUser.nombre_completo : ""}
              className="rounded-circle"
              width={48}
              height={48}
              style={{ visibility: selectedUser ? "visible" : "hidden" }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold">
                {selectedUser ? selectedUser.nombre_completo : ""}
              </div>
              <div className="small text-success">
                {selectedUser
                  ? selectedUser.en_linea
                    ? "En línea"
                    : "Desconectado"
                  : ""}
              </div>
            </div>
            <button
              className={`group border border-white px-8 py-8 rounded-circle text-white text-sm hover-bg-${isConnected ? "danger" : "success"}-600 hover-text-white hover-border-${isConnected ? "danger" : "success"}-600 transition-2 flex-center gap-8`}
              title={isConnected ? "Desconectar" : "Conectar"}
              onClick={isConnected ? disconnectWebSocket : connectWebSocket}
            >
              <span
                className={`text-xl d-flex text-${isConnected ? "success" : "danger"}-600 group-item-white transition-2`}
              >
                <i className={`ph-fill ph-power text-lg`} />
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-10 py-10 d-flex mb-3 ${msg.remitente === uuid ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-8 rounded-4 shadow-sm ${msg.remitente === uuid ? "bg-main-600 text-white" : "bg-white border"}`}
                  style={{ maxWidth: "75%" }}
                >
                  <div>{msg.mensaje}</div>
                  {msg.adjunto_url && (
                    <div className="mt-2">
                      <a
                        href={msg.adjunto_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-inline-flex align-items-center text-decoration-none"
                      >
                        <i className="ph-fill ph-paperclip me-2" />
                        {msg.adjunto_nombre || "Adjunto"}
                      </a>
                    </div>
                  )}
                  <div
                    className={`mt-2 small fw-semibold d-flex justify-content-end`}
                  >
                    {/* {msg.remitente === uuid ? "Tú" : selectedUser.nombre_completo} */}
                    <span className="ms-2 small text-muted">
                      {msg.fecha_envio}
                    </span>
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
            style={{
              pointerEvents: isConnected ? "auto" : "none",
              opacity: isConnected ? 1 : 0.6,
            }}
          >
            {attachment && (
              <div className="mx-10 mb-5  small text-muted d-flex align-items-center gap-2">
                <div className="ps-7 border shadow-sm rounded-4 bg-gray-50 d-flex align-items-center gap-5 hover-bg-gray-100 hover-border-gray-100">
                  <i className="ph-fill ph-paperclip" /> {attachment.name}
                  <button
                    type="button"
                    className="btn text-main-600 btn-sm text-danger"
                    onClick={() => setAttachment(null)}
                    disabled={!isConnected}
                  >
                    <i className="ph ph-trash-simple text-lg" />
                  </button>
                </div>
              </div>
            )}
            <div className="input-group h-100 gap-6">
              <button
                type="button"
                className="align-self-center group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
                style={{ width: 40, height: 40 }}
                title="Adjuntar archivo"
                onClick={() =>
                  document.getElementById("chat-attachment")?.click()
                }
                disabled={!isConnected}
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
                disabled={!isConnected}
              />
              <button
                type="button"
                className="align-self-center group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8"
                style={{ width: 40, height: 40 }}
                title="Emojis"
                onClick={() => setShowEmoji(!showEmoji)}
                disabled={!isConnected}
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
                        disabled={!isConnected}
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
                placeholder={
                  isConnected
                    ? "Escribe un mensaje..."
                    : "Conéctate para enviar mensajes"
                }
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ minHeight: 48 }}
                disabled={!isConnected}
              />
              <button
                className="btn btn-main rounded-circle fs-5"
                type="submit"
                disabled={
                  !isConnected ||
                  (!input.trim() && !attachment) ||
                  !selectedUser
                }
              >
                <i className="ph-fill ph-paper-plane-right" />
              </button>
            </div>
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
