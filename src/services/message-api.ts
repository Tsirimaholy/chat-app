import api from "@/services/api";

class Message {
    async getAllMessageByUser(userId: number) {
        try {
            const {data} = await api.get(`/messages/${userId}`);
            return data?.messages as Message;
        } catch (e) {
            throw e;
        }
    }
}

export default new Message();