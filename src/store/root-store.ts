import {create} from "zustand";
import {User} from "@/models/Auth";
import {persist} from "zustand/middleware";
import {AUTH_INFOS} from "@/constant/storage";
import UserApi, {AuthUser} from "@/services/user-api";

type State = {
    user: User
}

type Action = {
    logIn: (authInfos: AuthUser) => void;
    logout: () => void
}

const DEFAULT_USER = {
    id: null,
    name: "",
    bio: "",
    email: "",
    mail: ""
};
export const useStore = create<State & Action>(persist((set) => ({
    user: DEFAULT_USER,
    logIn: async (authInfos) => {
        try {
            const user = await UserApi.logIn(authInfos);
            set((state) => ({...state, user}));
        } catch (e) {
            console.log(e.message);
            throw e;
        }
    },
    logout: () => set(() => ({user: DEFAULT_USER}))
}), {
    name: AUTH_INFOS,
}))

