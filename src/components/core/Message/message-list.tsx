import {TMessage} from "@/models/TMessage";
import {List} from "@chakra-ui/react";
import {Message} from "@/components/core/Message/Message";
import React from "react";

type MessageListProps = { messages: TMessage[] };

export function MessageList(props: MessageListProps) {
    const {messages} = props;

    return (
        <List display={"flex"} flexDirection={"column"} overflowY={"scroll"} h={"60%"}>
            {messages.sort((a, b) => a.id-b.id).map((message, index) => {
                // TODO: something is wrong here!
                return (
                    <Message key={message.id}  message={message}/>
                );
            })}
        </List>
    )
}