import {Message} from "@/models/Message";
import {create} from "zustand";
import MessageApi from "@/services/message-api";

type State = {
    messages: Message[]
}

type Action = {
    getMessagesByUser: (id: number) => Promise<Message[]>;
    getMessagesByChannel: (id: number) => Promise<Message[]>;
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