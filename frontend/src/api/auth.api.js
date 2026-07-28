import api from "./axios";


export const registerUser = (data)=>{

    return api.post("/register", data);

};


export const loginUser = (data)=>{

    return api.post("/login", data);

};