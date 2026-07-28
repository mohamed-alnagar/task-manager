import api from "./axios";


export const getTasks = (params) => {

    return api.get("/tasks", {
        params
    });

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