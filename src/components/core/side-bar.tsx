import {Channel} from "@/models/Channel";
import {Box, Button, Spinner, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {ChannelList} from "@/components/core/channel/channels-list";
import React from "react";
import CreateChannelButton from "@/components/core/channel/create-channel-button";

type SideBarProps = {
    onClick: () => void,
    channelsLoading: boolean,
    channels: Channel[],
    onItemClicked: (channel: Channel) => Promise<void>
};

export function SideBar(props: SideBarProps) {
    const {channels, channelsLoading, onClick, onItemClicked} = props;

    return <>
        <Box position={"sticky"} top={0} left={0} right={0} zIndex={999}
             backgroundColor={"var(--secondary-dark-color)"} pb={"4"}
             borderBottom={"1px solid var(--secondary-color)"}
        >
            <CreateChannelButton/>
        </Box>
        <Box>
            <Box>
                <Text color={"#aa05aa"} fontSize={"lg"} as={"b"}>Channels List</Text>
            </Box>
            {channelsLoading ? <Spinner display={"block"} mt={5}/> :
                <ChannelList channels={channels} selectedChannel={channels.length>0 ? channels[0]: undefined}
                             onItemClicked={onItemClicked}/>}
        </Box>
    </>;
}