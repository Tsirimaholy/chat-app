import React, {useState} from 'react';
import {useStore} from "@/store/root-store";
import {Box, List, ListItem, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {NavBar} from "@/components/core/nav-bar";


function Chat() {
    const {user, logout} = useStore()
    const [menuToggle, setMenuToggle] = useState(false);
    const channels = ["chanel1", "some chanel", "zod", "Golem"]
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
            <Box backgroundColor={"var(--secondary-color)"} w={"12%"} h={"100vh"} top={"70"} pt={20} pl={"7"}
                 scrollBehavior={"smooth"} overflowY={"scroll"} position={"fixed"}>
                {/*Add channel*/}
                <Box display={"block"}>
                    <Text display={"inline"}>Create chanel <AddIcon boxSize={10}/></Text>
                </Box>
                {/*Chanel list*/}
                <List mt={10}>
                    <Text color={"#aa05aa"} fontSize={"lg"} as={"b"}>Channels List</Text>
                    {channels.map(chanel => (
                        <ListItem style={{cursor: "pointer", marginBlock: 4}}>
                            <span style={{fontWeight: "bold", fontSize: "large"}}># </span>{chanel}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </main>);
}

export default Chat;