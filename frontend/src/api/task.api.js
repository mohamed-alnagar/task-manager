import api from "./axios";


export const getTasks = () => {

    return api.get("/tasks");

};



export const getTask = (id) => {

    return api.get(`/tasks/${id}`);

};



export const createTask = (data) => {

    return api.post("/tasks", data);

};



export const updateTask = (id, data) => {

    return api.put(`/tasks/${id}`, data);

};



export const deleteTask = (id) => {

    return api.delete(`/tasks/${id}`);

};