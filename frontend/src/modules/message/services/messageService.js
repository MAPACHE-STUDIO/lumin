// Métodos para obtener, enviar, y manejar mensajes.

import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;


export const fetchMessages = async (conversationId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE}/messages/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.messages;
  } catch (error) {
    console.log("error", error);
  }
};

export const sendMessage = async ( message) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE}/messages`,  message , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    console.log("error")
  }
};
