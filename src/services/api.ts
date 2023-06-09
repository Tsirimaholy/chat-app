import Axios from "axios";
import config from "./api-conf";


const api = Axios.create({
    baseURL: config.baseUrl,
});
// Todo maybe remove this later
api.interceptors.response.use(null, (error) => {
    if (error.response.status==401) {
        localStorage.clear()
    }
    return Promise.reject(error);
})

export default api;

