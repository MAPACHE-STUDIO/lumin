import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faFaceSmile,
  faMicrophone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState(""); // Estado para el mensaje
  const [file, setFile] = useState(null); // Estado para el archivo adjunto
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Mostrar/ocultar picker de emojis

  const emojis = ["😀", "😂", "😍", "🥳", "😎", "🤔", "😭", "😡", "👍", "👎"]; // Lista de emojis

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log("Archivo seleccionado:", e.target.files[0].name);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Mensaje enviado:", message);
      setMessage(""); // Limpiar el mensaje
      sendMessage(message);
    }
    if (file) {
      console.log("Archivo enviado:", file.name);
      setFile(null); // Limpiar el archivo
    }
  };

  const handleSendVoiceNote = () => {
    console.log("Nota de voz grabada");
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addEmojiToMessage = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
    setShowEmojiPicker(false); // Ocultar el picker al seleccionar un emoji
  };

  // Manejar el envío al presionar Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="p-2 bg-violet-500 flex items-center space-x-2 relative">
      {/* Botón para adjuntar archivos multimedia */}
      <label
        className="text-white hover:text-violet-900 cursor-pointer"
        title="Adjuntar archivo"
      >
        <input type="file" className="hidden" onChange={handleFileChange} />
        <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5" />
      </label>

      {/* Botón para agregar stickers o emojis */}
      <div className="relative">
        <button
          onClick={toggleEmojiPicker}
          className="text-white hover:text-violet-900"
          title="Agregar emoji"
        >
          <FontAwesomeIcon icon={faFaceSmile} className="w-5 h-5" />
        </button>

        {/* Cuadro desplegable con emojis */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-30 bg-white border border-gray-200 rounded-3xl shadow-md p-5 grid grid-cols-6 gap-8 z-50">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addEmojiToMessage(emoji)}
                className="text-xl flex items-center justify-center"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Campo de entrada */}
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}  
        placeholder="Write your new message..."
        className="text-gray-500 flex-grow p-2 border border-violet-200 rounded-3xl focus:outline-none focus:ring-1 focus:ring-violet-400"
      />

      {/* Mostrar nombre del archivo adjunto */}
      {file && (
        <span className="text-sm text-gray-500 truncate max-w-xs">
          {file.name}
        </span>
      )}

      {/* Botón para enviar un mensaje o grabar una nota de voz */}
      {message.trim() || file ? (
        <button
          onClick={handleSendMessage}
          className="text-white hover:text-violet-900"
          title="Enviar mensaje"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={handleSendVoiceNote}
          className="text-white hover:text-violet-900"
          title="Grabar nota de voz"
        >
          <FontAwesomeIcon icon={faMicrophone} className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
