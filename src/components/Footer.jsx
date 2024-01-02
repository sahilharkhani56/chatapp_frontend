import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {Formik, useFormik} from 'formik'

const footer = (props) => {
  const [message,setMessage]=useState();
  const formik =useFormik({
    initialValues:{
      message:''
    },
    onSubmit: (values,resetForm) =>{
      console.log(values.message);
      setMessage(values.message);
      props.funcc(message)
      resetForm({message:""});
    }}
)
  return (
    <div className="bg-gray-10 float-right w-[calc(75%-30px)] absolute bottom-5 right-5 h-16 ">
      <form onSubmit={Formik.handleSubmit} className="h-full flex " autoComplete="off" >
        <input {...formik.getFieldProps('message')}
          placeholder="Type a message"
          className="w-11/12 h-full bg-gray-10 outline-none ml-3"
        ></input>
        <div className="w-1/12 text-center m-auto">
          <button type='submit'>
            <SendIcon fontSize="large"></SendIcon>
          </button>
        </div>
        </form>
    </div>
  );
};

export default footer;
