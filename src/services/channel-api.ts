import api from "@/services/api";
import {Channel} from "@/models/Channel";

class ChannelApi {
    async getAll(){
        const {data} = await api.get("/channels");
        return data?.channels as Channel[];
    }
}

export default new ChannelApi();