import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${API_BASE}/users`, userData);
        return response
    } catch (error) {
        console.log("error", error)
        return (error)
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE}/users/${userId}`,);
        return response.data
    } catch (error) {
        console.log("error", error)
    }
};
