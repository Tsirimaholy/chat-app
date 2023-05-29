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
    getChannelById: (id: number)=>Promise<Channel>;
    createChannel: (channel: Channel) => Promise<Channel>;
    updateChannel: (id: number)=>Promise<Channel>;
}

export const useChannelStore = create<State & Action>()(persist((setState, get) => {
    return ({
        channels: [],
        getChannels: async () => {
            const channels = await ChannelApi.getAll();
            setState(() => ({channels}));
            return get().channels;
        },
        getChannelById: async (id: number) => {
            return await ChannelApi.getChannelById(id);
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
        },
        updateChannel: async (id: number) => {
            return await ChannelApi.updateChannel(id);
        }
    });
}, {name: CHANNELS_STORAGE}));