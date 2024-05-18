import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Test } from "./components/test";
import { Login } from "./routes/login";
import { Chat } from "./routes/chat";
import { AddChat } from "./components/addChat";
function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/test" element={<AddChat />} />
        <Route path="/chat/:converstionId?" element={<Chat />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<div className="bg-red-500"> tshydgsdb</div>} /> */}
      </Routes>
    </div>
  );
}

export default App;
