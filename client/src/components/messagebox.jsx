import React, { useState } from "react";
import moment from "moment";
import { isToday, isTomorrow } from "../helper/fuctions";
import { MessageContent } from "./messageContent";
export const MessageBox = ({ messages, currentUser }) => {
  const todayMessages = [];
  const tomorrowMessages = [];
  const otherMessages = [];
  messages?.map((message) => {
    const messageDate = new Date(message.createdAt);
    if (isToday(messageDate)) {
      todayMessages.push(message);
    } else if (isTomorrow(messageDate)) {
      tomorrowMessages.push(message);
    } else {
      const dateString = messageDate.toISOString().split("T")[0];
      if (!otherMessages[dateString]) {
        otherMessages[dateString] = [];
      }
      otherMessages[dateString].push(message);
    }
  });
  // console.log(todayMessages, "; todayMessages");
  // console.log(tomorrowMessages, ": tomorrowMessages");
  // console.log(otherMessages, ": otherMessages");

  return (
    <div>
      {Object.keys(otherMessages).map((date) => (
        <div key={date}>
          <h2>{moment(date).format("D MMMM")}</h2>
          {otherMessages[date].map((msg, index) => (
            <MessageContent
              key={`${date}-${index}`}
              message={msg.message}
              currentUser={msg.senderid === currentUser}
              time={msg.createdAt}
            />
          ))}
        </div>
      ))}
      {tomorrowMessages.length > 0 && (
        <>
          <h2>Tomorrow</h2>
          {tomorrowMessages.map((msg, index) => (
            <MessageContent
              key={`${index}`}
              message={msg.message}
              currentUser={msg.senderid === currentUser}
              time={msg.createdAt}
            />
          ))}
        </>
      )}
      {todayMessages.length > 0 && (
        <>
          <h2>Today</h2>
          {todayMessages.map((msg, index) => (
            <MessageContent
              key={`${index}`}
              message={msg.message}
              currentUser={msg.senderid === currentUser}
              time={msg.createdAt}
            />
          ))}
        </>
      )}
    </div>
  );
};
