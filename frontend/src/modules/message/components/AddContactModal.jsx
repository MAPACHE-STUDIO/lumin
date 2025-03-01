import axios from "axios";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/context";

const AddContactModal = ({ isOpen, onClose }) => {
  const [newContact, setNewContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { userInfo, userContacts, userConversations, addUserContacts, addCurrentConversation } = useContext(AppContext)

  const navigate = useNavigate()

  //! TODO: Función para obtener contactos
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/contacts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setContacts(response.data.Contacts || []);
      addUserContacts(response.data.Contacts || []);
    } catch (err) {
      setError(err.response?.data?.error || "Error al obtener los contactos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  //! Obtener contactos al abrir el modal
  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen, fetchContacts]);

  //! Función para agregar un contacto
  const handleAddContact = async () => {
    if (!newContact.trim()) {
      setError("Please input a valid email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_BASE}/contacts/`,
        { email: newContact },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewContact(""); // Limpiar input
      fetchContacts(); // Actualizar la lista de contactos
    } catch (err) {
      setError(err.response?.data?.error || "Error al agregar el contacto");
    } finally {
      setIsLoading(false);
    }
  };

  //! TODO: funcion para abrir una nueva ventana de chat
  const handleContactClick = (contact) => {
    const conversationName = [contact.id, userInfo.id].sort().join('_');
    const searchConversation = userConversations?.find(conversation => conversation.conversationName === conversationName);
    const contactInformacionChat = {
      conversationId: searchConversation ? searchConversation.id : null,
      contactId: contact.id,
      username: contact.username,
      profileImage: "https://cdn-icons-png.flaticon.com/512/7276/7276847.png",
    }
    addCurrentConversation(contactInformacionChat); // Al hacer clic, almacenamos el contacto seleccionado
    searchConversation ? navigate(`/chats/${searchConversation.id}`) : navigate(`/chats/temp-${contact.id}`)
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-violet-500 rounded-3xl p-30"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}

            <div className="flex bg-violet-500 rounded-3xl justify-between pt-3">
              <h3 className="text-lg font-bold text-white m-5">
                Add new contact
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 m-5"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="bg-white rounded-3xl shadow-lg p-4">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-3xl">
                  {error}
                </div>
              )}

              <div className="flex justify-between">
              {/* Input */}
              <div className="w-full pr-2">
                <input
                  type="email"
                  placeholder="Add new email"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="w-full p-2 border rounded-3xl border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  disabled={isLoading}
                />
              </div>

              {/* Add Contact Button */}
              <div className="">
                <button
                  onClick={handleAddContact}
                  className={`bg-violet-500 text-white px-4 py-2 rounded-3xl hover:bg-violet-900 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar"}
                </button>
              </div>
              </div>

              {/* Contact List */}
              <div>
                <h3 className="text-lg font-medium mt-5 mb-2 text-violet-500">Contactos:</h3>
                {isLoading ? (
                  <p className="text-gray-500">Cargando contactos...</p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {userContacts.map((contact, index) => (
                      <li
                        key={index}
                        className="bg-violet-200 text-violet-900 p-2 rounded-3xl flex items-center justify-between"
                      >
                          <button
                            onClick={() => handleContactClick(contact)}
                            className="flex justify-between text-violet-900"
                          >
                            {contact.username}
                          </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddContactModal;
