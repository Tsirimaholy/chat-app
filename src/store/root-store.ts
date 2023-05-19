import {create} from "zustand";
import {AuthInfos} from "@/models/Auth";

type State = {
    user: AuthInfos
}

type Action = {
    updateAuthInfos: (authInfos: State["user"]) => void;
    logout: ()=>void
}

export const useStore = create<State & Action>((set) => ({
    user: {
        username: "",
        password:""
    },
    updateAuthInfos: (authInfos) => set((state)=> ({user: {...authInfos}})),
    logout: () => set(() => null)
}))

