import moment from "moment";
import React from "react";

export const MessageContent = ({ currentUser, message, time }) => {
  return (
    <div className="chat-message relative">
      <div
        className={`flex items-baseline mt-3 ${
          currentUser ? "justify-end" : ""
        }`}
      >
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div
            className={`px-4 py-2 rounded-lg inline-block w-[100%] ${
              currentUser
                ? "rounded-bl-none bg-gray-300 text-gray-600"
                : "rounded-br-none bg-blue-600 text-white"
            }`}
          >
            <p className="w-[100%] break-words">{message}</p>
          </div>
        </div>
        <div className={`flex flex-col ${currentUser ? "order-last" : ""}`}>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            className={`w-6 h-6 rounded-full`}
          />
          <div className={`text-gray-400 text-xs mt-[5px]`}>
            {moment(time).format("hh:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};
