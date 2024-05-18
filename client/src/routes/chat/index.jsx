import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { Chatbox } from "../../components/chatbox";

export const Chat = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="w-full flex overflow-hidden">
      <Sidebar />
      <Chatbox />
    </div>
  );
};
