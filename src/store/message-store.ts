import {CreateMessage, TMessage} from "@/types/entities/TMessage";
import {create} from "zustand";
import MessageApi from "@/services/message-api";

type State = {
    messages: TMessage[]
}

type Action = {
    getMessagesByUser: (id: number) => Promise<TMessage[]>;
    getMessagesByChannel: (id: number) => Promise<TMessage[]>;
    sendMessage: (channelId: number, message: CreateMessage)=>Promise<void>;
}

const useMessageStore = create<State & Action>()((set) => ({
    messages: [],
    getMessagesByUser: async (id: number) => {
        try {
            const messages = await MessageApi.getAllMessageByUser(id);
            set(() => ({messages}));
            return messages;
        } catch (e) {
            throw e;
        }
    },
    sendMessage: async (channelId: number, message: CreateMessage)=>{
        try {
            await MessageApi.sendMessage(channelId, message);
            console.log(message)
            const messagesByChannel = await MessageApi.getMessageByChannel(channelId);
            set(state => ({...state, messages: messagesByChannel}));
        }catch (e) {
            throw e;
        }
    },
    getMessagesByChannel: async (id: number) => {
        try {
            const messages = await MessageApi.getMessageByChannel(id);
            set(() => ({messages}));
            return messages;
        } catch (e) {
            throw e;
        }

    }
}));

export default useMessageStore;