import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ChatModal } from "./ChatModal";
import { AppContext } from "../../../context/context";
import socket from "../../../core/utils/socket/socket";
import { deleteConversation } from "../services/conversationsService";

export const ChatHeader = ({ name, profileImage, idConversation }) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const { addCurrentConversation } = useContext(AppContext)
  const navigate = useNavigate()

  const handleOpenChatModal = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  const handleModalAction = (action, conversationId) => {
    console.log(`Action: ${action}, Conversation ID: ${conversationId}`);
    switch (action) {
      case "silent":
        // TODO: Iniciar una nueva conversación
        break;
      case "info":
        // TODO: Eliminar la conversación
        break;
      case "bloquear":
        // TODO: Eliminar la conversación
        break;
      case "favorito":
        socket.emit("favorito", idConversation)
        break;
      case "eliminar":
        deleteConversation(idConversation);
        socket.emit("deleteConversation", idConversation);
        navigate(`/chats`)
        break;
      default:
        break;
    }
    handleCloseChatModal();
  };

  return (
    <div className="bg-violet-500 flex justify-between items-center p-4 text-white">
      {/* Contenedor del lado izquierdo */}
      <div className="flex items-center space-x-4">
        {/* Botón para volver a la lista de conversaciones */}
        <Link
          to="/chats"
          className="inline-flex items-center hover:text-gray-200"
          onClick={() => {
            socket.emit("resetNotifications", idConversation)
            addCurrentConversation({})
          }}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>

        {/* Imagen de perfil */}
        <img
          src={profileImage}
          alt={name}
          className="object-cover
          size-20 rounded-3xl"
        />

        {/* Nombre de la persona/grupo */}
        <h1 className="text-lg font-semibold">{name}</h1>
      </div>

      {/* Botón para abrir el modal */}
      <button
        className="bg-violet-500 rounded-xl w-10 h-10 flex items-center justify-center"
        onClick={handleOpenChatModal}
      >
        <FontAwesomeIcon className="text-white" icon={faBars} />
      </button>

      {/* Modal de opciones */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        onAction={handleModalAction}
        conversationId={name} // Puedes ajustar esto según tu lógica
      />
    </div>
  );
};
