import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://mission-alot.herokuapp.com";
const api = "/api/";

const client = axios.create({
  baseURL: API_URL,
  headers: authHeader(),
});

const refTokCli = axios.create({
  baseURL: API_URL,
  headers: authHeader(),
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const user = localStorage.getItem("user"); //access çek buradan

      if (user) {
        return refTokCli
          .post("/auth/refresh", {
            refreshToken: JSON.parse(user).refreshToken,
          })
          .then((response) => {
            const { accessToken } = response.data;

            localStorage.setItem(
              "user",
              JSON.stringify(Object.assign(JSON.parse(user), { accessToken }))
            );
            //client.defaults.headers.common["x-access-token"] = `${accessToken}`;
            return;
          }); //vvvvv sıkıntı olabilir catch
      }
    }
    return Promise.reject(error);
  }
);

const getPublicContent = () => {
  return client.get(API_URL + api + "all"); //buraya varırken 401 alıyoruz api validation kısmında
};

const getUserBoard = () => {
  return client.get(API_URL + api + "users", { headers: authHeader() });
};

const createUser = (user) => {
  return client.post(API_URL + api + "create", user, { headers: authHeader() });
};

const updateUserById = (id, user) => {
  return client.put(API_URL + api + "update/" + id, user, {
    headers: authHeader(),
  });
};

const deleteUserById = (id) => {
  return client.delete(API_URL + api + "delete/" + id, {
    headers: authHeader(),
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
  deleteUserById,
};
