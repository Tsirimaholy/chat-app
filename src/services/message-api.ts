import api from "@/services/api";
import {Message} from "@/models/Message";

class MessageApi {
    async getAllMessageByUser(userId: number) {
        try {
            const {data} = await api.get(`/messages/${userId}`);
            return data?.messages as Message[];
        } catch (e) {
            throw e;
        }
    }

    async getMessageByChannel(channelId: number){
        try {
            const {data} = await api.get(`/messages/channel/${channelId}`);
            return data?.messages as Message[];
        }catch (e) {
            throw e;
        }
    }
}

export default new MessageApi();