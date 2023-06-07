import React, {useRef, useState} from 'react';
import {useChannelStore} from "@/store/channel-store";
import ChannelCreationModal from "./channel-creation-modal";

import {AddIcon} from "@chakra-ui/icons";
import {Button, useDisclosure} from "@chakra-ui/react";
import {Channel} from "@/models/Channel";

function CreateChannelButton() {
    const {createChannel} = useChannelStore();
    const [isSavingChannel, setIsSavingChannel] = useState(false);
    const {onOpen, isOpen, onClose} = useDisclosure();

    async function handleSaveChannel(channel: {name?: string, type?: string}) {
        const {name="", type=""} = channel;
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
            <Button onClick={onOpen} rightIcon={<AddIcon boxSize={3}/>}>
                Create chanel
            </Button>
        </div>
    );
}

export default CreateChannelButton;