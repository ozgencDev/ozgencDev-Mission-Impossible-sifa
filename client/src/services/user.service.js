import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://mission-alot.herokuapp.com"; //url
const api = "/api/"; //api url

const client = axios.create({ //create axios client
  baseURL: API_URL,
  headers: authHeader()
});

const refTokCli = axios.create({ //create axios client for refTokCli
  baseURL: API_URL,
  headers: authHeader()
});

/* If the access token is expired, we wait for a 401 
return to request a new access token, if 401 is not returned, 
the routes are requested normally. */
client.interceptors.response.use( 
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const user = localStorage.getItem("user"); //get user data from local storage

      if (user) { //if user is valid
        return refTokCli
          .post("/auth/refresh", { 
            refreshToken: JSON.parse(user).refreshToken //send refresh token to backend to check if token is valid
          })
          .then((response) => {
            const { accessToken } = response.data; //get access token from response

            localStorage.setItem(
              "user",
              JSON.stringify(Object.assign(JSON.parse(user), { accessToken })) //store user data in local storage
            );
            //client.defaults.headers.common["x-access-token"] = `${accessToken}`;
            return;
          });
      }
    }
    return Promise.reject(error);
  }
);

const getPublicContent = () => {
  return client.get(API_URL + api + "all"); //get all data from backend
};
/* api/users request */
const getUserBoard = () => {
  return client.get(API_URL + api + "users", { headers: authHeader() });
};
/* api/create request */
const createUser = (user) => {
  return client.post(API_URL + api + "create", user, { headers: authHeader() });
};
/* api/update request */
const updateUserById = (id, user) => {
  return client.put(API_URL + api + "update/" + id, user, {
    headers: authHeader()
  });
};
/* api/delete request */
const deleteUserById = (id) => {
  return client.delete(API_URL + api + "delete/" + id, {
    headers: authHeader()
  });
};
const getAdminBoard = () => {
  return client.get(API_URL + api + "admin", { headers: authHeader() });
};

export {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  createUser,
  updateUserById,
  deleteUserById
};
