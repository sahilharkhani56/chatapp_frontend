import React from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { Formik, useFormik } from "formik";
import avatar from "../assets/avatar.jpg";
import { passwordValidate } from "../helper/validate";
import { useAuthStore } from '../store/store.js'
import useFetch from "../hooks/fetchhooks.js";
import { getUsername } from "../helper/helper";
import {login_verifyPassword} from '../helper/helper'
export default function Password() {
  const navigateTo=useNavigate()
  // console.log("hello");
  const {username}=useAuthStore(state=>state.auth)
  const [{isLoading,apiData,serverError}]=useFetch(`/user/${username}`)
  // console.log(username);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // validate: passwordValidate,
    onSubmit: async (values) => {
      let loginPromise=login_verifyPassword({username,password:values.password})
      toast.promise(loginPromise,{
        loading:"Checking...!",
        success:<b>Login Successfully..!</b>,
        error:<b>Password Not Match</b>
      })
      loginPromise.then(res=>{
        let {token} = res.data
        localStorage.setItem('token',token)
        navigateTo('/chat')
      })
    },
  });
  if(isLoading){
    return <h1 className="text-2xl font-bold">Loading</h1>
  }
  if(serverError){
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen py-8">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Hello {apiData?.firstName || apiData?.username}</h4>
            <span className="py-4 text-large w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="image"
              ></img>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              ></input>
              <button type="submit" className={styles.btn}>
                Sign in
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
