import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {

    const getMessages = () => {
       onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        console.log(`${data.chatId} and ${doc.exists()} and ${doc.data()}`);
          doc.exists() && setMessages(doc.data().messages);
        });
    // const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    // console.log(`${data.chatId} and ${doc.exists()} and ${doc.data()}`);
    //   doc.exists() && setMessages(doc.data().messages);
    // });

    // return () => {
    //   // setMessages([]);
    //   unSub();
    // };
  };
    
    data.chatId && getMessages();
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages && messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
