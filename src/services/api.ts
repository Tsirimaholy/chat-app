import Axios from "axios";
import config from "./api-conf";


const api = Axios.create({
    baseURL: config.baseUrl,
});


export default api;

