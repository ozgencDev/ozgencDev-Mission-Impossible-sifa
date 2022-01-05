import axios from "axios";

const API_URL = "https://mission-alot.herokuapp.com/auth/login";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password
  });
};
/* Saves json object returned from auth/log to local storage */
const login = (username, password) => {
  return axios
    .post(API_URL, {
      username,
      password
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
/* Deletes user information and access - refresh token from local storage */
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
