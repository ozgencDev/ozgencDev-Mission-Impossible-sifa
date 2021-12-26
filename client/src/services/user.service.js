import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3010/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const createUser = (user) => {
  return axios.post(API_URL + "create", user, { headers: authHeader() });
};

const updateUserById = (id, user) => {
  return axios.put(API_URL + "update/" + id, user, { headers: authHeader() });
};

const deleteUserById = (id) => {
  return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  createUser,
  updateUserById,
  deleteUserById,
};
