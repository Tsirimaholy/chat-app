import React, {useEffect, useRef, useState} from 'react';
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
    Spinner, Text, useDisclosure
} from "@chakra-ui/react";
import {NavBar} from "@/components/core/nav-bar/nav-bar";
import {AddIcon} from "@chakra-ui/icons";
import {ChannelList} from "@/components/core/channel/channels-list";
import {useChannelStore} from "@/store/channel-store";
import {useStore} from "@/store/root-store";
import useMessageStore from "@/store/message-store";
import {Channel} from "@/models/Channel";


type LayoutProps = {
    children: React.ReactNode;
}

function Layout({children}: LayoutProps): JSX.Element {
    const [channelsLoading, setChannelsLoading] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const {channels, getChannels, createChannel} = useChannelStore();
    const {messages, getMessagesByChannel} = useMessageStore();
    const {user, logout} = useStore()
    const [isSavingChannel, setIsSavingChannel] = useState(false);
    const initialRef = React.useRef(null)
    const nameRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);

    const finalRef = React.useRef(null)
    const {onOpen, isOpen, onClose} = useDisclosure();

    async function handleSaveChannel() {
        setIsSavingChannel(true)
        try {
            await createChannel({
                id: 0,
                name: nameRef.current?.value || "",
                type: typeRef.current?.value || ""
            })
        } catch (e) {
            console.info("caught on ui layer")
        }

        setIsSavingChannel(false);
        onClose()
    }


    useEffect(() => {
        (async function () {
            try {
                setChannelsLoading(true)
                await getChannels()
            } catch (e) {
                console.info(e);
            } finally {
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

    const onChannelItemClicked = async (channel: Channel) => {
            await getMessagesByChannel(channel.id);
    }

    return (
        <Grid templateAreas={`"nav nav" "aside main"`}>
            <GridItem area={"nav"}>
                <NavBar onClick={toggle} user={user} menuToggle={menuToggle} onBadgeClicked={handleLogout}/>
            </GridItem>
            <GridItem  area={"aside"} paddingInline={5} mr="5" borderRight={"1px solid var(--secondary-color)"}
                      h={"100vh"}  overflowY={"scroll"} position={"relative"}>
                <Box position={"sticky"} top={0} left={0} right={0} zIndex={999}
                     backgroundColor={"var(--secondary-dark-color)"} pb={"4"}
                     borderBottom={"1px solid var(--secondary-color)"}
                >
                    <Button onClick={onOpen} rightIcon={<AddIcon boxSize={3}/>}>
                        Create chanel
                    </Button>
                </Box>
                <Box>
                    <Box>
                        <Text color={"#aa05aa"} fontSize={"lg"} as={"b"}>Channels List</Text>
                    </Box>
                    {channelsLoading ? <Spinner display={"block"} mt={5}/> :
                        <ChannelList channels={channels} selectedChannel={undefined}
                                     onItemClicked={onChannelItemClicked}/>}
                </Box>
            </GridItem>
            <GridItem area={'main'}>
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
                {children}
            </GridItem>
        </Grid>
    );
}

export default Layout;