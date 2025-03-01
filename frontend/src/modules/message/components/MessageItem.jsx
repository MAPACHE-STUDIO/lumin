// Componente para representar un mensaje individual.

import PropTypes from "prop-types";

const MessageItem = ({ sender, content, timestamp, isOwnMessage }) => (
  <div className={`message-item ${isOwnMessage ? "own" : ""}`}>
    <div className="message-content">{content}</div>
    <div className="message-meta">
      <span>{sender}</span>
      <span>{new Date(timestamp).toLocaleTimeString()}</span>
    </div>
  </div>
);

MessageItem.propTypes = {
  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  isOwnMessage: PropTypes.bool,
};

export default MessageItem;
