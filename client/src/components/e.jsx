// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { currectUserId } from "./test";

// export const Test = () => {
//   const [converstion, setConverstiion] = useState([]);
//   const [Input, setInput] = useState("");
//   useEffect(() => {
//     axios
//       .get(
//         "http://localhost:3035/api/chat/converstionget/65f5aadc6e40826d3dcf959b",
//         {
//           headers: { token },
//         }
//       )
//       .then((res) => {
//         console.log(res.data.data);
//         setConverstiion(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const sendMessage = () => {
//     let message = Input;
//     axios
//       .post(`http://localhost:3035/api/chat/messagesend/65f5aadc6e40826d3dcf959b`, { message }, {
//         headers: { token },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   console.log(converstion);
//   return (
//     <div>
//       {converstion.map((el) => {
//         if (el.senderid === currectUserId) {
//           return <div>milan {el.message}</div>;
//         } else {
//           return <div>other {el.message}</div>;
//         }
//       })}
//       <div>
//         <input
//           type="text"
//           value={Input}
//           onChange={(event) => {
//             setInput(event.target.value); // Corrected handling of input change
//           }} />
//         <button onClick={() => sendMessage()}>Send</button>
//       </div>
//     </div>
//   );
// };
