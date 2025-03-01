import { fetchConversations } from "../../../modules/message/services/conversationsService";
import socket from "./socket";

export const setupSocketListeners = (setConversations) => {
    
    const updateLastMessage = (message) => {
        setConversations((prev) =>{
            const nuevitas =prev.map((conv) =>
                conv.id === message.conversationId
                    ? { ...conv, lastMessage: message.content, unreadCount :  conv.unreadCount + 1}
                    : conv
            )
        return nuevitas}
        );
    };

    const addNewContact = (contact) => {
        setConversations((prev) => [...prev, contact]);
    };

    const deleteConversation = (conversationId) => {
        console.log("Deleting conversation", conversationId)
        setConversations((prev) => prev.filter((conv) => conv.id !== conversationId));

    };

    const updateConversation = (data) => {
        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === data.conversationId ? { ...conv, ...data } : conv
            )
        );
    };

    const updateNewConversation = async() => {
        const conversations = await fetchConversations()
        setConversations(conversations);
    };

    socket.on("newMessage", updateLastMessage);
    socket.on("contactAdded", addNewContact);
    socket.on("conversationDeleted", deleteConversation);
    socket.on("conversationUpdated", updateConversation);
    socket.on("updateConversation", updateNewConversation);
    socket.on("uploadCompleted", updateNewConversation)
    socket.on("isFavorite", updateNewConversation)
};

export const removeSocketListeners = () => {
    socket.off("newMessage");
    socket.off("contactAdded");
    socket.off("conversationDeleted");
    socket.off("conversationUpdated");
};
