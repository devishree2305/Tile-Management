import axios from "./AxiosInstance";

const API_URL = "https://localhost:<YOUR-PORT>/api/categorymaster";

export const getCategoryMasters = () => axios.get(API_URL);

export const createCategoryMaster = (data) => axios.post(API_URL, data);

export const updateCategoryMaster = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteCategoryMaster = (id) =>
  axios.delete(`${API_URL}/${id}`);
