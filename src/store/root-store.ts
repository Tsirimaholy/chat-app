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

export const useStore = create<State & Action>(persist((set) => ({
    user: {
        id: null,
        name: "",
        bio: "",
        email: "",
        mail: ""
    },
    logIn: async (authInfos) => {
        try {
            const user = await UserApi.logIn(authInfos);
            set((state) => ({...state, user}));
        } catch (e) {
            console.error(e.message);
            throw e;
        }
    },
    logout: () => set(() => ({user: {username: "", password: ""}}))
}), {
    name: AUTH_INFOS,
}))

