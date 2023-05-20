import Axios from "axios";
import config from "./api-conf";


export default Axios.create({
    baseURL: config.baseUrl,
    timeout: 2000,
});