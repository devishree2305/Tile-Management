import axios from "axios";

const AUTH_API = "https://localhost:YOUR-PORT/api/auth"; // match your controller route

export const loginUser = (data) => axios.post(`${AUTH_API}/login`, data);
export const registerUser = (data) => axios.post(`${AUTH_API}/register`, data);
