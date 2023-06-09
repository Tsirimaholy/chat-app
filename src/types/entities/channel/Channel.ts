import {OtherUser} from "@/types/entities/Auth";

export type Channel = {
    id: number,
    name: string;
    type: ChannelType;
    members: number[]
}

export type ChannelType = "public" | "private";