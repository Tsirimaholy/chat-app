import React, {useEffect, useRef, useState} from 'react';
import {useStore} from "@/store/root-store";
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
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
import {AddIcon} from "@chakra-ui/icons";
import {NavBar} from "@/components/core/nav-bar";
import {useChannelStore} from "@/store/channel-store";
import {ChannelList} from "@/components/core/channels-list";
import {delay} from "@/utils/timing";

function Chat() {
    const {user, logout} = useStore()
    const [menuToggle, setMenuToggle] = useState(false);
    const {channels, getChannels, createChannel} = useChannelStore();
    const [channelsLoading, setChannelsLoading] = useState(false);
    const [isSavingChannel, setIsSavingChannel] = useState(false);
    const initialRef = React.useRef(null)
    const nameRef = useRef<HTMLInputElement>();
    const typeRef = useRef<HTMLInputElement>();

    const finalRef = React.useRef(null)
    const {onOpen, isOpen, onClose} = useDisclosure();


    useEffect(() => {
        setChannelsLoading(true)
        getChannels()
        setChannelsLoading(false)
    }, [])
    const toggle = () => {
        setMenuToggle(prevState => !prevState)
    }
    const handleLogout = () => {
        toggle();
        logout()
    }


    async function handleSaveChannel() {
        setIsSavingChannel(true)
        createChannel({
            name: nameRef.current?.value || "",
            type: typeRef.current?.value || ""
        })
        await delay(2000)
        setIsSavingChannel(false);
        onClose()
    }

    return (
        <main>
            <Grid templateAreas={`"nav nav" "aside main"`}>
                <GridItem area={"nav"}>
                    <NavBar onClick={toggle} user={user} menuToggle={menuToggle} onBadgeClicked={handleLogout}/>
                </GridItem>
                <GridItem area={"aside"} paddingInline={5}>
                    <>
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
                                            onClick={handleSaveChannel}
                                            rightIcon={isSavingChannel ? <Spinner/> : <></>}
                                    >Save</Button>
                                    <Button>
                                        Cancel
                                    </Button>

                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                    <Button onClick={onOpen} rightIcon={<AddIcon boxSize={3}/>}>
                        Create chanel
                    </Button>
                    {channelsLoading ? <Spinner display={"block"} mt={5}/> : <ChannelList channels={channels}/>}
                </GridItem>
                <GridItem area={"main"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aut deleniti dicta explicabo
                    fuga
                    ipsa, itaque obcaecati pariatur, sed tempore ut? At ex, hic incidunt nesciunt pariatur rerum
                    sint?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aut deleniti dicta explicabo
                    fuga
                    ipsa, itaque obcaecati pariatur, sed tempore ut? At ex, hic incidunt nesciunt pariatur rerum
                    sint?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aut deleniti dicta explicabo
                    fuga
                    ipsa, itaque obcaecati pariatur, sed tempore ut? At ex, hic incidunt nesciunt pariatur rerum
                    sint?
                </GridItem>
            </Grid>
        </main>);
}

export default Chat;