import React from 'react';
import Layout from "@/pages/_layout";
import {useRouter} from "next/router";
import {List} from "@chakra-ui/react";

function ChannelMessages() {
    const {query} = useRouter();


    return (
        <Layout>
            <List>

            </List>
        </Layout>
    );
}

export default ChannelMessages;