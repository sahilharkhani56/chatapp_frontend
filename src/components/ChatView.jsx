import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import avatar from "../assets/avatar.jpg";
import useFetch from "../hooks/fetchhooks.js";
import { Chat_container } from "./ChatContainer";
import {Welcome}from "./welcome";
import { useNavigate } from "react-router-dom";
import{ Avatar} from "@mui/material";
import '../styles/ChatView.css'
const chat_view = (props) => {
  // console.log(socket);
  const navigateTo=useNavigate()
  const [currentChat,setCurrentChat]=useState()
  useEffect(()=>{
    setCurrentChat(props.data)
  },[props.data])
  function userLogout(){
    localStorage.removeItem('token')
    navigateTo('/')
    window.location.reload();
  }
  function stringToColor1(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  // console.log(props.data);
  // console.log(currentChat+"x");
  return (
    <div className="bg-gray-10 float-right w-3/4 h-full box-border border-gray-400 border-2">
      <div className="bg-gray-10 float-right w-[calc(75%-30px)] absolute top-[calc(18px)] right-5 h-16 flex ">
        {props?.data.username!==undefined?(<div className="  w-11/12 h-full flex items-center">
          <div className="profile w-1/12 flex justify-center items-center">
            {/* <img
              src={props.data.profile || avatar}
              className="h-10 w-10  rounded-full  cursor-pointer text-center m-auto "
              alt="image"
            ></img> */}
            <Avatar
                  sx={props?.data.username!==undefined?{bgcolor: stringToColor1(props?.data.username)}:{bgcolor: stringToColor1('G')}}
                  src={props?.data.profile}
                  size="lg"   
                >
                  {props?.data.username!==undefined?(props?.data.username.split(" ").length > 1
                    ? props?.data.username.split(" ")[0][0].toUpperCase() +
                    props?.data.username.split(" ")[1][0].toUpperCase()
                    : props?.data.username.split(" ")[0][0].toUpperCase()):'G'}
                </Avatar>
                
          </div>
          <div className="w-11/12">
          <span className="text-xl w-full text-center text-gray-900">
              {props.data.username || "User"}
            </span>
          </div>
        </div>):(<div className="w-11/12"></div>)}
        <div className="w-1/12  text-center m-auto ">
          <button onClick={userLogout} className="logOutBtn">
            <LogoutIcon fontSize="large"></LogoutIcon>
          </button>
        </div>
      </div>
      {currentChat?.length===0?(<Welcome/>):(<Chat_container data={props.data} currentChat={currentChat} socket={props.socket}/>)}
      {/* {console.log(}  */}

    </div>
  );
};

export default chat_view;
