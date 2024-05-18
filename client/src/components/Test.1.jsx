import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../constant";
import { socket } from "../socket";

export const Test = () => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const currentUser = localStorage.getItem("userId");
  const [converstion, setConverstiion] = useState([]);
  const [Input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [currentConverstion, setCurrentConevrstion] = useState("");
  useEffect(() => {
    const handleMessage = (message) => {
      console.log("message received", message);
      if (!chat.some((msg) => msg.message === message.message)) {
        setChat((previous) => [...previous, message]);
      }
      scrollToBottom();
    };
    socket.on("connect", () => {
      console.log("connect", socket.id);
    });
    socket.on("message", handleMessage);

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/chat/converstionget`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res);
        setConverstiion(res.data.data);
        scrollToBottom();
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchChat = (el) => {
    setCurrentConevrstion(el);
    console.log(el.converstionId);
    axios
      .get(`${SERVER_URL}/chat/messageget/${el.converstionId}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setChat(res.data.data);
        socket.emit("joinRoom", el.converstionId.toString());
        scrollToBottom();
      })
      .catch((err) => console.log(err));
  };
  const sendMessage = () => {
    let message = Input;
    axios
      .post(
        `${SERVER_URL}/chat/messagesend/${currentConverstion.converstionId}`,
        { message },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        socket.emit(
          "sendMessage",
          currentConverstion.converstionId.toString(),
          res.data.newMessage
        );
        setInput("");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>converstions</h1>
      <div className="conversations">
        {converstion.map((el) => {
          return (
            <div
              onClick={() => fetchChat(el)}
              className="chatbox"
              key={el.converstionId}
            >
              {el.perstionData.name}
            </div>
          );
        })}
      </div>
      {currentConverstion && (
        <div>
          {chat &&
            chat.length > 0 &&
            chat.map((el, index) => {
              return (
                <div
                  className={`messag-box ${el.senderid === currentUser ? "send" : "receive"}`}
                  key={index}
                >
                  {el.senderid === currentUser
                    ? "me"
                    : currentConverstion.perstionData.name}{" "}
                  - {el.message}
                </div>
              );
            })}
          <div>
            <input
              type="text"
              value={Input}
              onChange={(event) => {
                setInput(event.target.value); // Corrected handling of input change
              }} />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};
