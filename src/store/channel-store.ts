import {create} from "zustand";
import ChannelApi from "@/services/channel-api";
import {persist} from "zustand/middleware";
import {Channel} from "@/types/entities/channel/Channel";
import {CHANNELS_STORAGE} from "@/constant/storage";

type State = {
    channels: Channel[];
    isLoading: boolean;
}

type Action = {
    getChannels: () => Promise<State["channels"]>;
    getChannelById: (id: number)=>Promise<Channel>;
    createChannel: (channel: Channel) => Promise<Channel>;
    updateChannel: (id: number)=>Promise<Channel>;
    toggleChannelLoadingState: ()=>void;
    setLoadingState: (loadingState: boolean)=>void;
}

export const useChannelStore = create<State & Action>()(persist((setState, get) => {
    return ({
        channels: [],
        isLoading: false,
        toggleChannelLoadingState: ()=> setState(state => ({...state, isLoading: !state.isLoading})),
        setLoadingState: (loadingState: boolean)=>setState(state => ({...state, isLoading: loadingState})),
        getChannels: async () => {
            get().setLoadingState(false);
            const channels = await ChannelApi.getAll();
            setState(() => ({channels}));
            get().toggleChannelLoadingState();
            return get().channels;
        },
        getChannelById: async (id: number) => {
            try {
                return await ChannelApi.getChannelById(id);
            }catch (e) {
                throw e;
            }
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