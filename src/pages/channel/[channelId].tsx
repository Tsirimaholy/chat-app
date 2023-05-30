import React, {useEffect, useState} from 'react';
import Layout from "@/pages/_layout";
import {useRouter} from "next/router";
import useMessageStore from "@/store/message-store";
import {MessageList} from "@/components/core/Message/message-list";
import {useChannelStore} from "@/store/channel-store";
import {Channel} from "@/models/Channel";
import {ChannelHeader} from "@/pages/channel/component/_ChannelHeading";


function ChannelMessages() {
    const {query} = useRouter();
    const id = Number.parseInt(query["channelId"] as unknown as string);

    const [currentChannel, setCurrentChannel] = useState<Channel>();
    const {messages, getMessagesByChannel} = useMessageStore();
    const {getChannelById} = useChannelStore();

    useEffect(() => {
        (async () => {
            const [_, channel] = await Promise.all([getMessagesByChannel(id), getChannelById(id)]);
            setCurrentChannel(channel);
        })()
    }, [getChannelById, getMessagesByChannel, id])


    return (
        <Layout>
            <ChannelHeader currentChannel={currentChannel}/>
            <MessageList messages={messages}/>
        </Layout>
    );
}

export default ChannelMessages;