import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { Formik, useFormik } from "formik";
import avatar from "../assets/avatar.jpg";
import { registerValidation } from "../helper/validate";
import convertToBase64 from '../helper/convert.js'
import { registerUser } from "../helper/helper";
export default function Register() {
  const navigateTo=useNavigate()
  const [file,setFile]=useState()
  const formik = useFormik({
    initialValues: {
      email:'',
      username:"",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values=await Object.assign(values,{profile :file || ''})
      let registerPromise=registerUser(values)
      toast.promise(registerPromise,{
        loading:'Creating...',
        success:<b>Register Successfull!y</b>,
        error:<b>Could not Register</b>
      })
      registerPromise.then(function(){navigateTo('/')})
    },
  });
  const onUpload=async e=>{
    const base64=await convertToBase64(e.target.files[0])
    setFile(base64)
    // console.log(base64);
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{padding:'10px'}}>
          <div className="title flex flex-col items-center mt-6">
            <h4 className="text-4xl font-bold">Register!</h4>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
              <img
                src={file || avatar}
                className={styles.profile_img}
                alt="image"
              ></img>
              </label>
              <input type="file" id="profile" name="profile" onChange={onUpload}></input>
            </div>

            <div className="textbox flex flex-col items-center gap-4">
            <input {...formik.getFieldProps("username")} className={styles.textbox} type="text" placeholder="Username"></input>
            <input {...formik.getFieldProps("email")} className={styles.textbox} type="email" placeholder="Email"></input>
              <input {...formik.getFieldProps("password")} className={styles.textbox} type="text" placeholder="Password"></input>
              <button type="submit" className={styles.btn}>
                Sign in
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Registered?{" "}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
