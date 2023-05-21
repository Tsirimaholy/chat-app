import {Channel} from "@/models/Channel";
import {Box, List, Text} from "@chakra-ui/react";
import {ChannelItem} from "@/components/core/channelItem";
import React from "react";

type ChannelsListProps = {
    channels: Channel[]
}

export function ChannelList({channels}: ChannelsListProps) {
    return (
        <List mt={5}>
            <Box>
                <Text color={"#aa05aa"} fontSize={"lg"} as={"b"}>Channels List</Text>
            </Box>
            {channels.map(channel => <ChannelItem name={channel.name}/>)}
        </List>
    )
}