import {create} from "zustand";
import ChannelApi from "@/services/channel-api";
import {persist} from "zustand/middleware";
import {Channel} from "@/models/Channel";
import {CHANNELS_STORAGE} from "@/constant/storage";

type State = {
    channels: Channel[];
}

type Action = {
    getChannels: () => Promise<State["channels"]>;
    createChannel: (channel: Channel) => Promise<Channel>;
}

export const useChannelStore = create<State & Action>()(persist((setState, get) => ({
    channels: [],
    getChannels: async () => {
        const channels = await ChannelApi.getAll();
        setState(() => ({channels}));
        return get().channels;
    },
    createChannel: async (channel: Channel) => {
        try {
            const createdChannel = await ChannelApi.createChannel(channel);
            await get().getChannels();
            return createdChannel;
        } catch (e) {
            console.info("caught on store layer");
            throw e;
        }
    }
}), {name: CHANNELS_STORAGE}));