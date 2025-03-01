import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importar AnimatePresence y motion

export const ChatModal = ({ isOpen, onClose, onAction, conversationId }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // Comienza con opacidad 0
          animate={{ opacity: 1 }}  // Transición a opacidad 1
          exit={{ opacity: 0 }}     // Desaparece con opacidad 0
          transition={{ duration: 0.1 }} // Duración de la animación
        >
          <motion.div
            className="bg-violet-500 rounded-3xl pt-3"
            initial={{ scale: 0.8 }} // Comienza más pequeño
            animate={{ scale: 1 }}   // Escala a su tamaño normal
            exit={{ scale: 0.9 }}    // Se reduce al salir
            transition={{ duration: 0.1 }} // Duración de la animación
          >
            <div className="flex bg-violet-500 rounded-3xl justify-between pt-0">
                <h3 className="text-lg font-bold text-white m-5">Options</h3>
                <button
                onClick={onClose}
                className="text-white hover:text-gray-300 m-5"
              >
                ✕
              </button>
              </div>

              <div className="bg-violet-500 bg-white rounded-2xl w-72 shadow-lg">
                <ul className="bg-white text-gray-900 rounded-2xl p-4 space-y-2">
                  <li>
                    <button
                      onClick={() => onAction("silent", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Silent Chat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("info", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Contact Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("bloquear", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Blocked Chat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("favorito", conversationId)}
                      className="w-full text-left text-violet-900 hover:text-violet-700"
                    >
                      Add to Favorites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAction("eliminar", conversationId)}
                      className="w-full text-left text-red-500 hover:text-red-700"
                    >
                      Delete Chat
                    </button>
                  </li>
                 
                </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
