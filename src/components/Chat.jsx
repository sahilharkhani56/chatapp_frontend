import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import Chat_view from "./ChatView";
import socketIO from 'socket.io-client';
let socket;
const Chat = () => {
  const [data,setData]=useState([]);
  const [message,setMessage]=useState();
  const pull_data = (data) => {
    setData(data)
  }
  useEffect(()=>{
    const token=localStorage.getItem('token')
    let {userId}=jwt_decode(token);
    if(userId!==undefined){
      socket = socketIO.connect('http://localhost:8080');
    }
    socket.emit('newUser', userId);
  },[])
  return (
    <>
      <div className="flow-root h-screen w-100 box-border p-4 border-0 border-gray-900" style={{backgroundColor:"#fff"}}>
        <Sidebar func={pull_data} socket={socket}/>
          <Chat_view data={data} socket={socket}/>
      </div>
    </>
  );
};

export default Chat;
