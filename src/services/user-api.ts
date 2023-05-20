import api from "@/services/api";
import {User} from "@/models/Auth";
import {AxiosResponse} from "axios";

export type AuthUser = {
    email: string;
    password: string;
}

class UserApi {
    async logIn(userDetails: AuthUser) {
        const {data} = await api.post<User>("/users/login", userDetails);
        return data["user"] as User;
    }

    signUp() {
        const request = api.post("/users");
        return {request}
    }
}

export default new UserApi();