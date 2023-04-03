import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext);

  // const resetchatId =()=>{
  //   dispatch({ type: "RESET_USER"});
  // }

  const aftersign=()=>{
    console.log(currentUser,"curruser");
    dispatch({ type: "RESET_USER"});
  }

  return (
    <div className='navbar'>
      <span className="logo">Let's Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>{signOut(auth);aftersign()}}>logout</button>
      </div>
    </div>
  )
}

export default Navbar