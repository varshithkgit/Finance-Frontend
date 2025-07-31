import axios from "axios";

const aClient=axios.create({
    baseURL:"https://finance-backend-txwi-qudr9nffm-varshith-ks-projects-c5fab339.vercel.app/",
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
});

export default aClient;