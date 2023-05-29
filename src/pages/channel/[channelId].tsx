import React, {useEffect} from 'react';
import Layout from "@/pages/_layout";
import {useRouter} from "next/router";
import useMessageStore from "@/store/message-store";
import {MessageList} from "@/components/core/Message/message-list";

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
            <MessageList messages={messages}/>
        </Layout>
    );
}

export default ChannelMessages;