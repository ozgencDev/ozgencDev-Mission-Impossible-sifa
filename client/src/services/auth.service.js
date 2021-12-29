import axios from "axios";

const API_URL = "https://mission-alot.herokuapp.com/auth/login";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

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
  getCurrentUser,
};
