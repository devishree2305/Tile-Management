import axios from "./AxiosInstance";

const API_URL = "https://localhost:<YOUR-PORT>/api/applicationMaster";

export const getApplicationMasters = () => axios.get(API_URL);

export const createApplicationMaster = (data) => axios.post(API_URL, data);

export const updateApplicationMaster = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteApplicationMaster = (id) =>
  axios.delete(`${API_URL}/${id}`);
