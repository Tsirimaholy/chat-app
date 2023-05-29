import React, {useEffect, useRef, useState} from 'react';
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
import {NavBar} from "@/components/core/nav-bar/nav-bar";
import {useChannelStore} from "@/store/channel-store";
import {useStore} from "@/store/root-store";
import useMessageStore from "@/store/message-store";
import {Channel} from "@/models/Channel";
import {useRouter} from "next/navigation";
import {CHANNEL} from "@/constant/routes";
import {SideBar} from "@/components/core/side-bar";


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
    const {push} = useRouter()

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
        // await getMessagesByChannel(channel.id);
        push(`${CHANNEL}/${channel.id}`)
    }

    return (
        <Grid templateAreas={`"nav nav" "aside main"`} gridAutoColumns={'20% 1fr'}>
            <GridItem area={"nav"}>
                <NavBar onClick={toggle} user={user} menuToggle={menuToggle} onBadgeClicked={handleLogout}/>
            </GridItem>
            <GridItem area={"aside"} paddingInline={5} mr="5" borderRight={"1px solid var(--secondary-color)"}
                      h={"100vh"} overflowY={"scroll"} position={"relative"}>
                <SideBar onClick={onOpen} channelsLoading={channelsLoading} channels={channels}
                         onItemClicked={onChannelItemClicked}/>
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