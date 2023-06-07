import {create} from "zustand";
import {User} from "@/models/Auth";
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
    setUpUnauthorizedInterceptor:()=>number
}

const DEFAULT_USER: User = {
    id: -1,
    name: "",
    bio: "",
    email: "",
    mail: "",
    token: ""
};
export const useAuthStore = create<State & Action>()(persist((set, get) => ({
    user: DEFAULT_USER,
    logIn: async (authInfos) => {
        const user = await UserApi.logIn(authInfos);
        set((state) => ({...state, user}));
    },
    logout: () => {
        localStorage.clear();
        set(() => ({user: DEFAULT_USER}));
    },
    setUpUnauthorizedInterceptor: () => (
        api.interceptors.response.use(null, (error) => {
            if (error.response.status) {
                get().logout();
            }
            return Promise.reject(error);
        }))
}), {name: AUTH_INFOS}))

