import Axios from "axios";
import config from "./api-conf";


const api = Axios.create({
    baseURL: config.baseUrl,
});

api.interceptors.response.use(null,(error) => {
if(error.response.status){
    console.log("unauthoriezd");
    localStorage.clear()
}
    return Promise.reject(error);
})

export default api;

