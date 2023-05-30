import React, {useEffect} from 'react';
import {GridItem, Heading, Spinner} from "@chakra-ui/react";
import Layout from "@/pages/_layout";
import {useRouter} from "next/navigation";
import {CHANNEL} from "@/constant/routes";

function Chat() {
    const {push} = useRouter();
    useEffect(() => {
        // Todo maybe verify if there is channel before
        push(`${CHANNEL}/${1}`);
    },[push])
    return (
        <main>
            <Layout>
                   <Heading>Loading</Heading>
                    <Spinner/>
            </Layout>

        </main>);
}

export default Chat;