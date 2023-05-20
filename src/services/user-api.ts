import api from "@/services/api";
import {User} from "@/models/Auth";

export type AuthUser = {
    email: string;
    password: string;
}

class UserApi {
    async logIn(userDetails: AuthUser) {
        const {data} = await api.post<User>("/users/login", userDetails);
        const user = data?.user as User;
        // JWT intercept
        this.setUpJWT(user.token);
        return user;
    }

    async signUp() {
        const request = await api.post("/users");
        return {request}
    }

    setUpJWT(token: string) {
        console.info("Running interceptors")
        api.interceptors.request.use((config) => {
            config.headers.Authorization = "JWT " + token;
            return config;
        })
    }
}

export default new UserApi();