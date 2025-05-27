import { useState, useRef, useEffect } from "react";
import { service } from "../config/configurations";
import {
  socketMessage,
  Conversacion,
  Mensaje,
} from "../interfaces/chat.interfaces";
import { sendSocketMessage } from "../utils/chat.util";
import { formatDate } from "../utils/app.util";
import {
  setConnected,
  fetchConversations,
  fetchConversationById,
  setConversacionActiva,
  delConversacionActiva,
  //deleteConversation,
  addMensajeEntrante,
  addMensaje,
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

const imagenPerfilDefault = "https://www.w3schools.com/howto/img_avatar.png";
const nombreCompletoDefault = "Usuario Desconocido";

const Chat = () => {
  const dispatch = useAppDispatch();

  const ws = useRef<WebSocket | null>(null);

  const uuid = useAppSelector(state => state.auth.uuid);
  const nombre_completo = useAppSelector(state => state.auth.nombre_completo);
  const imagen_perfil = useAppSelector(state => state.auth.imagen_perfil);
  const isConnected = useAppSelector(state => state.chat.isConnected);

  const conversaciones = useAppSelector(state => state.chat.conversaciones);
  const conversacionActiva = useAppSelector(
    state => state.chat.conversacionActiva,
  );
  const mensajes = useAppSelector(state => state.chat.mensajes);

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
        dispatch(fetchConversations());
      };

      ws.current.onmessage = event => {
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

  const handleFetchConversations = () => {
    dispatch(fetchConversations());
  };

  const handleFetchConversationById = (id: number) => {
    dispatch(fetchConversationById({ id }));
  };

  /*  const handleDeleteConversation = async (id_conversacion: number) => {
    await dispatch(deleteConversation(id_conversacion));
    dispatch(fetchConversations());
  }; */

  const handleSend = (e: React.FormEvent) => {
    if (!uuid) return;
    e.preventDefault();
    if (!input.trim() && !attachment) return;

    let tipo = "text";
    if (attachment) {
      tipo = attachment.type.startsWith("image/") ? "image" : "file";
    }
    if (conversacionActiva) {
      let baseMessage = null;
      if (conversacionActiva.remitente === uuid) {
        baseMessage = {
          // REMITENTE
          remitente: conversacionActiva.remitente,
          imagen_perfil_remitente:
            conversacionActiva.imagen_perfil_remitente || null,
          nombre_remitente: conversacionActiva.nombre_remitente || null,
          // DESTINATARIO
          destinatario: conversacionActiva.destinatario,
          imagen_perfil_destinatario:
            conversacionActiva.imagen_perfil_destinatario || null,
          nombre_destinatario: conversacionActiva.nombre_destinatario || null,
        };
      } else {
        baseMessage = {
          // REMITENTE
          remitente: uuid,
          imagen_perfil_remitente: imagen_perfil || null,
          nombre_remitente: nombre_completo || null,
          // DESTINATARIO
          destinatario: conversacionActiva.remitente,
          imagen_perfil_destinatario:
            conversacionActiva.imagen_perfil_remitente || null,
          nombre_destinatario: conversacionActiva.nombre_remitente || null,
        };
      }

      baseMessage = {
        ...baseMessage,
        id_conversacion: conversacionActiva.id_conversacion,
        tipo,
        mensaje: input,
        adjunto_url: attachment ? URL.createObjectURL(attachment) : undefined,
        adjunto_nombre: attachment ? attachment.name : undefined,
        adjunto_tipo: attachment ? attachment.type : undefined,
        adjunto_tamano: attachment ? attachment.size : undefined,
      } as socketMessage;

      dispatch(
        addMensaje({
          ...baseMessage,
        } as Mensaje),
      );

      // Conectar el socket si no está conectado
      connectWebSocket();

      console.log("Mensaje enviado al socket", baseMessage);
      ws.current?.send(sendSocketMessage(baseMessage));
    }

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

  const receiveMessage = (input: socketMessage) => {
    console.log("Recibiendo mensaje:", input);
    if (!input.remitente) {
      console.log("No se ha recibido el UUID del remitente");
      return;
    }
    dispatch(addMensajeEntrante(input));
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [mensajes, isAtBottom]);

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
          className="col-12 col-md-4 border-end bg-light d-flex flex-column  custom-scroll"
          style={{
            minHeight: 500,
            maxHeight: 500,
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <div className="p-10 border-bottom bg-white d-flex align-items-center gap-10">
            <div className="flex-grow-1">
              <h5 className="mb-0 fw-bold">Chats</h5>
            </div>
            <button
              className={`group border border-white px-8 py-8 rounded-circle text-white text-sm hover-bg-main-600 hover-text-white hover-border-main-600 transition-2 flex-center gap-8`}
              title="Sincrinizar conversaciones"
              onClick={handleFetchConversations}
            >
              <span
                className={`text-xl d-flex text-main-600 group-item-white transition-2`}
              >
                <i className={`ph-fill ph-arrows-clockwise text-lg`} />
              </span>
            </button>
            <button
              className={`group border border-white px-8 py-8 rounded-circle text-white text-sm hover-bg-${isConnected ? "danger" : "success"}-600 hover-text-white hover-border-${isConnected ? "danger" : "success"}-600 transition-2 flex-center gap-8`}
              title={isConnected ? "Desconectar" : "Conectar"}
              onClick={isConnected ? disconnectWebSocket : connectWebSocket}
            >
              <span
                className={`text-xl d-flex text-${isConnected ? "success" : "danger"}-600 group-item-white transition-2`}
              >
                <i className={`ph ph-power text-lg`} />
              </span>
            </button>
          </div>
          <div className="flex-grow-1 overflow-auto">
            {conversaciones.map((conversacion: Conversacion) => {
              const isSelected =
                conversacionActiva?.id_conversacion ==
                conversacion.id_conversacion;

              const soyRemitente = conversacion.remitente === uuid;
              const conversacionImagenPerfil = soyRemitente
                ? conversacion.imagen_perfil_destinatario
                : conversacion.imagen_perfil_remitente;
              const conversacionNombreCompleto = soyRemitente
                ? conversacion.nombre_destinatario
                : conversacion.nombre_remitente;
              const timestamp = formatDate(
                new Date(
                  conversacion.fecha_creacion
                    ? conversacion.fecha_creacion
                    : "",
                ),
                "DD-MM-YYYY HH:mm",
              );
              const en_linea = false;
              let ultimo_mensaje = conversacion.ultimo_mensaje;
              if (
                !ultimo_mensaje &&
                conversacion.mensajes &&
                conversacion.mensajes.length > 0
              ) {
                const uuidDestinatario = soyRemitente
                  ? conversacion.destinatario
                  : conversacion.remitente;

                let searchLastMessage = true;
                let indexLastMessage = conversacion.mensajes.length - 1;
                while (searchLastMessage) {
                  if (
                    conversacion.mensajes[indexLastMessage].remitente ===
                    uuidDestinatario
                  ) {
                    searchLastMessage = false;
                    break;
                  }
                  indexLastMessage--;
                }

                ultimo_mensaje =
                  conversacion.mensajes[indexLastMessage].mensaje;
              }
              const no_leidos = 0;

              return (
                <div
                  key={conversacion.id_conversacion}
                  className={`d-flex align-items-center gap-10 p-10 chat-user-list-item ${isSelected ? "bg-main-50" : ""} pointer`}
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(setConversacionActiva(conversacion))}
                >
                  <div className="position-relative">
                    <img
                      src={conversacionImagenPerfil || imagenPerfilDefault}
                      alt={conversacionNombreCompleto || nombreCompletoDefault}
                      className="rounded-circle"
                      width={48}
                      height={48}
                    />
                    {en_linea && (
                      <span
                        className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-white rounded-circle"
                        style={{ width: 12, height: 12 }}
                      />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-truncate">
                      {conversacionNombreCompleto}
                    </div>
                    <div className="small text-muted text-truncate">
                      {ultimo_mensaje}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="small text-muted">{timestamp}</div>
                    {no_leidos > 0 && (
                      <span className="badge bg-main-600 text-white rounded-pill ms-1">
                        {no_leidos}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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
              src={
                conversacionActiva
                  ? conversacionActiva.remitente == uuid
                    ? (conversacionActiva.imagen_perfil_destinatario ??
                      imagenPerfilDefault)
                    : (conversacionActiva.imagen_perfil_remitente ??
                      imagenPerfilDefault)
                  : ""
              }
              alt={
                conversacionActiva
                  ? conversacionActiva.remitente == uuid
                    ? (conversacionActiva.nombre_destinatario ??
                      nombreCompletoDefault)
                    : (conversacionActiva.nombre_remitente ??
                      nombreCompletoDefault)
                  : ""
              }
              className="rounded-circle"
              width={48}
              height={48}
              style={{ visibility: conversacionActiva ? "visible" : "hidden" }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold">
                {conversacionActiva
                  ? conversacionActiva.remitente == uuid
                    ? (conversacionActiva.nombre_destinatario ??
                      nombreCompletoDefault)
                    : (conversacionActiva.nombre_remitente ??
                      nombreCompletoDefault)
                  : ""}
              </div>
              <div className="small text-success">
                {conversacionActiva
                  ? conversacionActiva.en_linea
                    ? "En línea"
                    : "Desconectado"
                  : ""}
              </div>
            </div>
            {/* {conversacionActiva && false ? (
              <button
                className={`group border border-white px-8 py-8 rounded-circle text-white text-sm hover-bg-main-600 hover-text-white hover-border-main-600 transition-2 flex-center gap-8`}
                title="Borrar conversacion"
                onClick={() =>
                  conversacionActiva.id_conversacion &&
                  handleDeleteConversation(conversacionActiva.id_conversacion)
                }
              >
                <span
                  className={`text-xl d-flex text-main-600 group-item-white transition-2`}
                >
                  <i className="ph ph-trash-simple" />
                </span>
              </button>
            ) : null} */}
            {conversacionActiva && (
              <div className="dropdown">
                <button
                  className="group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  title="Más opciones"
                >
                  <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                    <i className="ph-fill ph-dots-three-outline text-lg" />
                  </span>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      if (conversacionActiva.id_conversacion) {
                        console.log(
                          "Sincronizando conversación:",
                          conversacionActiva.id_conversacion,
                        );

                        handleFetchConversationById(
                          conversacionActiva.id_conversacion,
                        );
                      }
                    }}
                  >
                    Sincronizar conversación
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      dispatch(delConversacionActiva());
                    }}
                  >
                    Quitar conversación
                  </button>
                </div>
              </div>
            )}
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
            {mensajes.map((msg: Mensaje, index: number) => (
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
                      {msg.fecha_envio &&
                        formatDate(
                          new Date(msg.fecha_envio),
                          "DD-MM-YYYY HH:mm",
                        )}
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
                  !conversacionActiva
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
