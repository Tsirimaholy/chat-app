import React, {useEffect, useState} from 'react';
import {useStore} from "@/store/root-store";
import {Button, Grid, GridItem, useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {NavBar} from "@/components/core/nav-bar";
import {useChannelStore} from "@/store/channel-store";
import {ChannelList} from "@/components/core/channels-list";

function Chat() {
    const {user, logout} = useStore()
    const [menuToggle, setMenuToggle] = useState(false);
    const {channels, getChannels} = useChannelStore();
    const {onOpen} = useDisclosure();


    useEffect(() => {
        getChannels()
    }, [])
    const toggle = () => {
        setMenuToggle(prevState => !prevState)
    }
    const handleLogout = () => {
        toggle();
        logout()
    }


    return (
        <main>
            <Grid templateAreas={`"nav nav" "aside main"`}>
                <GridItem area={"nav"}>
                    <NavBar onClick={toggle} user={user} menuToggle={menuToggle} onBadgeClicked={handleLogout}/>
                </GridItem>
                <GridItem area={"aside"} paddingInline={5}>
                    <Button onClick={onOpen} rightIcon={<AddIcon boxSize={3}/>}>
                        Create chanel
                    </Button>
                    <ChannelList channels={channels}/>
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