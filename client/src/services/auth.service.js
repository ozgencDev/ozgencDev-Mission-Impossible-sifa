import axios from "axios";

const API_URL = "https://mission-alot.herokuapp.com/auth/login"; //api url

const register = (username, email, password) => {
  return axios.post(API_URL, { //send data to backend to check if user is valid
    username,
    email,
    password
  });
};
/* Saves json object returned from auth/log to local storage */
const login = (username, password) => {
  return axios
    .post(API_URL, { //send data to backend to check if user is valid
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) { //if user is valid
        localStorage.setItem("user", JSON.stringify(response.data)); //store user data in local storage
      }
      return response.data; //return user data
    });
};
/* Deletes user information and access - refresh token from local storage */
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => { 
  return JSON.parse(localStorage.getItem("user")); //get user data from local storage
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
