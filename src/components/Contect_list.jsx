import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import axios from "axios";
import useFetch from "../hooks/fetchhooks.js";
import { getUsername } from "../helper/helper";
import{ Avatar} from "@mui/material";
import "../styles/Contect_list.css";
const Contect_list = (props) => {
  const [contactData, setContactData] = useState([]);
  const [activeUser,setActiveUser]=useState([]);
  const [currentSelected, setCurrentSelected] = useState([]);
  const [filteredList, setFilteredList] = new useState([]);
  // const url = "https://chatapp-backend-relv.onrender.com/api/allUsers";
  const url = `${import.meta.env.VITE_BACKEND_URI}/api/allUsers`;
  
  
  const [{ isLoading, apiData, serverError }] = useFetch();
  const fetchInfo = async () => {
    if (url && apiData?._id) {
      var contects = await axios.get(`${url}/${apiData?._id}`);
      setContactData(contects.data);
      setFilteredList(contects.data)
    }
  };


  useEffect(() => {
    fetchInfo();
    props.socket?.on('activeUserResponse', (data) => {
      setActiveUser(data);
    })
    // console.log(activeUser);
  }, [apiData,props.socket]);

  
  var itemList = [];
  contactData.map((dataObj, index) => {
    itemList.push(dataObj);
  });
  // console.log(filteredList);
  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...itemList];
    updatedList = updatedList.filter((item) => {
      return item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };
  const changeCurrentChat = (index, dataObj) => {
    setCurrentSelected(index);
    props.func(dataObj);
  };

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
      <div className="text-center">
        <input
          placeholder="Search or start new chat"
          className="outline-none w-11/12 h-8 rounded-md mb-4 p-3 border-b-2 border-b-gray-900 border-x border-t "
          onChange={filterBySearch}
        ></input>
      </div>
      {/* <Avatar sx={{ bgcolor:'#blue' }} src={avatar}>NA</Avatar> */}
      <center className="overflow-y-scroll   h-[calc(100%-12px)] ">
        {filteredList.map((dataObj, index) => {
        {/* {contactData.map((dataObj, index) => { */}
          return (
            <div
              className={`allContect w-11/12 bg-gray-10 h-16 m-auto mb-2 rounded-md flex ${
                index === currentSelected ? "selected" : ""
              }`}
              key={index}
              // style={{backgroundColor:"#AEBDCA"}}
              onClick={() => changeCurrentChat(index, dataObj)}
            >
              <div className="profile w-3/12 flex justify-center items-center">
                <Avatar
                  // sx={{ bgcolor: "#blue" }}
                  sx={{bgcolor: stringToColor1(dataObj.username)}}
                  src={dataObj.profile}
                  size="lg"   
                >
                  {dataObj.username.split(" ").length > 1
                    ? dataObj.username.split(" ")[0][0].toUpperCase() 
                    : dataObj.username.split(" ")[0][0].toUpperCase()}
                </Avatar>
              </div>
              <div className="w-9/12 text-left overflow-hidden m-auto ">
                <span
                  className="text-xl w-full  text-gray-10"
                  style={{ color: "grey" }}
                >
                  {dataObj.username || "user"}
                </span>
              </div>
            </div>
          );
        })}
      </center>
    </>
  );
};

export default Contect_list;
