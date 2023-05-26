import {Channel} from "@/models/Channel";
import {Box, List, Text} from "@chakra-ui/react";
import {ChannelItem} from "@/components/core/channel/channelItem";
import React, {useState} from "react";

type ChannelsListProps = {
    channels: Channel[];
    selectedChannel?: Channel;
    onItemClicked: (channel: Channel)=>void
}

export function ChannelList({channels, onItemClicked}: ChannelsListProps) {
    const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(undefined);
    return (
        <List mt={5}>
            {channels.map(channel => <ChannelItem name={channel.name} key={channel.name} channel={channel} onClick={onItemClicked} isActive={channel===selectedChannel}/>)}
        </List>
    )
}