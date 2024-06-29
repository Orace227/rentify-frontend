import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { CLIENT_EVENTS } from '@/store/websocket/socketEvents';
import { getChats, newMsgUpdated, sendMsg } from '@/store/apps/chat/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Create a context
const SocketContext = createContext();

// Create a context provider
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);

  const chats = useSelector((state) => state.chatReducer.chats);
  useEffect(() => {
    const changeIndexOfChat = (msg) => {
      // Find the index of the chat with the same chatId as the received message
      const index = chats.findIndex((chat) => chat.chatId === msg.chatId);
      // If a chat with the same chatId exists, move it to the beginning of the array
      console.log(index);
      if (index !== -1) {
        const updatedChats = [...chats]; // Create a copy of the chats array
        const chatToMove = updatedChats[index]; // Get the chat to move
        updatedChats.splice(index, 1); // Remove the chat from its current position
        updatedChats.unshift(chatToMove); // Add the chat to the beginning of the array
        dispatch(getChats(updatedChats)); // Dispatch an action to update the Redux state
      }
    };
    changeIndexOfChat(message);
  }, [message]);

  useEffect(() => {
    const isUser = 'customer';

    const socket = io('http://localhost:8003');
    setSocket(socket);
    socket.on(CLIENT_EVENTS.RECEIVE_NOTIFICATION, (data) => {
      console.log('received notification', data);
    });

    socket.on(CLIENT_EVENTS.RECEIVE_MESSAGE, (data) => {
      console.log('received msg', data);

      setMessage(data);
      dispatch(sendMsg(data));
      dispatch(newMsgUpdated({ chatId: data.chatId, hasUnreadMsg: true }));
    });

    return () => {
      socket.close();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

// Custom hook to consume the context
export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
