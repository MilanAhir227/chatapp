import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constant";
import { chatContext } from "../context/chatcontext";
import { LogOutModel } from "./LogoutModel";
import { AddChat } from "./addChat";
const Sidebar = () => {
  const navigate = useNavigate();
  const {
    currentConverstion,
    setCurrentConevrstion,
    converstion,
    setConverstiion,
  } = useContext(chatContext);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const currentUserId = currentConverstion?.perstionData?.id;
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/chat/converstionget`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res);
        setConverstiion(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const fetchChat = (el) => {
    navigate(`/chat/${el.converstionId}`, { replace: true });
    setCurrentConevrstion(el);
  };

  return (
    <div
      className={`sidebar h-screen top-0 bottom-0 lg:left-0 p-2 w-[20%]  text-center bg-gray-900 ${
        sidebarVisible ? "" : "hidden"
      }`}
    >
      <div className="text-gray-100 text-xl h-[10%]">
        <div className="p-2.5 mt-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="font-bold text-gray-200 text-[15px] ml-3">Chat App</h1>
          {/* <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden bg-red-600 h-[10%]"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </i> */}
        </div>
        <div className="my-2 bg-gray-600 h-[2px]"></div>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white h-[10%]"
        onClick={toggleSubmenu}
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <div className="flex justify-center w-full items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Chatbox
          </span>
          <span className="text-sm rotate-180" id="arrow">
            <i
              className={`bi bi-chevron-down ${
                submenuVisible ? "rotate-0" : ""
              }`}
            ></i>
          </span>
        </div>
      </div>
      <div
        className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold h-[450px] overflow-x-auto scroll-smooth scroll-m-0 h-[60%] no-scrollbar`} //${submenuVisible ? "" : "hidden"}
        id="submenu"
      >
        {converstion.map((el, index) => {
          // currentUserId
          // el.perstionData.id
          const hover = currentUserId === el.perstionData.id;
          console.log(hover);
          return (
            <h1
              className={`cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1 border flex h-[17%] items-center ${
                hover ? "bg-green-600" : ""
              }`}
              onClick={() => fetchChat(el)}
              key={index}
            >
              <div className="mt-3 flex -space-x-2 overflow-hidden h-8 w-8 m-3">
                <img
                  className="inline-block h-full w-full rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="avatar"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="flex justify-start text-lg capitalize">
                  {el.perstionData.name}
                </h1>
                <span className="flex justify-center">
                  {el.perstionData.email}
                </span>
              </div>
            </h1>
          );
        })}
      </div>
      <AddChat />
      <LogOutModel />
    </div>
  );
};

export default Sidebar;
