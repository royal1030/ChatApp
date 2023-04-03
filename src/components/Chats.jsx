import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  
  console.log(currentUser.uid,"curuid in chats");

  useEffect(() => {

    console.log(currentUser.uid," inside useeffect in chats");

    const getChats = () => {
      console.log(currentUser.uid,"cur user uid");
      onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        doc.exists() && setChats(doc.data());
        console.log(doc.data(),"chats in (chats)");
      });


      // const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      //   doc.exists() && setChats(doc.data());
      //   console.log(doc.data(),"chats in (chats)");
      // });
      // return () => {
      //   unsub();
      // };
    };
    console.log(currentUser.uid,"curuser.uid in chats");
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
    {console.log(chats,"chats")}
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
