import { useEffect, useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send-message", messageData);
      setMessages((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  }
  return (
    <div>
      <div className="chat-window">
        <div className="chat-header">
          <h3>Live Chat</h3>
        </div>
        <div className="chat-body">
          <div className="message-container">
            {messages.map((messageContent) => (
              <div className="message" id="you">
                <div className="message-content">{messageContent.message}</div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
