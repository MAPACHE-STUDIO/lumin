// Formatear la hora de los mensajes.

export const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };
  