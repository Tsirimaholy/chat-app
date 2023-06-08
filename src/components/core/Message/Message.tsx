import {Avatar, HStack, ListItem} from "@chakra-ui/react";
import React from "react";
import {TMessage} from "@/models/TMessage";

type MessageProps = { message: TMessage };

export function Message(props: MessageProps) {
    const { message: {content, sender}} = props;
    return (
        <HStack
                >
            <Avatar size={"md"} name={sender.name}
                    bg={'gray.600'}
                    colorScheme={"blackAlpha"}
                    color={"white"}
                    marginX={"2"}
                    marginRight={'0'}
            />
            <ListItem p={"2"} backgroundColor={"blackAlpha.500"}
                      borderRadius='md'>
                {content}
            </ListItem>
        </HStack>
    )
}