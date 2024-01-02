import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import useFetch from "../hooks/fetchhooks";
import { Toaster, toast } from "react-hot-toast";
import { Formik, useFormik } from "formik";
import avatar from "../assets/avatar.jpg";
import { profileValidate } from "../helper/validate";
import convertToBase64 from '../helper/convert.js'
import { updateUser } from "../helper/helper";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export default function Profile() {

  const navigateTo=useNavigate()
  const [file,setFile]=useState()
  const [{isLoading,apiData,serverError}]=useFetch()
  // useEffect(()=>{
  //   console.log(apiData?.firstName);
  // })
  const formik = useFormik({
    initialValues: {
      firstName:apiData?.firstName ||'',
      lastName:apiData?.lastName ||'',
      email:apiData?.email ||'',
      mobile:apiData?.mobile ||'',
    },
    enableReinitialize:true,
    validate: profileValidate,
    onSubmit: async (values) => {
      values=await Object.assign(values,{profile :file ||apiData?.profile|| ''})
      let updatePromise=updateUser(values)
      toast.promise(updatePromise,{
        loading:'Updating..',
        success:<b>Update Successfully..!</b>,
        error:<b>Could not Update!</b>

      })
    },
  });
  const onUpload=async e=>{
    const base64=await convertToBase64(e.target.files[0])
    setFile(base64)
    // console.log(base64);
  }
  if(isLoading){
    return <h1 className="text-2xl font-bold">Loading</h1>
  }
  if(serverError){
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>
  }
  // logout
  function userLogout(){
    // localStorage.removeItem('token')
    navigateTo(-1)
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
    {/* <ArrowBackIosIcon className=" "></ArrowBackIosIcon> */}
      <div className="flex justify-center items-center h-screen z-0 ">
        <div className={`${styles.glass}`} style={{padding:'10px'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold pt-5">Profile!</h4>
            <span className="py-1 text-large w-2/3 text-center text-gray-500">
              You can update the details;
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-3">
              <label htmlFor="profile">
              <img
                src={apiData?.profile||file || avatar}
                className={styles.profile_img}
                alt="image" 
              ></img>
              </label>
              <input type="file" id="profile" name="profile" onChange={onUpload}></input>
            </div>

            <div className="textbox flex flex-col items-center gap-3">
            <div className="name flex w-3/4 gap-3">
            <input {...formik.getFieldProps("firstName")} className={styles.textbox} type="text" placeholder="Firstname"></input>
            <input {...formik.getFieldProps("lastName")} className={styles.textbox} type="text" placeholder="Lastname"></input>
            </div>

            <div className="name flex w-3/4 gap-3">
            <input {...formik.getFieldProps("mobile")} className={styles.textbox} type="text" placeholder="Mobile No."></input>
            <input {...formik.getFieldProps("email")} className={styles.textbox} type="email" placeholder="Email"></input>
            </div>

          
            <button type="submit" className={styles.btn}>
                Update
            </button>
            

          </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back to chat?{" "}
                <button className="text-red-500" onClick={userLogout}>
                  press
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
