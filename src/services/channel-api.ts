import api from "@/services/api";
import {Channel} from "@/types/entities/channel/Channel";
import axios, {AxiosError} from "axios";

class ChannelApi {
    async getAll() {
        try {
            const {data} = await api.get("/channels");
            return data?.channels as Channel[];
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.message)
            }
            throw e;
        }
    }

    async updateChannel(id: number):Promise<Channel>{
        // Todo implement channel name update
         throw new Error("Not implemented");
    }

    async getChannelById(id: number) {
        try {
            const {data} = await api.get(`/channel/${id}`);
            return data?.channel as Channel;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.message)
            }
            throw e;
        }
    }

    async createChannel(channel: Channel) {
        try {
            const {data} = await api.post("/channel", {...channel, members: []});
            return data?.channel as Channel;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.message)
            }
            throw e;
        }
    }
}

export default new ChannelApi();