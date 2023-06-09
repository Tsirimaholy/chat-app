export type Channel = {
    id: number,
    name: string;
    type: ChannelType;
}

export type ChannelType = "public" | "private";