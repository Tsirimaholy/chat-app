import React, {useEffect, useRef, useState} from 'react';
import Layout from "@/pages/_layout";
import {useRouter} from "next/router";
import useMessageStore from "@/store/message-store";
import {MessageList} from "@/components/core/Message/message-list";
import {useChannelStore} from "@/store/channel-store";
import {Channel} from "@/models/Channel";
import {ChannelHeader} from "@/pages/channel/component/_ChannelHeading";
import {MessageField} from "@/pages/channel/component/message-field";


function ChannelMessages() {
    const {query} = useRouter();
    const id = Number.parseInt(query["channelId"] as unknown as string);

    const [currentChannel, setCurrentChannel] = useState<Channel>();
    const {messages, getMessagesByChannel, sendMessage} = useMessageStore();
    const {getChannelById} = useChannelStore();
    const inputRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        (async () => {
            try {
                const [_, channel] = await Promise.all([getMessagesByChannel(id), getChannelById(id)]);
                setCurrentChannel(channel);
            }catch (e) {
                // TODO: handle error
                console.log("an error occurred")
            }
        })()
    }, [getChannelById, getMessagesByChannel, id])

    useEffect(() => {
        inputRef?.current?.focus();
    }, [id])


    const handleSendMessage = async (messageContent: string) => {
        // TODO: dynamic recipient id
        await sendMessage(id, {channelId: id, content: messageContent});
        // clear input value
        if (inputRef?.current?.value) inputRef.current.value = "";
    }

    // async function handleKeyEnterDown(event: React.KeyboardEvent<HTMLTextAreaElement> | undefined) {
    //     let prev='';
    //     prev=''
    //     console.log('enter')
    //     if (event?.key == 'Enter' && inputRef?.current?.value) {
    //         await handleSendMessage(inputRef.current.value)
    //     }
    // }

    return (
        <Layout>
            <ChannelHeader currentChannel={currentChannel}/>
            <MessageList messages={messages}/>
            <MessageField ref={inputRef}
                          onClick={() => handleSendMessage(inputRef?.current?.value || ' ')}/>
        </Layout>
    );
}

export default ChannelMessages;