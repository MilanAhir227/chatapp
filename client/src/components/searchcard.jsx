/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import axios from "axios";
import { SERVER_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import { chatContext } from "../context/chatcontext";
export const SearchCard = ({ data, setHidden }) => {
  const { setCurrentConevrstion, converstion, setConverstiion } =
    useContext(chatContext);
  const navigate = useNavigate();
  const { _id, name, email } = data;
  const directMessage = async (id) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/chat/converstion/${id}`,
        "",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(response);
      setHidden(true);
      setCurrentConevrstion(response.data.data);
      setConverstiion([...converstion, response.data.data]);
      navigate(`/chat/${response.data.data.converstionId}`);
    } catch (error) {
      console.log(error.response.status, error.response.status === 403);
      if (error.response.status === 403) {
        console.log(error.response.data.converstionId);
        setHidden(true);
        setCurrentConevrstion(error.response.data.data);
        navigate(`/chat/${error.response.data.converstionId}`);
      }
    }
  };
  return (
    <div className="w-[25%]  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {email}
        </span>
        <div className="flex mt-4 md:mt-6">
          <div
            onClick={() => directMessage(_id)}
            className="py-2 px-4 ms-2 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Message
          </div>
        </div>
      </div>
    </div>
  );
};
