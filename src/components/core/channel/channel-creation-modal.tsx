import React, {useRef} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure
} from "@chakra-ui/react";
import {Channel} from "@/models/Channel";

type ChannelCreationModalProps = {
    handleSaveChannel:(channel: {name?: string, type?: string})=>void;
    isSavingChannel: boolean;
    isOpen: boolean;
    onClose: ()=>void
};

function ChannelCreationModal( {handleSaveChannel, isSavingChannel, isOpen, onClose}: ChannelCreationModalProps) {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null)
    const nameRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Create a channel</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={nameRef} placeholder='channel name'/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Type</FormLabel>
                        <Input ref={typeRef} placeholder='public or private'/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} colorScheme={"blue"}
                            onClick={()=>handleSaveChannel({name: nameRef.current?.value, type: typeRef.current?.value})}
                            rightIcon={isSavingChannel ? <Spinner/> : <></>}
                    >Save</Button>
                    <Button>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ChannelCreationModal;