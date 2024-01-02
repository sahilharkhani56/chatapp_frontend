import React from "react";
import "../index.css";
import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/download.png";
import Contect_list from "./Contect_list";
import useFetch from "../hooks/fetchhooks.js";
import { getUsername } from "../helper/helper.jsx";
import{ Avatar} from "@mui/material";
import '../styles/sidebar.css'
import { useNavigate } from "react-router-dom";
const sidebar = (props) => {
  const navigateTo=useNavigate();
  // const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch();
  const pull_data = (data) => {
    props.func(data) // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
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
  const UserProfile=()=>{
    navigateTo('/profile')
  }
  // console.log("hello        "+res);  
  return (
    <>
      <div className="w-1/4 bg-gray-10 float-left h-full box-border  border-2 border-gray-400 border-r-0 " >
        <div className="bg-gray-10  top-5 h-16 flex w-full">
          <span
            className="text-3xl w-6/12 ml-4 text-gray-700 text-left m-auto font-bold align-middle "
            style={{ fontFamily: "Pacifico" }}
          >
            Chats
          </span>
          <div className="userprofile w-6/12 m-auto flex  p-1 mr-2 " onClick={UserProfile}>
            <Avatar className="border-2"
                      sx={
                        apiData?.username !== undefined
                          ? { bgcolor: stringToColor1(apiData?.profile),width: 40, height: 40  }
                          : { bgcolor: stringToColor1("G"),width: 40, height: 40 }
                      }
                      src={apiData?.profile}
                      size="sm"
                    >
                      {apiData?.username !== undefined
                        ? apiData?.username.split(" ").length > 1
                          ? apiData?.username
                              .split(" ")[0][0]
                              .toUpperCase() +
                            apiData?.username.split(" ")[1][0].toUpperCase()
                          : apiData?.username.split(" ")[0][0].toUpperCase()
                        : "G"}
                    </Avatar>
            <span className="text-lg w-7/12 ml-2 text-left m-auto font-bold align-middle profile_img">
              {apiData?.username}
            </span>
          </div>
        </div>
        
        <div className="text-center  h-[calc(100%-114px)] ">
          <Contect_list func={pull_data} socket={props.socket}/>
        </div>
      </div>
    </>
  );
};

export default sidebar;
