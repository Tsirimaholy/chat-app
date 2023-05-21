import {create} from "zustand";
import ChannelApi from "@/services/channel-api";
import {persist} from "zustand/middleware";
import {Channel} from "@/models/Channel";
import {CHANNELS_STORAGE} from "@/constant/storage";

type State = {
    channels: Channel[];
}

type Action = {
    getChannels: () => State["channels"];
    createChannel: (channel: Channel) => Channel;
}

export const useChannelStore = create<State & Action>(persist((setState, get) => ({
    channels: [],
    getChannels: async () => {
        const channels = await ChannelApi.getAll();
        setState(() => ({channels}));
    },
    createChannel: async (channel: Channel) => {
        const createdChannel = await ChannelApi.createChannel(channel);
        get().getChannels();
        return createdChannel;
    }
}), {name: CHANNELS_STORAGE}));