import {ListItem} from "@chakra-ui/react";
import React from "react";

type ChannelItemProps = {
    name: string;
}

export function ChannelItem(props: ChannelItemProps) {
    return (
        <ListItem style={{cursor: "pointer", marginBlock: 4}}>
            <span style={{fontWeight: "bold", fontSize: "large"}}># </span>{props.name}
        </ListItem>
    )
}