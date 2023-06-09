import {ListItem} from "@chakra-ui/react";
import React from "react";
import {Channel} from "@/types/entities/channel/Channel";

type ChannelItemProps = {
    channel: Channel;
    name: string;
    isActive: boolean;
    onClick?: (channel: Channel)=>void
}

export function ChannelItem({channel, isActive, name, onClick}: ChannelItemProps) {
    const style = {fontWeight: "bold", fontSize: "large"};
    if (isActive) style["fontWeight"] = "bolder";
    return (
        <ListItem bg={isActive ? 'gray.700':''} p={'1'} style={{cursor: "pointer", marginBlock: 4, borderRadius: "0.5em"}} onClick={()=> onClick && onClick(channel)}
        >
            <span style={style}># </span>{name}
        </ListItem>
    )
}