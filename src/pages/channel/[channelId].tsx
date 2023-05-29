import React, {useEffect} from 'react';
import Layout from "@/pages/_layout";
import {useRouter} from "next/router";
import {List, ListItem} from "@chakra-ui/react";
import useMessageStore from "@/store/message-store";

function ChannelMessages() {
    const {query} = useRouter();
    console.info(query)
    const id = Number.parseInt(query["channelId"] as unknown as string);
    const {messages, getMessagesByChannel} = useMessageStore();
    useEffect(() => {
        getMessagesByChannel(id).catch(reason => console.error(reason))
    }, [getMessagesByChannel, id])


    return (
        <Layout>
            <List>
                {messages.map(message => (
                    <ListItem key={message.id}>
                        {message.content}
                    </ListItem>
                ))}
            </List>
        </Layout>
    );
}

export default ChannelMessages;