import axios from "axios";

const aClient=axios.create({
    baseURL:"https://finance-backend-chi.vercel.app/",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
});

export default aClient;