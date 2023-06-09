import React, {useState} from 'react';
import {useChannelStore} from "@/store/channel-store";
import ChannelCreationModal from "./channel-creation-modal";

import {AddIcon} from "@chakra-ui/icons";
import {Button, useDisclosure} from "@chakra-ui/react";
import {ChannelType} from "@/types/entities/channel/Channel";
import {useRouter} from "next/router";
import {CREATE_CHANNEL_ROUTE} from "@/constant/routes";

function CreateChannelButton() {
    const {createChannel} = useChannelStore();
    const [isSavingChannel, setIsSavingChannel] = useState(false);
    const {onOpen, isOpen, onClose} = useDisclosure();
    const {push} = useRouter();

    async function handleSaveChannel(channel: {name?: string, type?: ChannelType}) {
        const {name="", type="public"} = channel;
        setIsSavingChannel(true)

        try {
            await createChannel({id: 1, name, type});
            onClose()
        } catch (e) {
            console.info("caught on ui layer")
        }

        setIsSavingChannel(false);

    }
    return (
        <div>
            <ChannelCreationModal isOpen={isOpen} onClose={onClose} handleSaveChannel={handleSaveChannel} isSavingChannel={isSavingChannel}/>
            <Button onClick={()=>push(CREATE_CHANNEL_ROUTE)} rightIcon={<AddIcon boxSize={3}/>}>
                Create chanel
            </Button>
        </div>
    );
}

export default CreateChannelButton;