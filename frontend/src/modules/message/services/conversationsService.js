import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const fetchConversations = async () => {
    try {
        let token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE}/conversations`, {
            headers: {
                        Authorization: `Bearer ${token}`,
                        },
        });
        return response.data.conversations
    } catch (error) {
        console.log("error", error)
    }
};

export const deleteConversation = async (conversationId) => {
    try {
        const response = await axios.delete(`${API_BASE}/conversations/${conversationId}`);
        return response.data.conversations
    } catch (error) {
        console.log("error", error)
    }
};
