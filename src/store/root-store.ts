import {create} from "zustand";
import {AuthInfos} from "@/models/Auth";
import {persist} from "zustand/middleware";
import {AUTH_INFOS} from "@/constant/storage";

type State = {
    user: AuthInfos
}

type Action = {
    updateAuthInfos: (authInfos: State["user"]) => void;
    logout: () => void
}

export const useStore = create<State & Action>(persist((set) => ({
    user: {
        username: "",
        password: ""
    },
    updateAuthInfos: (authInfos) => set(() => ({user: {...authInfos}})),
    logout: () => set(() => ({user: {username: "", password: ""}}))
}), {
    name: AUTH_INFOS,
}))

