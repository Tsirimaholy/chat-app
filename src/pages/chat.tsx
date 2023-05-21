import React, {useEffect, useState} from 'react';
import {useStore} from "@/store/root-store";
import {Box, Grid, GridItem, List, ListItem, Text, useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {NavBar} from "@/components/core/nav-bar";
import {useChannelStore} from "@/store/channel-store";

function Chat() {
    const {user, logout} = useStore()
    const [menuToggle, setMenuToggle] = useState(false);
    const {channels, getChannels} = useChannelStore();
    const {onOpen, onClose, isOpen} = useDisclosure();


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
            <NavBar onClick={toggle} user={user} menuToggle={menuToggle} onBadgeClicked={handleLogout}/>
            {/*sidebar*/}
            <Box backgroundColor={"var(--secondary-color)"} w={"12%"} h={"100vh"} top={"60"} pt={20} pl={"7"}
                 scrollBehavior={"smooth"} overflowY={"scroll"} position={"fixed"}>
                {/*Add channel*/}
                <Box display={"block"} p={2}>
                    <Text display={"inline"} onClick={onOpen}
                          cursor={"pointer"}
                    >Create
                        chanel <AddIcon boxSize={10}/></Text>

                </Box>
                {/*Chanel list*/}
                <List mt={10}>
                    <Box>
                        <Text color={"#aa05aa"} fontSize={"lg"} as={"b"}>Channels List</Text>
                    </Box>
                    {channels.map(({name, type}) => (
                        <ListItem style={{cursor: "pointer", marginBlock: 4}} key={`${name}-${type}`}>
                            <span style={{fontWeight: "bold", fontSize: "large"}}># </span>{name}
                        </ListItem>
                    ))}
                </List>
            </Box>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aut deleniti dicta explicabo fuga ipsa, itaque obcaecati pariatur, sed tempore ut? At ex, hic incidunt nesciunt pariatur rerum sint?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aut deleniti dicta explicabo fuga ipsa, itaque obcaecati pariatur, sed tempore ut? At ex, hic incidunt nesciunt pariatur rerum sint?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aut deleniti dicta explicabo fuga ipsa, itaque obcaecati pariatur, sed tempore ut? At ex, hic incidunt nesciunt pariatur rerum sint?
            </div>
            <Grid templateAreas={`"nav nav" "aside main"`}>
                <GridItem area={"nav"} bg={"coral"}>The nav</GridItem>
                <GridItem area={"aside"} bg={"gold"}>Aside</GridItem>
                <GridItem area={"main"} bg={"greenyellow"}>main</GridItem>
            </Grid>
        </main>);
}

export default Chat;