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
}

export const useChannelStore = create<State & Action>(persist(setState => ({
    channels: [],
    getChannels: async () => {
        const channels = await ChannelApi.getAll();
        setState(() => channels);
    }
}), {name: CHANNELS_STORAGE}));