import './App.css'
import Chat from './components/Chat'
import React, { useState, useEffect } from "react";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Profile from './components/Profile.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import {AuthrizerUser} from './middleware/auth'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Login ></Login>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/profile',
    element:<AuthrizerUser><Profile/></AuthrizerUser>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  },
  {
    path:'/chat',
    element:<AuthrizerUser><Chat /></AuthrizerUser>
  }
])
function App() {
  return (
    <>
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
    </>
  )
}

export default App
