import {create} from "zustand";
import {User} from "@/types/entities/Auth";
import {persist} from "zustand/middleware";
import {AUTH_INFOS} from "@/constant/storage";
import UserApi, {AuthUser} from "@/services/user-api";
import api from "@/services/api";

type State = {
    user: User
}

type Action = {
    logIn: (authInfos: AuthUser) => Promise<void>;
    logout: () => void,
    setUpUnauthorizedInterceptor: () => number,
    setUpJWT: (token: string) => number
}

const DEFAULT_USER: User = {
    id: -1,
    name: "",
    bio: "",
    email: "",
    mail: "",
    token: ""
};
export const useAuthStore = create<State & Action>()(persist((set, get, store) => ({
    user: DEFAULT_USER,
    setUpJWT: function (token: string) {
        return api.interceptors.request.use((config) => {
            config.headers.Authorization = "JWT " + token || get().user.token;
            return config;
        })
    }, logIn: async (authInfos) => {
        const user = await UserApi.logIn(authInfos);
        set((state) => ({...state, user}));
        get().setUpJWT(user.token);
    },
    logout: () => {
        localStorage.clear();
        set(() => ({user: DEFAULT_USER}));

    },
    setUpUnauthorizedInterceptor: () => (
        api.interceptors.response.use(null, (error) => {
            if (error.response.status == 401) {
                get().logout();
            }
            return Promise.reject(error);
        }))
}), {name: AUTH_INFOS}))

