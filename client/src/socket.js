import { io } from "socket.io-client";
// const URL = process.env.NODE_ENV === 'production' ? undefined : `${process.env.NODE_PORT}/`;
// const URL =
  // process.env.NODE_ENV === "production" ? undefined : "http://localhost:3035";
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4100/';
const URL = "http://localhost:3035/";
export const socket = io(URL);
