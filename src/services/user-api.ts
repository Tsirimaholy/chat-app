import api from "@/services/api";
import {User} from "@/models/Auth";

export type AuthUser = {
    email: string;
    password: string;
}

class UserApi {
    async logIn(userDetails: AuthUser) {
        const {data} = await api.post("/users/login", userDetails);
        const user = data?.user as User;
        return user;
    }

    async signUp() {
        const request = await api.post("/users");
        return {request}
    }

}

export default new UserApi();