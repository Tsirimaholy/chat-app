import {create} from "zustand";
import {OtherUser} from "@/types/entities/Auth";
import UserApi from "@/services/user-api";
import {persist} from "zustand/middleware";

type Action  = {
    getAllUsers: ()=>Promise<OtherUser[] | undefined>
}

type State = {
    users: OtherUser[]
}

const useUserStore = create<Action & State>()(persist((set, get, store)=>({
    users: [],
    getAllUsers: async () => {
        try {
            const users = await UserApi.getAllUsers();
            set(state => ({users}));
            return users;
        }catch (e) {
            throw e;
        }
    }
}), {name: "users"}));

export  default useUserStore;