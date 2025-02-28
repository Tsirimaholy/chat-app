import api from "@/services/api";
import {User} from "@/types/entities/Auth";

export type AuthUser = {
    email: string;
    password: string;
}

class AuthApi {
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

export default new AuthApi();