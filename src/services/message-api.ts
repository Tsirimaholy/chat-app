import api from "@/services/api";
import {CreateMessage, TMessage} from "@/types/entities/TMessage";

class MessageApi {
    async getAllMessageByUser(userId: number) {
        try {
            const {data} = await api.get(`/messages/${userId}`);
            return data?.messages as TMessage[];
        } catch (e) {
            throw e;
        }
    }

    async sendMessage(channelId: number, message: CreateMessage) {
        try {
            await api.post("/message", {...message})
        } catch (e) {
            throw e;
        }
    }

    async getMessageByChannel(channelId: number) {
        try {
            const {data} = await api.get(`/messages/channel/${channelId}`);
            return data?.messages as TMessage[];
        } catch (e) {
            throw e;
        }
    }
}

export default new MessageApi();