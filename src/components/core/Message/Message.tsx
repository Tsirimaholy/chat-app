import {Avatar, HStack, ListItem} from "@chakra-ui/react";
import React from "react";
import {TMessage} from "@/models/TMessage";

type MessageProps = { alignSelf: "left" | "right", message: TMessage };

export function Message(props: MessageProps) {
    const {alignSelf, message: {content, sender}} = props;
    const radius = alignSelf === 'left' ? "0 2em 2em 2em" : "2em 0 2em 2em";
    return (
        <HStack alignSelf={alignSelf}
                flexDirection={alignSelf == "left" ? "row" : "row-reverse"}>
            <Avatar size={"md"} name={sender.name}
                    bg={'gray.600'}
                    colorScheme={"blackAlpha"}
                    color={"white"}
                    float={alignSelf}
                    marginX={"2"}
            />
            <ListItem p={"3"} backgroundColor={"blackAlpha.500"}
                      borderRadius={radius}>
                {content}
            </ListItem>
        </HStack>
    )
}