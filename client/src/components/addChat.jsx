import React, { useContext, useEffect, useState } from "react";
import { SearchCard } from "./searchcard";
import axios from "axios";
import { SERVER_URL } from "../constant";
import { chatContext } from "../context/chatcontext";

export const AddChat = () => {
  const [hidden, setHidden] = useState(true);
  const [Search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);

  const toggleModal = () => {
    setHidden(!hidden);
  };
  const searchSet = (el) => {
    setSearch(el.target.value);
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/user/userSerach?search=${Search}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [Search]);
  return (
    <>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onClick={toggleModal}
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Add Chat
        </span>
      </div>
      {/* Main modal */}
      <div
        className={`flex justify-center fixed top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-y-auto md:inset-0 h-modal md:h-full ${
          hidden ? "hidden" : ""
        }`}
      >
        <div className="relative w-full h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Modal header */}
            <div className="flex items-start justify-between px-6 py-4 rounded-t">
              <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                find friend with search
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={toggleModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="px-4 space-y-4 md:px-6">
              {/* Checkbox and select options */}
              {/* Example */}
              <div className="relative">
                <div className="text-white absolute top-[14px] left-[6px]">
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <input
                  value={Search}
                  onChange={searchSet}
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Find Friends...Email or Name"
                />
                {/* <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button> */}
              </div>
              {/* searching */}

              {/* content */}
              <div className="flex flex-wrap justify-center gap-2 p-6 space-x-1 rounded-b dark:border-gray-600">
                {/* <SearchCard /> */}
                {Users.map((el) => {
                  return <SearchCard data={el} setHidden={setHidden} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
