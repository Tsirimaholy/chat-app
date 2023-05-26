import React, {useEffect, useRef, useState} from 'react';
import {useStore} from "@/store/root-store";
import {
    Box,
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
import {NavBar} from "@/components/core/nav-bar/nav-bar";
import {useChannelStore} from "@/store/channel-store";
import {ChannelList} from "@/components/core/channel/channels-list";

function Chat() {
    const {user, logout} = useStore()
    const [menuToggle, setMenuToggle] = useState(false);
    const {channels, getChannels, createChannel} = useChannelStore();
    const [channelsLoading, setChannelsLoading] = useState(false);
    const [isSavingChannel, setIsSavingChannel] = useState(false);
    const initialRef = React.useRef(null)
    const nameRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);

    const finalRef = React.useRef(null)
    const {onOpen, isOpen, onClose} = useDisclosure();


    useEffect(() => {
        (async function () {
            try {
                setChannelsLoading(true)
                await getChannels()
            } catch (e) {
                console.info(e);
            }finally {
                setChannelsLoading(false);
            }
        })()
    }, [getChannels])
    const toggle = () => {
        setMenuToggle(prevState => !prevState)
    }
    const handleLogout = () => {
        toggle();
        logout()
    }


    async function handleSaveChannel() {
        setIsSavingChannel(true)
        try {
            await createChannel({
                name: nameRef.current?.value || "",
                type: typeRef.current?.value || ""
            })
        } catch (e) {
            console.info("caught on ui layer")
        }

        setIsSavingChannel(false);
        onClose()
    }

    return (
        <main>
            <Grid templateAreas={`"nav nav" "aside main"`}>
                <GridItem area={"nav"}>
                    <NavBar onClick={toggle} user={user} menuToggle={menuToggle} onBadgeClicked={handleLogout}/>
                </GridItem>
                <GridItem area={"aside"} paddingInline={5} mr="5" borderRight={"1px solid var(--secondary-color)"}
                          h={"100vh"} overflowY={"scroll"} position={"relative"}>
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
                    <Box position={"sticky"} top={0} left={0} right={0} zIndex={999}
                         backgroundColor={"var(--secondary-dark-color)"} pb={"4"}
                         borderBottom={"1px solid var(--secondary-color)"}
                    >
                        <Button onClick={onOpen} rightIcon={<AddIcon boxSize={3}/>}>
                            Create chanel
                        </Button>
                    </Box>
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