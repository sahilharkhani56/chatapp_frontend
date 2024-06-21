import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import useFetch from "../hooks/fetchhooks";
import "./ChatContainer.scss";
import { Avatar } from "@mui/material";
import axios from "axios";
import "../styles/ChatContainer.css";
import moment from "moment/moment";

const addMessageUrl = `${import.meta.env.VITE_BACKEND_URI}/api/addMessage`;
const getMessageUrl = `${import.meta.env.VITE_BACKEND_URI}/api/getMessage`;
export const Chat_container = (props) => {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [checker , setChecker] = useState(false);
  const messagesEndRef = useRef(null)

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setChecker(!checker);
    if(currentChatMessage.length===0)return;
    if (currentChatMessage.length > 0) {
      setCurrentChatMessage('');
    }
    const receiver=props?.data._id;
    
    const addMessage=await axios.post(addMessageUrl, {
      from: apiData?._id,
      to: props?.data._id,
      message: currentChatMessage,
    });
    const localTime=addMessage.data.data.createdAt;
    props.socket?.emit('newMessage', {receiver,currentChatMessage,localTime});
    console.log(addMessage);
    var formatedTime=moment(localTime).format('h:mm a');
    setAllMessages((value)=>{
      return [...value,{
        fromSelf:true,
        message:currentChatMessage,
        createdAt:formatedTime,
      }]
    })
    // console.log(props?.data._id);
  };
  async function getAllMsg() {
    const response = await axios.post(getMessageUrl, {
      from: apiData?._id,
      to: props?.data._id,
    });
    setAllMessages(response.data);
    console.log(props?.data._id);
  }
  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    props.socket?.on("messageResponse",({currentChatMessage,localTime})=>{
      var formatedTime=moment(localTime).format('h:mm a');
      setAllMessages((value)=>{
        return [...value,{
          fromSelf:false,
          message:currentChatMessage,
          createdAt:formatedTime,
        }]
      })
    })
    return ()=>{
      props.socket?.off("messageResponse")
    }
  },[allMessages])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    getAllMsg()
  }, [props?.data,apiData]);
  
 

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
  return (
    <>
      <div
        className="text-3xl mt-16 mb-64 h-[calc(100%-200px)] messages" style={{ backgroundColor: "#E4DCCF" }} >
        <ul>
          {allMessages.map((dataObj, index) => {
            return (
              <div key={index} > {dataObj.fromSelf === true ? (
                  <li key={index} className="replies" ><div>
                      <Avatar sx={ apiData?.username !== undefined ? {
                                bgcolor: stringToColor1(apiData?.profile),
                                width: 30,
                                height: 30,
                              }: {
                                bgcolor: stringToColor1("G"),
                                width: 30,
                                height: 30,
                              }} src={apiData?.profile} size="sm">
                          {apiData?.username !== undefined ? apiData?.username.split(" ").length > 1
                            ? apiData?.username.split(" ")[0][0].toUpperCase() 
                            : apiData?.username.split(" ")[0][0].toUpperCase() : "G"}
                      </Avatar>
                    </div>
                    <p
                      className="relative  py-2 text-lg shadow rounded-xl  mb-1 " style={{ backgroundColor: "#c8e6c9" }} >
                      {dataObj.message}
                    <span className="timeReceive pt-1">{dataObj.createdAt}</span>
                    </p>
                  </li>
                  
                ) : (
                  <li key={index} className="sent"> <div>
                  <Avatar  sx={  props?.data.username !== undefined  ? {
                                bgcolor: stringToColor1(props?.data.username),
                                width: 30,
                                height: 30,
                              }  : {
                                bgcolor: stringToColor1("G"),
                                width: 30,
                                height: 30,
                              }  }  src={props?.data.profile}  size="sm"  >
                              {props?.data.username !== undefined  ? props?.data.username.split(" ").length > 1
                            ? props?.data.username.split(" ")[0][0].toUpperCase() +
                              props?.data.username.split(" ")[1][0].toUpperCase()
                            : props?.data.username.split(" ")[0][0].toUpperCase(): "G"}
                      </Avatar>
                    </div>
                    <p className="relative  text-lg bg-white pt-2   shadow rounded-xl">
                      {dataObj.message}
                    <span className="timeReceive pt-1">{dataObj.createdAt}</span>
                    </p>
                  </li>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef}/>
        </ul>
      </div>
      <div className="bg-gray-10 float-right w-[calc(75%-30px)] absolute bottom-4 right-5 h-16 ">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className=" flex pb-0"
          autoComplete="off"
        >
          <input
            placeholder="Type a message"
            className="w-11/12 h-14 bg-gray-10 outline-none ml-3 text-lg"
            onChange={(e) => setCurrentChatMessage(e.target.value)}
            value={currentChatMessage}
          ></input>
          <div className="w-1/12 text-center m-auto ">
            <button type="submit" className="sendBtn">
              <SendIcon fontSize="large"></SendIcon>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
