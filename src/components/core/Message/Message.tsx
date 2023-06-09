import {Avatar, HStack, ListItem, VStack, Text, Box} from "@chakra-ui/react";
import React from "react";
import {TMessage} from "@/types/entities/TMessage";

type MessageProps = { message: TMessage };

export function Message(props: MessageProps) {
    const {message: {content, sender, createdAt}} = props;
    const createdDate = new Date(createdAt);
    const today = new Date();
    let parsedDateTime = createdDate.toDateString();

    const isToday = today.getDay() == createdDate.getDay() && today.getMonth() == createdDate.getMonth() && today.getFullYear() == createdDate.getFullYear();
    if (isToday) {
        parsedDateTime = createdDate.toLocaleTimeString();
    }


    return (
        <HStack
            alignItems={"flex-start"} justifyContent={'left'} mb={'3'}>
            <Avatar size={"sm"} name={sender.name}
                    bg={'gray.600'}
                    colorScheme={"blackAlpha"}
                    color={"white"}
                    marginX={"2"}
                    marginRight={'0'}
            />
            <VStack alignItems={'flex-start'}  backgroundColor={"blackAlpha.500"} p={"2"} borderRadius={'sm'}>
                <Box>
                    <Text as={'b'} mr={2}>{sender.name}</Text>
                    <Text fontSize={'sm'} display={'inline'}>{parsedDateTime}</Text>
                </Box>
                <ListItem>
                    <Text>{content}</Text>
                </ListItem>
            </VStack>

        </HStack>
    )
}