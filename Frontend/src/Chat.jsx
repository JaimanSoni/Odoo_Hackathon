import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your Flask backend URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(''); // Set this dynamically or through authentication
  const [room, setRoom] = useState('Default Room'); // Set this dynamically if needed

  useEffect(() => {
    socket.emit('join', { username, room });

    socket.on('message', (data) => {
      setMessages((messages) => [...messages, data.msg]);
    });

    socket.on('receive_message', (data) => {
      setMessages((messages) => [...messages, `${data.username}: ${data.message}`]);
    });

    return () => {
      socket.emit('leave', { username, room });
      socket.off();
    };
  }, [username, room]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', { username, message, room });
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
        <div id="messages" className="h-64 overflow-y-scroll mb-4 p-2 bg-white rounded-lg">
          {messages.map((msg, index) => (
            <p key={index} className="p-1 border-b border-gray-200">{msg}</p>
          ))}
        </div>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
