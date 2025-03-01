import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatHeader } from "../components/ChatHeader";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { AppContext } from "../../../context/context";
import socket from "../../../core/utils/socket/socket";
import { fetchMessages, sendMessage } from "../services/messageService";

export const UserChat = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const {
    userInfo,
    currentConversation,
    addCurrentConversation,
    userConversations,
  } = useContext(AppContext);

  const [messages, setMessages] = useState([]);

  // Función para obtener mensajes
  const fetchMessagesHandler = useCallback(async () => {
    // setIsLoading(true);
    // setError("");
    try {
      const messages = await fetchMessages(currentConversation?.conversationId);
      setMessages(messages);
    } catch (err) {
      // setError(err.response?.data?.error || "Error al obtener los contactos");
      console.log("error", err);
    }
  }, [currentConversation]);
  useEffect(() => {
    fetchMessagesHandler();
    const handleUpdateMessages = () => {
      fetchMessagesHandler();
    };
    socket.on("updateMessages", handleUpdateMessages);

    return () => {
      socket.off("updateMessages");
    };
  }, [fetchMessagesHandler]);

  //! TODO: funcion para enviar mensajes
  const sendMessageHandler = useCallback(
    async (content) => {
      try {
        const conversation = await sendMessage({
          content,
          conversationId: currentConversation.conversationId,
          receiverId: currentConversation.contactId,
          senderId: userInfo.id,
        });
        if (!currentConversation.conversationId) {
          const contactInformacionChat = {
            ...currentConversation,
            conversationId: conversation.conversationId,
          };
          addCurrentConversation(contactInformacionChat);
          navigate(`/chats/${conversation.conversationId}`);
        }
        socket.emit("sendMessage", {
          content,
          conversationId: conversation.conversationId,
        });
        socket.emit("newConversation");
      } catch (err) {
        console.log("Error al enviar el mensaje", err);
      }
    },
    [userConversations]
  );

  return (
    <div className="w-full mx-auto h-screen flex flex-col bg-violet-500">
      {/* Encabezado del chat */}
      <ChatHeader
        profileImage={`${currentConversation.profileImage}`}
        name={`${currentConversation.username}`}
        idConversation={`${currentConversation.conversationId}`}
      />

      {/* Contenido del chat */}
      <div className="flex-1 flex flex-col bg-white rounded-t-3xl">
        {/* Área de mensajes con scrollbar */}
        <div
          className="flex-1 overflow-y-auto px-2 pt-5"
          style={{ maxHeight: "calc(93vh - 120px)", position: "relative" }}
        >
          <MessageList
            messages={messages}
            senderImage={userInfo.profileImage}
            receiverImage={currentConversation.profileImage}
          />
        </div>

        {/* Input */}
        <MessageInput sendMessage={sendMessageHandler} />
      </div>
    </div>
  );
};
