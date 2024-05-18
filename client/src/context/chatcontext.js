import { createContext, useState } from "react";

export const chatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [converstion, setConverstiion] = useState([]);
  const [chat, setChat] = useState([]);
  const [currentConverstion, setCurrentConevrstion] = useState("");

  const value = {
    converstion,
    setConverstiion,
    chat,
    setChat,
    currentConverstion,
    setCurrentConevrstion,
  };

  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
