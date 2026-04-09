import axios from "axios";

const API = "http://localhost:5000";

export const getTasks = () => axios.get(`${API}/tasks`);
export const addTask = (data) => axios.post(`${API}/tasks`, data);
export const updateTask = (id) => axios.patch(`${API}/tasks/${id}`);
export const deleteTask = (id) => axios.delete(`${API}/tasks/${id}`);