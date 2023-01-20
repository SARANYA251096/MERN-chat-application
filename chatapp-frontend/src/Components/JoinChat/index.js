import { useState } from "react";
import Chat from "../Chat";


const JoinChat = ({socket}) => {
    const [userName, setUserName] = useState('');
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (userName && room) {
            console.log("Username:", userName);
            console.log("Room", room);
            socket.emit('join', room);
            setShowChat(true);
      }
  };
  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join the Chat Room</h3>
          <input
            type={"text"}
            placeholder="Enter the username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type={"text"}
            placeholder="Enter the Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
};

export default JoinChat;
