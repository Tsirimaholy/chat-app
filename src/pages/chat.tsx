import React, {useEffect} from 'react';
import {Heading, Spinner, Text} from "@chakra-ui/react";

import Layout from "@/pages/_layout";
import {useRouter} from "next/navigation";
import {CHANNEL} from "@/constant/routes";
import {useChannelStore} from "@/store/channel-store";
import CreateChannelButton from "@/components/core/channel/create-channel-button";

function Chat() {
    const {push} = useRouter();
    const {channels, isLoading, setLoadingState, toggleChannelLoadingState} = useChannelStore();
    const channelsIsEmpty = channels.length <= 0


    useEffect(() => {
        setLoadingState(true);
        if (!channels || channels.length == 0) {
            toggleChannelLoadingState()
            return;
        }
        toggleChannelLoadingState()
        push(`${CHANNEL}/${1}`);
    }, [channels, push, setLoadingState, toggleChannelLoadingState])

    return (
        <main>
            <Layout>
                {
                    channelsIsEmpty && (
                        <>
                            <Text fontSize={'lg'}>No channel was found</Text>
                            <Text fontSize={'md'} mb={3}>Create your own and invite your friends!</Text>
                            <CreateChannelButton/>
                        </>
                    )
                }
                {isLoading &&
                    <>
                        <Heading>Loading</Heading>
                        <Spinner/>
                    </>
                }
            </Layout>

        </main>);
}

export default Chat;