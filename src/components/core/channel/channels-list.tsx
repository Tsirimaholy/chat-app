import {Channel} from "@/models/Channel";
import {Box, List, Text} from "@chakra-ui/react";
import {ChannelItem} from "@/components/core/channel/channelItem";
import React, {useState} from "react";

type ChannelsListProps = {
    channels: Channel[];
    selectedChannel?: Channel;
    onItemClicked: (channel: Channel)=>void
}

export function ChannelList({channels, onItemClicked, selectedChannel: initialChannel}: ChannelsListProps) {
    const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(initialChannel);
    const handleChannelItemClick = (channel: Channel)=>{
        setSelectedChannel(channel);
        onItemClicked(channel);
    }

    return (
        <List mt={5}>
            {channels.map(channel => <ChannelItem name={channel.name} key={channel.name} channel={channel} onClick={handleChannelItemClick} isActive={channel.id===selectedChannel?.id}/>)}
        </List>
    )
}