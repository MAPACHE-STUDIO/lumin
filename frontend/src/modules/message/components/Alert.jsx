import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const Alert = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  if (!visible) return null;
  const alertStyles = {
    success: "bg-violet-900 opacity-75 text-white text-lg p-5 flex items-center",
    error: "bg-red-500 opacity-75 text-white text-lg p-5 flex items-center",
  };
  return (
    <div
      className={`fixed top-5 right-8 p-8 rounded-3xl shadow-lg ${alertStyles[type]} transition-all duration-300`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-white hover:text-gray-300 transition duration-200"
        onClick={() => setVisible(false)}
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
    </div>
  );
};
export default Alert;