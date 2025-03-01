// Hook para obtener mensajes de la API.

import { useState, useEffect } from "react";
import { fetchMessages } from "../services/messageService";

const useFetchMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetchMessages(conversationId);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [conversationId]);

  return { messages, loading };
};

export default useFetchMessages;
