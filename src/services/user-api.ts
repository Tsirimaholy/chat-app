import api from "@/services/api";
import {OtherUser, User} from "@/types/entities/Auth";

class UserApi {
    async getAllUsers(){
        try {
            const {data} = await api.get('/users');
            return data?.users as OtherUser[];
        }catch (e) {
            await Promise.reject(e);
        }
    }

}

export default new UserApi();