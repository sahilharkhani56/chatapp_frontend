import axios from "axios";

import jwt_decode from "jwt-decode";
// import { Promise } from 'node-fetch';
axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URI}`;
// make api request

// get username from token
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Can't find Token");
  let decode = jwt_decode(token);
  // console.log(decode);
  return decode;
}
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "User doesn't exist..!" };
  }
}
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`, { username });
    return { data };
  } catch (error) {
    return { error: "Password doesn't match..!" };
  }
}
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);
    let { username, email } = credentials;

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
export async function login_verifyPassword({ username, password }) {
  try {
    if (username && password) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
    else {
      return Promise.reject({ error: "All fields are required!" });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match.!" });
  }
}
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile.!" });
  }
}